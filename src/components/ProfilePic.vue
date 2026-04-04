<script setup>
import { onMounted, ref, onBeforeUnmount, watch } from 'vue'
import * as THREE from 'three/webgpu'
// Import TSL (Three.js Shading Language) nodes
import { uniform, positionLocal, float, vec3, Fn } from 'three/tsl'
import { gsap } from 'gsap'

const props = defineProps({
  scrollProgress: {
    type: Number,
    default: 0
  }
})

const container = ref(null)
let renderer, scene, camera, mesh, animationId

// Uniform to track the raw scroll progress in the shader
const bendProgress = uniform(0.0)

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

  // Load Texture
  const loader = new THREE.TextureLoader()
  const texture = await loader.loadAsync('/images/Jorrik.jpg')
  
  // High segments so the S-curve has enough geometry to bend smoothly
  const geometry = new THREE.BoxGeometry(2, 2.5, 0.05, 32, 32, 2)
  
  const material = new THREE.MeshStandardNodeMaterial({ 
    map: texture,
    side: THREE.DoubleSide,
    roughness: 0.4,
    metalness: 0.2
  })

  // --- TSL VERTEX SHADER LOGIC ---
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

  // Lighting to give it depth
  const ambient = new THREE.AmbientLight(0xffffff, 1.5)
  scene.add(ambient)
  
  const light = new THREE.PointLight(0xffffff, 10)
  light.position.set(2, 2, 5)
  scene.add(light)

  const animate = () => {
    animationId = requestAnimationFrame(animate)
    
    // Subtle floating movement  
    if (mesh) {
        mesh.position.y = Math.sin(Date.now() * 0.001) * 0.05
    }
    
    renderer.render(scene, camera)
  }

  await renderer.init()
  animate()
}

function easeInOutSineBump(t) {
  const s = Math.sin(Math.PI * t)
  return s * s * (3 - 2 * s) // smoothstep on sine
}

watch(() => props.scrollProgress, (progress) => {
  if (!mesh || !bendProgress) return
  
  gsap.to(mesh.rotation, {
    y: THREE.MathUtils.degToRad(0), 
    x: THREE.MathUtils.degToRad(easeInOutSineBump(progress) * 90),
    z: THREE.MathUtils.degToRad(easeInOutSineBump(progress) * -45 ),
    duration: 1.2,
    ease: "expo.out" 
  })

  gsap.to(mesh.position, {
    y: 0,
    x: -(2 * progress), 
    z: -5 * Math.min(progress / 0.25, 1), 
    duration: 1.2,
    overwrite: true,
    ease: "expo.out" 
  })

  gsap.to(bendProgress, {
    value: progress, 
    duration: 1.2,
    ease: "expo.out",
    overwrite: true
  })
})

const handleResize = () => {
  if (!container.value) return
  const w = container.value.clientWidth
  const h = container.value.clientHeight
  camera.aspect = w / h
  camera.updateProjectionMatrix()
  renderer.setSize(w, h)
}

onMounted(() => {
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