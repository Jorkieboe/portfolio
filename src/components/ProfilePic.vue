<script setup>
import { onMounted, ref, onBeforeUnmount, watch } from 'vue'
import * as THREE from 'three/webgpu'
import { uniform, positionLocal, float, vec3, Fn } from 'three/tsl'
import { gsap } from 'gsap'

const props = defineProps({
  scrollProgress: {
    type: Number,
    default: 0
  }
})

const container = ref(null)
const isMobile = ref(false)
let renderer, scene, camera, mesh, animationId
let lastWidth = 0
let lastHeight = 0

const bendProgress = uniform(0.0)

const checkMobile = () => {
  isMobile.value = window.innerWidth <= 1024
}

function easeInOutSineBump(t) {
  const s = Math.sin(Math.PI * t)
  return s * s * (3 - 2 * s)
}

const applyTransformations = (progress, duration = 1.2) => {
  if (!mesh || !bendProgress) return

  // Rotation logic
  gsap.to(mesh.rotation, {
    y: THREE.MathUtils.degToRad(0),
    x: THREE.MathUtils.degToRad(easeInOutSineBump(progress) * 90),
    z: isMobile.value ? 0 : THREE.MathUtils.degToRad(easeInOutSineBump(progress) * -45),
    duration: duration,
    ease: "expo.out",
    overwrite: true
  })

  // Position logic
  let targetX = 0
  let targetZ = 0

  if (isMobile.value) {
    targetZ = -5 * (1 - progress)
    targetX = 0
  } else {
    targetZ = -5 * Math.min(progress / 0.25, 1)
    targetX = -(2.5 * progress)
  }

  gsap.to(mesh.position, {
    x: targetX,
    z: targetZ,
    y: 0,
    duration: duration,
    overwrite: true,
    ease: "expo.out"
  })

  // Shader logic
  gsap.to(bendProgress, {
    value: progress,
    duration: duration,
    ease: "expo.out",
    overwrite: true
  })
}

const initThree = async () => {
  scene = new THREE.Scene()

  const width = container.value.clientWidth
  const height = container.value.clientHeight

  camera = new THREE.PerspectiveCamera(35, width / height, 0.1, 1000)
  camera.position.z = 5

  renderer = new THREE.WebGPURenderer({ antialias: true, alpha: true })
  renderer.setSize(width, height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  container.value.appendChild(renderer.domElement)

  const loader = new THREE.TextureLoader()
  const texture = await loader.loadAsync('/images/Jorrik.jpg')

  const geometry = new THREE.BoxGeometry(2, 2.5, 0.05, 32, 32, 2)

  const material = new THREE.MeshStandardNodeMaterial({
    map: texture,
    side: THREE.DoubleSide,
    roughness: 0.4,
    metalness: 0.2
  })

  const bendVertexNode = Fn(() => {
    const pos = positionLocal;
    const yLocal = pos.y.add(1.25).div(2.5);
    const t = bendProgress.div(0.5).clamp(0.0, 1.0);
    const envelope = t.mul(Math.PI).sin();
    const phase = yLocal.mul(Math.PI * 1.0).sub(t.mul(Math.PI * 1.0));
    const wave = phase.sin();
    const zOffset = wave.mul(envelope).mul(1.2);
    const yOffset = zOffset.abs().mul(-0.1);
    return pos.add(vec3(0.0, yOffset, zOffset));
  });

  material.positionNode = bendVertexNode();

  mesh = new THREE.Mesh(geometry, material)
  scene.add(mesh)

  // Initial state setup
  applyTransformations(props.scrollProgress, 0)

  const ambient = new THREE.AmbientLight(0xffffff, 1.5)
  scene.add(ambient)

  const light = new THREE.PointLight(0xffffff, 10)
  light.position.set(2, 2, 5)
  scene.add(light)

  const animate = () => {
    animationId = requestAnimationFrame(animate)
    if (mesh) {
        mesh.position.y = Math.sin(Date.now() * 0.001) * 0.05
    }
    renderer.render(scene, camera)
  }

  await renderer.init()
  console.log(`ProfilePic.vue: Rendering with ${renderer.backend.isWebGPUBackend ? 'WebGPU' : 'WebGL'} fallback`)
  animate()
}

watch(() => props.scrollProgress, (progress) => {
  applyTransformations(progress)
})

const handleResize = () => {
  if (!container.value) return

  const width = window.innerWidth
  const height = window.innerHeight

  // Check if width actually changed to avoid "jumps" on mobile bar resize
  // We only trigger re-positioning logic if the width changed or height changed significantly (> 120px)
  const widthChanged = width !== lastWidth
  const significantHeightChange = Math.abs(height - lastHeight) > 120

  if (!widthChanged && !significantHeightChange) {
    // Still update renderer size for minor height changes to keep aspect ratio perfect,
    // but don't reset isMobile or re-run mesh positioning which causes the "jump"
    const w = container.value.clientWidth
    const h = container.value.clientHeight
    camera.aspect = w / h
    camera.updateProjectionMatrix()
    renderer.setSize(w, h)
    return
  }

  lastWidth = width
  lastHeight = height

  checkMobile()
  const w = container.value.clientWidth
  const h = container.value.clientHeight
  camera.aspect = w / h
  camera.updateProjectionMatrix()
  renderer.setSize(w, h)

  // Re-apply transformations immediately for the new size
  applyTransformations(props.scrollProgress, 0)
}

onMounted(() => {
  lastWidth = window.innerWidth
  lastHeight = window.innerHeight
  checkMobile()
  initThree()
  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  cancelAnimationFrame(animationId)
  window.removeEventListener('resize', handleResize)
  renderer.dispose()
})
</script>

<template>
  <div class="profile-3d-container" ref="container"></div>
</template>

<style scoped>
.profile-3d-container {
  width: 100%;
  height: 100%;
  cursor: grab;
  filter: drop-shadow(0 20px 30px rgba(0,0,0,0.2));
}
</style>