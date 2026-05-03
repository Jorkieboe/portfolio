<script setup>
import { onMounted, ref, onBeforeUnmount, inject, watch } from 'vue'
import * as THREE from 'three/webgpu'
import { Fn, uv, float, uniform, texture, smoothstep, vec2, vec3, min, vec4, mix, max, time, If } from 'three/tsl'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { useRoute } from 'vue-router'
import {colors} from '../utils/colors'

const scrollState = {
  progress: 0
}

const route = useRoute()

const store = inject('store')

const canvasContainer = ref(null)

let renderer, scene, camera, animationId, mesh

const minHeaderPx = 64

const stableHeight = ref(0)
const dynamicZoneHeight = ref(0)
let lastWidth = 0

const uMaskScale = uniform(1)
const uPlaneAspect = uniform(1)
const uTextureAspect = uniform(1)
const uMaskStrength = uniform(0)
const uMoveProgress = uniform(0)
const uColourTop = uniform(new THREE.Color(colors[0].top.x, colors[0].top.y, colors[0].top.z))
const uColourBottom = uniform(new THREE.Color(colors[0].bottom.x, colors[0].bottom.y, colors[0].bottom.z))
const targetTop = new THREE.Color(colors[0].top.x, colors[0].top.y, colors[0].top.z)
const targetBottom = new THREE.Color(colors[0].bottom.x, colors[0].bottom.y, colors[0].bottom.z)

const uMaskHeight = uniform(store.headerSize)
const uClipUV = uniform(0)
const uOnePixelY = uniform(0.001)

let scrollProgress = 0
let smoothedProgress = 0
let scrollTracker = 0

// [MODIFIED] Increased speed factor for much snappier touch response on iPhone
const LERP_SPEED = 20

// Internal smooth targets for route transitions
let smoothZoomPhase = 0
let smoothMovePhase = 0

watch(() => store.projectActive, (newActive) => {
  if (newActive !== null) {
    const nextCol = colors[newActive]
    targetTop.setRGB(nextCol.top.x, nextCol.top.y, nextCol.top.z)
    targetBottom.setRGB(nextCol.bottom.x, nextCol.bottom.y, nextCol.bottom.z)
  } else {
    targetTop.setRGB(colors[0].top.x, colors[0].top.y, colors[0].top.z)
    targetBottom.setRGB(colors[0].bottom.x, colors[0].bottom.y, colors[0].bottom.z)
  }
})

const updateClip = () => {
    if (!canvasContainer.value) return 0
    const containerHeight = stableHeight.value
    const targetHeaderH = containerHeight * store.headerSize
    let clipAmount = 0

    if (store.isTransitioning) {
        clipAmount = store.transitionClipOverride
    } else if (store.track) {
        const trackEl = store.track.value || store.track
        const trackBottom = trackEl.getBoundingClientRect().bottom
        let rawClip = containerHeight - trackBottom
        let maxClip = containerHeight - targetHeaderH
        clipAmount = Math.max(0, Math.min(rawClip, maxClip))
    } else if (store.content) {
        const contentEl = store.content.value || store.content
        const contentTop = contentEl.getBoundingClientRect().top
        let rawClip = containerHeight - contentTop
        let maxClip = containerHeight - targetHeaderH
        clipAmount = Math.max(0, Math.min(rawClip, maxClip))
    }

    const clipString = `inset(0px 0px ${clipAmount}px 0px)`
    canvasContainer.value.style.webkitClipPath = clipString
    canvasContainer.value.style.clipPath = clipString
    canvasContainer.value.style.transform = 'translateZ(0)'

    dynamicZoneHeight.value = containerHeight - clipAmount
    return clipAmount
}

const handleScroll = () => {
    if (typeof window === 'undefined') return
    const zoomTrackHeight = stableHeight.value * 2.5
    const currentScroll = window.scrollY
    scrollTracker = currentScroll
    scrollProgress = Math.min(currentScroll / zoomTrackHeight, 1.0)
}

// [MODIFIED] Frame-independent lerp function
const lerp = (current, target, speed, dt) => {
    const out = current + (target - current) * (1 - Math.exp(-speed * dt))
    return Math.abs(target - out) < 0.0001 ? target : out
}

const handleResize = () => {
    if (typeof window === 'undefined' || !canvasContainer.value) return

    const w = window.innerWidth
    const h = window.innerHeight

    if (w !== lastWidth || Math.abs(h - stableHeight.value) > 150) {
        stableHeight.value = h
        lastWidth = w

        const maxWidth = 1920
        const renderScale = Math.min(1.0, maxWidth / w)

        renderer.setSize(w * renderScale, h * renderScale, false)
        uPlaneAspect.value = w / h
    }
}

const createNoiseTexture = () => {
    const size = 256;
    const data = new Uint8Array(size * size * 4);

    // Create a low-res grid of random points
    const grid = 16;
    const randoms = new Float32Array(grid * grid);
    for (let i = 0; i < randoms.length; i++) randoms[i] = Math.random();

    // Smoothly interpolate between the points (Value Noise)
    for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
            let gx = (x / size) * grid;
            let gy = (y / size) * grid;
            let ix = Math.floor(gx);
            let iy = Math.floor(gy);
            let fx = gx - ix;
            let fy = gy - iy;

            // Wrap for seamless tiling
            let ix1 = (ix + 1) % grid;
            let iy1 = (iy + 1) % grid;

            // Smoothstep curve for soft cloud-like transitions
            let u = fx * fx * (3.0 - 2.0 * fx);
            let v = fy * fy * (3.0 - 2.0 * fy);

            let c00 = randoms[iy * grid + ix];
            let c10 = randoms[iy * grid + ix1];
            let c01 = randoms[iy1 * grid + ix];
            let c11 = randoms[iy1 * grid + ix1];

            // Bilinear interpolation
            let nx0 = c00 * (1.0 - u) + c10 * u;
            let nx1 = c01 * (1.0 - u) + c11 * u;
            let n = nx0 * (1.0 - v) + nx1 * v;

            let val = Math.floor(n * 255);
            let idx = (y * size + x) * 4;
            data[idx] = val;
            data[idx + 1] = val;
            data[idx + 2] = val;
            data[idx + 3] = 255;
        }
    }

    const tex = new THREE.DataTexture(data, size, size, THREE.RGBAFormat);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.minFilter = THREE.LinearFilter;
    tex.magFilter = THREE.LinearFilter;
    tex.needsUpdate = true;
    return tex;
};

onMounted(async () => {
    if (typeof window === 'undefined') return
    stableHeight.value = window.innerHeight
    lastWidth = window.innerWidth
    dynamicZoneHeight.value = window.innerHeight

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleResize)

    scene = new THREE.Scene()
    camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)

    renderer = new THREE.WebGPURenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    // [FIX] Transparent clear color so the un-scissored area doesn't black out the DOM
    renderer.setClearColor(0x000000, 0)

    const maxWidth = 1920
    const renderScale = Math.min(1.0, maxWidth / window.innerWidth)
    renderer.setSize(window.innerWidth * renderScale, window.innerHeight * renderScale, false)

    canvasContainer.value.appendChild(renderer.domElement)

    const textureLoader = new THREE.TextureLoader()
    const maskTexture = await textureLoader.loadAsync('/images/Jorrik.svg')

    const img = maskTexture.image
    uTextureAspect.value = img.width / img.height

    uPlaneAspect.value = window.innerWidth / window.innerHeight

    const noiseDataTex = createNoiseTexture()

    const main = Fn(() => {
      const coords = uv()

      const ratio = uPlaneAspect.div(uTextureAspect)
      const containUV = vec2(0, 0).toVar()
      If(ratio.greaterThan(1.0), () => {
          const maxRatio = max(ratio, 1.0)
          containUV.assign(vec2(coords.x.sub(0.5).mul(maxRatio).add(0.5), coords.y))
      }).Else(() => {
          containUV.assign(vec2(coords.x, coords.y.sub(0.5).div(ratio).add(0.5)))
      })
      const centeredUV = containUV.sub(0.5).div(uMaskScale).add(0.5)

      const padding = float(0.015)
      const targetWidth = uMaskHeight.mul(uTextureAspect).div(uPlaneAspect)
      const targetOriginX = padding
      const targetOriginY = float(1.0).sub(uMaskHeight).add(padding.div(2))
      const cornerUV = coords.sub(vec2(targetOriginX, targetOriginY)).div(vec2(targetWidth, uMaskHeight))

      const currentUV = mix(centeredUV, cornerUV, uMoveProgress)

      const isInsideMask = currentUV.x.greaterThan(0).and(currentUV.x.lessThan(1))
                          .and(currentUV.y.greaterThan(0)).and(currentUV.y.lessThan(1))
                          .select(1.0, 0.0)

      const rawMaskValue = texture(maskTexture, currentUV).r

      const normalMask = rawMaskValue.mul(isInsideMask)

      const invertedMask = float(1.0).sub(rawMaskValue.mul(isInsideMask))

      const transition = smoothstep(float(0.92), float(0.96), uMoveProgress);

      const maskAlpha = mix(normalMask, invertedMask, transition)

        const finalAlpha = mix(float(1.0), maskAlpha, uMaskStrength)

        // Noise Background using DataTexture instead of expensive mx_noise_float
        const nBig = texture(noiseDataTex, vec2(coords.x.mul(0.5), time.mul(0.1)).div(16.0)).r.mul(2.0).sub(1.0)
        const nSmall = texture(noiseDataTex, vec2(coords.x.mul(4.0), time.mul(0.4)).div(16.0)).r.mul(2.0).sub(1.0)
        const center = mix(float(0.0), float(1.0), nBig.mul(0.6).add(nSmall.mul(0.4)).mul(0.5).add(0.5))

        const offsetTransition = smoothstep(float(0.5), float(1.0), uMoveProgress);

      const offset = uMoveProgress.mul(0.5);

      const noiseMask = smoothstep(
        center.add(offset).sub(0.1),
        center.add(offset).add(0.1),
        coords.y
      )
      const noiseResult = mix(vec4(uColourTop,1.0), vec4(uColourBottom, 1.0), noiseMask)

      // [FIX] Explicitly paint a solid black background outside the mask instead of leaving it transparent,
      // since the canvas itself is now transparent to allow the DOM to show through at the bottom.
      const baseOutput = mix(vec4(0.0, 0.0, 0.0, 1.0), noiseResult, finalAlpha)

      // [FIX] Perform sub-pixel anti-aliased clipping natively in the shader.
      // This calculates transparency at the fragment level, allowing for perfectly smooth edges
      // that don't jump between physical screen pixels.
      const clipEdge = smoothstep(uClipUV.sub(uOnePixelY), uClipUV.add(uOnePixelY), coords.y)

      return baseOutput.mul(clipEdge)
  })

    const material = new THREE.NodeMaterial()
    material.fragmentNode = main()
    material.transparent = true

    mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material)
    scene.add(mesh)

    // [MODIFIED] Integrated GSAP Ticker for better mobile sync and 120Hz support
    const renderLoop = (time, deltaTime) => {
      // deltaTime is in ms, convert to seconds
      const dt = deltaTime / 1000

      let targetZoom = 0
      let targetMove = 0

      if (route.path === '/') {
        // [MODIFIED] Calculate targets directly from raw scrollProgress to remove latency
        targetZoom = Math.min(scrollProgress / 0.6, 1.0)
        targetZoom = 1 - Math.pow(1 - targetZoom, 3)

        targetMove = Math.max(0, (scrollProgress - 0.6) / 0.4)
        targetMove = targetMove * targetMove * (3.0 - 2.0 * targetMove)
      } else {
        targetZoom = 1
        targetMove = 1
      }

      // [MODIFIED] Apply single-pass smoothing at a higher speed (20)
      smoothZoomPhase = lerp(smoothZoomPhase, targetZoom, LERP_SPEED, dt)
      smoothMovePhase = lerp(smoothMovePhase, targetMove, LERP_SPEED, dt)

      uMaskScale.value = 100.0 + (1.0 - 100.0) * smoothZoomPhase
      uMoveProgress.value = smoothMovePhase
      // Strength follows zoom phase directly for consistency
      uMaskStrength.value = Math.min(smoothZoomPhase * 10.0, 1.0)

      // Color lerping also needs to be snappier (speed 10)
      uColourTop.value.lerp(targetTop, 1 - Math.exp(-10 * dt))
      uColourBottom.value.lerp(targetBottom, 1 - Math.exp(-10 * dt))

      let targetClipAmount = updateClip()

      const drawingSize = new THREE.Vector2()
      renderer.getSize(drawingSize)
      const scaleFactor = drawingSize.y / stableHeight.value

      // 1. VISUAL SMOOTHNESS (Shader)
      uClipUV.value = targetClipAmount / stableHeight.value
      uOnePixelY.value = 1.0 / drawingSize.y

      // 2. PERFORMANCE (Hardware Scissor)
      // We delay/pad the hardware scissor by 100px so its integer snapping is never seen.
      // Shader handles the visual edge; Scissor handles the GPU culling.
      const scissorBuffer = 100
      const hardwareClipAmount = Math.max(0, targetClipAmount - scissorBuffer)

      const scissorX = 0
      const scissorY = 0
      const scissorW = Math.round(drawingSize.x)
      const scissorH = Math.round(drawingSize.y - scissorY)

      renderer.setScissorTest(true)
      renderer.setScissor(scissorX, scissorY, scissorW, scissorH)

      renderer.setViewport(0, 0, drawingSize.x, drawingSize.y)
      renderer.render(scene, camera)
    }

    await renderer.init()
    console.log(`Canvas.vue: Rendering with ${renderer.backend.isWebGPUBackend ? 'WebGPU' : 'WebGL'} fallback`)
    gsap.ticker.add(renderLoop)
})

onBeforeUnmount(() => {
    if (typeof window !== 'undefined') {
        window.removeEventListener('scroll', handleScroll)
        window.removeEventListener('resize', handleResize)
    }
    // [MODIFIED] Cleanup GSAP ticker listener
    gsap.ticker.remove(animationId)
    renderer.dispose()
})

</script>
<template>
     <div class="canvas-fixed-container" ref="canvasContainer"  :style="{ height: stableHeight + 'px' }" ></div>
</template>
<style lang="scss" scoped>
    .canvas-fixed-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    z-index: 100;
    pointer-events: none;

    :deep(canvas) {
        width: 100% !important;
        height: 100% !important;
    }
    }
</style>