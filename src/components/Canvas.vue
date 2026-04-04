<script setup>
import { onMounted, ref, onBeforeUnmount, inject, watch } from 'vue'
import * as THREE from 'three/webgpu'
import { Fn, uv, float, uniform, texture, smoothstep, vec2, vec3, min, vec4, mix, max, time, mx_noise_float, If } from 'three/tsl'
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

let scrollProgress = 0
let smoothedProgress = 0
const lerpFactor = 0.12

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
    if (!canvasContainer.value) return
    const containerHeight = stableHeight.value
    const targetHeaderH = containerHeight * store.headerSize
    let clipAmount = 0

    if (store.isTransitioning) {
        clipAmount = store.transitionClipOverride
    } else if (store.track) {
        // Track the bottom bounding box of the zoom container for perfect stability
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
}

const handleScroll = () => {
    const zoomTrackHeight = stableHeight.value * 2.5
    const currentScroll = window.scrollY
    scrollProgress = Math.min(currentScroll / zoomTrackHeight, 1.0)
    updateClip()
}

const handleResize = () => {
    if (!canvasContainer.value) return

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

    const maxWidth = 1920
    const renderScale = Math.min(1.0, maxWidth / window.innerWidth)
    renderer.setSize(window.innerWidth * renderScale, window.innerHeight * renderScale, false)

    canvasContainer.value.appendChild(renderer.domElement)

    const textureLoader = new THREE.TextureLoader()
    const maskTexture = await textureLoader.loadAsync('/images/Jorrik.svg')

    const img = maskTexture.image
    uTextureAspect.value = img.width / img.height

    uPlaneAspect.value = window.innerWidth / window.innerHeight

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

      // Noise Background
      const nBig = mx_noise_float(vec2(coords.x.mul(0.5), time.mul(0.1)))
      const nSmall = mx_noise_float(vec2(coords.x.mul(4.0), time.mul(0.4)))
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

      let targetZoom = 0
      let targetMove = 0
      let targetStrength = 0

      if (route.path === '/') {
        smoothedProgress += (scrollProgress - smoothedProgress) * lerpFactor

        targetZoom = Math.min(smoothedProgress / 0.6, 1.0)
        targetZoom = 1 - Math.pow(1 - targetZoom, 3)

        targetMove = Math.max(0, (smoothedProgress - 0.6) / 0.4)
        targetMove = targetMove * targetMove * (3.0 - 2.0 * targetMove)

        targetStrength = Math.min(smoothedProgress * 10.0, 1.0)
      } else {
        // Targets for Project pages
        targetZoom = 1
        targetMove = 1
        targetStrength = 1
      }

      // [FIX] Smoothly lerp towards targets to avoid snapping when route changes
      smoothZoomPhase += (targetZoom - smoothZoomPhase) * 0.1
      smoothMovePhase += (targetMove - smoothMovePhase) * 0.1

      uMaskScale.value = 100.0 + (1.0 - 100.0) * smoothZoomPhase
      uMoveProgress.value = smoothMovePhase
      uMaskStrength.value = Math.min(smoothZoomPhase * 10.0, 1.0)

      uColourTop.value.lerp(targetTop, 0.05)
      uColourBottom.value.lerp(targetBottom, 0.05)

      updateClip()

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
    background-color: black;
    will-change: clip-path, -webkit-clip-path;
    filter: drop-shadow(0 0 0.75rem crimson);

    :deep(canvas) {
        width: 100% !important;
        height: 100% !important;
    }
    }
</style>