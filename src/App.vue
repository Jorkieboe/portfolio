<script setup>
import { provide, watch, reactive, onMounted } from 'vue';
import { useLang } from './composables/useLang'

import { useMainStore } from './store/store'
import Canvas from './components/canvas.vue';
import gsap from 'gsap';
import { useRouter } from 'vue-router'

const { currentLang, setLang } = useLang()
const router = useRouter()
const store = useMainStore()

provide('store', store)

const vh = window.innerHeight

const scrollTo = (id) => {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

const onBeforeLeave = () => {
  store.isTransitioning = true
}

const onLeave = (el, done) => {
  store.isTransitioning = true

    const isHome = router.currentRoute.value.path === '/'
    const targetClip = isHome ? 0 : vh - (vh * store.headerSize)

  if(isHome){
    gsap.to(store, {
      transitionClipOverride: targetClip,
      duration: 0.2,
      onComplete: ()=>{
      // store.isTransitioning = false
      done()
    }
    })
  }else{
    gsap.from(store, {
    transitionClipOverride: vh - (vh * store.headerSize),
    duration: 0.4,
    onComplete: ()=>{
      // store.isTransitioning = false
      done()
    }
  })
  }
   
}

const onEnter = (el, done) => {
  // store.isTransitioning = true
  const vh = window.innerHeight
  const headerClip = vh - (vh * store.headerSize)

  const isHome = router.currentRoute.value.path === '/'
  const targetClip = isHome ? 0 : headerClip

  gsap.to(store, {
    transitionClipOverride: targetClip,
    delay: 0.1,
    duration: isHome ? 0.2 : 0.5,
    ease: "power2.out",
    onComplete: ()=>{
      store.isTransitioning = false
      done()
    }
  })
}

</script>
<template>

  <div class="navigation" :style="{height: store.headerSize * vh + 'px'}">
    <div class="home-button" @click="router.push('/')"></div>
  </div>

  <Canvas></Canvas>

  <div class="page content-wrapper">
     <router-view v-slot="{ Component }">
      <transition
        mode="out-in"
        :css="false"
        @before-leave="onBeforeLeave"
        @leave="onLeave"
        @enter="onEnter"
      >
        <component :is="Component" :key="$route.path" />
      </transition>
    </router-view>
  </div>

  <div class="footer" id="footer">
      <a href="https://github.com/Jorkieboe"><img class="link" src="/images/Icons/github-mark-white.png"></a>
      <a href="https://www.linkedin.com/in/jorrik-dillisse-118556178/"><img class="link" src="/images/Icons/LI-In-Bug.png"></a>
      <p class="footerText">
        <a class="contact" href="tel:0634640525">+31 (0)6 34640525</a>   |
        <a class="contact" href="mailto:jorrikdillisse@gmail.com">jorrikdillisse@gmail.com</a>
      </p>
  </div>
</template>

<style>

.navigation{
  position: fixed;
  top: 0;
  left: 0;
  width: 20vw;

  z-index: 200;

  .home-button{
    width: 20vw;
    height: 100%;
  }
}

h3, h4, p{
  margin: 0;
}
.content-wrapper {
   min-height: 100vh;
   display: flex;
   flex-direction: column;
}
</style>