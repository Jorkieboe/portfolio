<script setup>
import { onMounted, ref, onBeforeUnmount, computed, watch } from 'vue'
import * as THREE from 'three/webgpu'
import { Fn, uv, float, uniform, texture, smoothstep, vec2, vec3, vec4, mix, time, mx_noise_float, If } from 'three/tsl'
import { useLang } from '../composables/useLang'

const { t } = useLang()

// The IDs corresponding to the translations JSON objects
const projectIds =[
  'begrijpendBiased',
  'gamification',
  'festivalRecommender',
  'burgerCrush',
  'vrGame',
  'inABox'
]

const colors =  [
  {
    "top": {x:1, y:0.2, z:0.2},
    "bottom": {x: 0.3, y: 0.8, z: 0.2},
  },
  {
    "top":  {x:0.2,  y: 0.6,z:0.7},
    "bottom":  {x:0.5, y:  0.2, z:0.3},
  },
  {
    "top":  {x:0.2,  y: 0.5, z:0.5},
    "bottom":  {x:0.1, y:  0.9, z:0.6},
  },
  {
    "top":  {x:0.9, y:  1, z:0.1},
    "bottom":  {x:0.3, y:  0.8, z:0.2},
  },
  {
    "top": {x:0.4,  y: 0.7, z:0.8},
    "bottom": {x:0.1,  y: 0.1, z:0.3},
  },
  {
    "top": {x:0.4,  y: 0.4, z:1.0},
    "bottom": {x:0.7, y: 0.4, z:0.1},
  }
]

const projects = computed(() => {
  return projectIds.map((id, index) => {
    return { id, content: t.value.homePage.projects[index] }
  })
})

const activeProject = ref(null)
const isMobile = ref(typeof navigator !== 'undefined' && /Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone/i.test(navigator.userAgent))

const toggleMobile = (index) => {
  activeProject.value = activeProject.value === index ? null : index
}

const canvasContainer = ref(null)

let renderer, scene, camera, animationId, mesh

const headerSize = ref(0.08) // 8% of screen
const minHeaderPx = 64 // Ensure it never gets smaller than this on mobile

const stableHeight = ref(0) // Our stable reference
const dynamicZoneHeight = ref(0)
let lastWidth = 0

const contentRef = ref(null)


// Uniforms
const uMaskScale = uniform(1) 
const uPlaneAspect = uniform(1)  // Actual screen aspect
const uTextureAspect = uniform(1) // Aspect of your SVG
const uMaskStrength = uniform(0)
const uMoveProgress = uniform(0) // 0 = Center, 1 = Top-Right Header
const uColourTop = uniform(new THREE.Color(colors[0].top.x, colors[0].top.y, colors[0].top.z))
const uColourBottom = uniform(new THREE.Color(colors[0].bottom.x, colors[0].bottom.y, colors[0].bottom.z))
const targetTop = new THREE.Color(colors[0].top.x, colors[0].top.y, colors[0].top.z)
const targetBottom = new THREE.Color(colors[0].bottom.x, colors[0].bottom.y, colors[0].bottom.z)

const uMaskHeight = uniform(headerSize.value)

let scrollProgress = 0
let smoothedProgress = 0
const lerpFactor = 0.12 // Slightly higher for more responsive smoothness

const projectActive = ref(null)

watch(projectActive, (newActive) => {
  if (newActive !== null) {
    const nextCol = colors[newActive]
    targetTop.setRGB(nextCol.top.x, nextCol.top.y, nextCol.top.z)
    targetBottom.setRGB(nextCol.bottom.x, nextCol.bottom.y, nextCol.bottom.z)
  } else {
    // Optional: Reset to default color when not hovering any project
    targetTop.setRGB(colors[0].top.x, colors[0].top.y, colors[0].top.z)
    targetBottom.setRGB(colors[0].bottom.x, colors[0].bottom.y, colors[0].bottom.z)
  }
})

const handleScroll = () => {
    // Use the stable height to calculate the track. 
    // Now, even if the URL bar appears, this number stays constant.
    const zoomTrackHeight = stableHeight.value * 2 
    const currentScroll = window.scrollY
    scrollProgress = Math.min(currentScroll / zoomTrackHeight, 1.0)
}

const handleResize = () => {
    if (!canvasContainer.value) return
    
    const w = window.innerWidth
    const h = window.innerHeight

    // ONLY update our reference if the width changed (rotation) 
    // or if the height change is huge (more than 150px, likely not just a URL bar)
    if (w !== lastWidth || Math.abs(h - stableHeight.value) > 150) {
        stableHeight.value = h
        lastWidth = w
        
        // Update Three.js renderer
        const constrainedWidth = Math.min(w, 1920)
        renderer.setSize(w, h)
        uPlaneAspect.value = constrainedWidth / h
    }
}

onMounted(async () => {

    stableHeight.value = window.innerHeight
    lastWidth = window.innerWidth
    dynamicZoneHeight.value = window.innerHeight

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleResize)

    scene = new THREE.Scene()
    camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)

    renderer = new THREE.WebGPURenderer({ antialias: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(window.innerWidth, window.innerHeight)
    canvasContainer.value.appendChild(renderer.domElement)

    const textureLoader = new THREE.TextureLoader()
    const maskTexture = await textureLoader.loadAsync('/images/Jorrik.svg')
    
    const img = maskTexture.image
    uTextureAspect.value = img.width / img.height
    uPlaneAspect.value = Math.min(window.innerWidth, 1920) / window.innerHeight

    const main = Fn(() => {
      const coords = uv()

      // --- 1. UV COORDINATE CALCULATION ---
      const ratio = uPlaneAspect.div(uTextureAspect)
      const containUV = vec2(0, 0).toVar()
      If(ratio.greaterThan(1.0), () => {
          containUV.assign(vec2(coords.x.sub(0.5).mul(ratio).add(0.5), coords.y))
      }).Else(() => {
          containUV.assign(vec2(coords.x, coords.y.sub(0.5).div(ratio).add(0.5)))
      })
      const centeredUV = containUV.sub(0.5).div(uMaskScale).add(0.5)

      const padding = float(0.015) 
      const targetWidth = uMaskHeight.mul(uTextureAspect).div(uPlaneAspect)
      const targetOriginX = padding
      const targetOriginY = float(1.0).sub(uMaskHeight).add(padding.div(2))
      const cornerUV = coords.sub(vec2(targetOriginX, targetOriginY)).div(vec2(targetWidth, uMaskHeight))

      // Mix between the two UV states
      const currentUV = mix(centeredUV, cornerUV, uMoveProgress)

      // --- 2. MASK LOGIC ---
      // Check if current UV is inside the 0.0-1.0 texture bounds
      const isInsideMask = currentUV.x.greaterThan(0).and(currentUV.x.lessThan(1))
                          .and(currentUV.y.greaterThan(0)).and(currentUV.y.lessThan(1))
                          .select(1.0, 0.0)

      const rawMaskValue = texture(maskTexture, currentUV).r

      // NORMAL STATE: Logo is visible, background is empty
      const normalMask = rawMaskValue.mul(isInsideMask)

      // INVERTED STATE: Logo is a hole, background is solid
      // Math: 1.0 (Full screen) minus the logo shape
      const invertedMask = float(1.0).sub(rawMaskValue.mul(isInsideMask))

      const transition = smoothstep(float(0.95), float(0.98), uMoveProgress);

      // Transition between normal mask and inverted "hole" mask
      const maskAlpha = mix(normalMask, invertedMask, transition)

      // --- 3. FINAL COMPOSITION ---
      // Apply uMaskStrength (the initial fade-in of the effect)
      const finalAlpha = mix(float(1.0), maskAlpha, uMaskStrength)
      
      // Noise Background
      const nBig = mx_noise_float(vec2(coords.x.mul(0.5), time.mul(0.5)))
      const nSmall = mx_noise_float(vec2(coords.x.mul(4.0), time.mul(2.0)))
      const center = mix(float(0.0), float(1.0), nBig.mul(0.6).add(nSmall.mul(0.4)).mul(0.5).add(0.5))


      const offsetTransition = smoothstep(float(0.5), float(1.0), uMoveProgress);

      const offset = uMoveProgress.mul(0.5);

      const noiseMask = smoothstep(
        center.add(offset).sub(0.1),
        center.add(offset).add(0.1),
        coords.y
      )
      const noiseResult = mix(vec4(uColourTop,1.0), vec4(uColourBottom, 1.0), noiseMask)

      return noiseResult.mul(finalAlpha)
  })

    const material = new THREE.NodeMaterial()
    material.fragmentNode = main()
    material.transparent = true

    mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material)
    scene.add(mesh)

    const animate = () => {
      animationId = requestAnimationFrame(animate)
      smoothedProgress += (scrollProgress - smoothedProgress) * lerpFactor

      let zoomPhase = Math.min(smoothedProgress / 0.6, 1.0)
      zoomPhase = 1 - Math.pow(1 - zoomPhase, 3) 

      let movePhase = Math.max(0, (smoothedProgress - 0.6) / 0.4)
      movePhase = movePhase * movePhase * (3.0 - 2.0 * movePhase)

      uMaskScale.value = 100.0 + (1.0 - 100.0) * zoomPhase
      uMoveProgress.value = movePhase
      uMaskStrength.value = Math.min(smoothedProgress * 10.0, 1.0)

      uColourTop.value.lerp(targetTop, 0.05)
      uColourBottom.value.lerp(targetBottom, 0.05)

       if (canvasContainer.value) {
          const vh = stableHeight.value
          const targetHeaderH = vh * headerSize.value
          
          // 1. EXACT DOM TRACKING: Get the real position of the content wrapper
          const contentTop = contentRef.value.getBoundingClientRect().top
          
          // 2. CLIP CALCULATION (Instant, no smoothing to flawlessly match the DOM)
          let rawClip = vh - contentTop 
          let maxClip = vh - targetHeaderH // Stop shrinking when it reaches the header size
          let clipAmount = Math.max(0, Math.min(rawClip, maxClip))

          // Apply clip instantly so it looks completely attached to the scrolling content
          const clipString = `inset(0px 0px ${clipAmount}px 0px)`
          canvasContainer.value.style.webkitClipPath = clipString
          canvasContainer.value.style.clipPath = clipString
          canvasContainer.value.style.transform = 'translateZ(0)'
          
          dynamicZoneHeight.value = vh - clipAmount
      }

 

      renderer.render(scene, camera)
  }

    await renderer.init()
    animate()
})

onBeforeUnmount(() => {
    window.removeEventListener('scroll', handleScroll)
    window.removeEventListener('resize', handleResize)
    cancelAnimationFrame(animationId)
    renderer.dispose()
})


</script>

<template>
  <div class="canvas-fixed-container" ref="canvasContainer"  :style="{ height: stableHeight + 'px' }" ></div>

   <div class="zoom-scroll-track" :style="{ height: ('100%' * headerSize) + 'px' }"></div>
    <div class="content" ref="contentRef">
        <!-- <div class="zone" :style="{ height: dynamicZoneHeight + 'px' }"></div> -->
        <div class="projects" id="projects">
            <h3 class="sectionTitle">Work</h3>
            <div class="projectlist">
                <div
                  v-for="(project, index) in projects"
                  :key="project.id"
                  class="projectWrapper"
                  :class="['pj' + (index + 1), { active: activeProject === index, inactive: activeProject !== null && activeProject !== index }]"
                  v-animate="'oneway'"
                  @mouseenter="()=>{projectActive = index}"
                  @mouseleave="()=>{projectActive = null}"
                >
                    <div class="project" :class="{'active': projectActive == index}">
                        <div class="projectImage" :class="'p' + (index + 1)" @click="$router.push('/work/' + project.id)">
                            <div class="arrow" :class="{ active: activeProject === index }" @click.stop="toggleMobile(index)"></div>
                        </div>
                        <div class="projectPanel">
                            <div class="panelTextDiv">
                                <h3 class="panelText" id="projectTitle">{{ project.content.projectTitle }}</h3>
                                <h4 class="panelText" id="projectType">{{ project.content.projectType }}</h4>
                                <p class="panelText" id="projectDescription">{{ project.content.projectText }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="about" id="about" v-animate="'oneway'">
            <h3 class="sectionTitle">About me</h3>
            <div class="aboutMeContent">
                <img class="profilePicture" src="/images/Jorrik.jpg">
                <p class="meText" v-html="t.homePage.aboutmeText"></p>
            </div>
        </div>
    </div>

</template>

<style scoped lang="scss">
.canvas-fixed-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 100; 
  pointer-events: none; 
  background-color: black;
  will-change: clip-path, -webkit-clip-path;
  filter: drop-shadow(0 0 0.75rem crimson);
}

.zoom-scroll-track {
  height: 200vh;  
}

.content {
  position: relative;
  z-index: 1; 

  .section {
    min-height: 100vh;
    padding: 100px 2rem;
    background: white;
    color: #333;
    border-bottom: 1px solid #eee;
  }
}

.zone {
  width: 100%;
  /* Height is now handled by :style binding */
  background-color: transparent; /* Changed to transparent so background shows through */
  pointer-events: none;
}

.projects{
  .projectlist {
    display: flex;
    flex-direction: row;
    justify-content: center;
    flex-wrap: nowrap;
    max-width: 1920px;
    width: 100%;
    pointer-events: none;
  
    overflow: hidden;

    .projectWrapper {
      display: flex;
      height: 30vw;
      width: 100%;
      max-width: 60vw;
      margin-left: -8.2vw;
      transform: translateY(-200px);
      pointer-events: all;
      transition: all 0.75s;
      opacity: 0;
      cursor: pointer;

      &.pj6 {
        transition-delay: 0.25s;
      }

      &.pj5 {
        transition-delay: 0.5s;
      }

      &.pj4 {
        transition-delay: 0.75s;
      }

      &.pj3 {
        transition-delay: 1s;
      }

      &.pj2 {
        transition-delay: 1.25s;
      }

      &.pj1 {
        transition-delay: 1.5s;
        transform: translateY(0);
      }

      &.animate {
      transform: translateY(0px);
      opacity: 1;
      }

      .project {
        display: flex;
        flex-direction: row;
        justify-content: center;
        padding-left: -8.2vw;
        flex-grow: 1;
        pointer-events: none;
        overflow: hidden;

        &.active{
          .projectImage {
            clip-path: polygon(0% 0%, 100% 0%, 75% 100%, 0% 100%);
              min-width: 20vw;
              transition: all 1s;
          }

          .projectPanel{
            padding-top: 25px;
            padding-left: 5px;
            margin-right: 35px;
            width: 30vw;
            display: block;
            transition: 1s;
            left: 0;
            opacity: 1;
          }

        }

        .projectImage {
          height: 30vw;
          width: 100%;
          min-width: 10vw;
          max-width: 35vw;
          clip-path: polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%);
          -webkit-transition: all 1s;
          transition: all 1s;
          pointer-events: auto;
        }

        #notActive {
            pointer-events: none;
        }

        .projectPanel {
            width: 0px;
            transition: all 1s;
            padding: 0px;
            display: block;
            opacity: 0;
            left: 30vw;
        }

        

        .panelTextDiv {
            width: 25vw;
            overflow: hidden;
        }
      }
    }
  }

}













.p1 {
    background-image: url("/images/begrijpendbiased.jpg");
    background-position: center;
    background-size: auto 30vw;
    z-index: 1;
}

.p2 {
    background-image: url("/images/gamification/challenge screen.jpg");
    background-position: center;
    background-size: auto 30vw;
    z-index: 2;
}

.p3 {
    background-image: url("/images/recommender/FR_mock_recommendation.jpg");
    background-position: center;
    background-size: auto 30vw;
    z-index: 3;
}

.p4 {
    background-image: url("/images/BurgerCrush/crushBanner.jpg");
    background-position: center;
    background-size: auto 30vw;
    z-index: 4;
}

.p5 {
    background-image: url("/images/SOTA/npcs.jpg");
    background-position: center;
    background-size: auto 30vw;
    z-index: 5;
}

.p6 {
    background-image: url("/images/Inabox/playercharacter.jpg");
    background-position: center;
    background-size: auto 30vw;
    z-index: 6;
}



.project:hover .panelText {
    display: block;
}

@media (max-width: 765px) {

  .projects{
    .projectlist {
        flex-direction: column;
        flex-wrap: wrap;
        cursor: pointer;

      .projectWrapper {
        max-width: 100vw;
        height: 300px;
        width: 100vw;
        margin-left: 0px;
        cursor: pointer;
        
    

        .project {

          &.active{
            .projectImage {
              width: 20vw;
            }

            .projectPanel{
              padding: 0;
              padding-left: 15px;
              width: 70vw;
              height: 300px;

              .panelTextDiv {
                  width: 75vw;
              }
          }
          }

          .projectImage {
              height: 300px;
              width: 100vw;
              max-width: 100vw;
              clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
              position: relative;
              cursor: pointer;

              &.p1 {
                background-size: auto 80vw;
              }

              &.p2 {
                background-size: auto 80vw;
              }

              &.p3 {
                background-size: auto 80vw;
              }

              &.p4 {
                  background-size: auto 80vw;
              }

              &.p5 {
                background-size: auto 80vw;
              }

              &.p6 {
                background-size: auto 80vw;
              }
          }

        

        
        }
      }
    }
    
  }
  

    
}
</style>