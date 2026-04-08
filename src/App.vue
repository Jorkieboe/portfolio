<script setup>
import { provide, ref, watch } from 'vue';
import { useLang } from './composables/useLang'

import { useMainStore } from './store/store'
import Canvas from './components/canvas.vue';
import gsap from 'gsap';
import { useRouter } from 'vue-router'

const { currentLang, setLang } = useLang()
const router = useRouter()
const store = useMainStore()

const langSwitch = ref(null)

const projectIds =[
  'verhalenvangers',
  'parleyStudio',
  'futurenow',
  'festivalRecommender',
  'lisboastories',
  'vrGame',
]

provide('store', store)

const vh = window.innerHeight

watch(() => router.currentRoute.value.path, (path) => {
  if (path.startsWith('/work/')) {
    const id = path.split('/').pop()
    const index = projectIds.indexOf(id)
    if (index !== -1) {
      store.projectActive = index
    }
  } else if (path === '/') {
    // Only reset if we are actually on the home page (hover handles it there)
    store.projectActive = null
  }
}, { immediate: true })

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

  gsap.to(langSwitch.value,{
    yPercent: -100,
    duration: 0.2,
  })

  if(isHome){
    gsap.to(store, {
      transitionClipOverride: targetClip,
      duration: 0.2,
      onComplete: ()=>{
      done()
    }
    })
  }else{
    gsap.from(store, {
    transitionClipOverride: vh - (vh * store.headerSize),
    duration: 0.4,
    onComplete: ()=>{
      done()
    }
  })
  }

}

const onEnter = (el, done) => {
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
      gsap.to(langSwitch.value,{
        yPercent: 0,
        delay: isHome ? 0.8 : 0.2,
        duration: 0.2,
      })
      done()
    }
  })
}

</script>
<template>

  <div class="navigation" :style="{height: store.headerSize * vh + 'px'}">
    <div class="home-button" @click="router.push('/')"></div>
    <div class="lang-button-wrapper" ref="langSwitch">
      <div class="lang-button" :class="{'selected' : currentLang == 'nl'}" @click="()=>{setLang('nl')}">NL</div>
      <div class="lang-button" :class="{'selected' : currentLang == 'en'}" @click="()=>{setLang('en')}">EN</div>
    </div>
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
    <div class="links">
       <a href="https://github.com/Jorkieboe"><img class="link" src="/images/Icons/github-mark-white.png"></a>
      <a href="https://www.linkedin.com/in/jorrik-dillisse-118556178/"><img class="link" src="/images/Icons/LI-In-Bug.png"></a>
    </div>
    <div class="footerText">
      <a class="contact" href="tel:0634640525">+31 (0)6 34640525</a>   |
      <a class="contact" href="mailto:jorrikdillisse@gmail.com">jorrikdillisse@gmail.com</a>
    </div>
  </div>
</template>

<style>

.navigation{
  position: fixed;
  display: flex;
  justify-content: space-between;
  top: 0;
  left: 0;
  width: 100%;

  z-index: 200;

  .home-button{
    width: 20vw;
    height: 100%;
  }

  .lang-button-wrapper{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 7rem;

    .lang-button{
      width: fit-content;
      padding: 0.5rem;
      font-size: 1rem;
      font-family: Arial;
      background-color: rgba(255,255,255,0.75);

      &.selected{
        background-color: rgba(255,255,255,0.95);
      }
    }
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

.footer {
    width: 100%;
    background-color: #F2A227;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 50px;
    padding-bottom: 50px;
    flex-wrap: wrap;

    .links{
      .link {
        width: 3rem;
        height: auto;
        padding: 5px;
        align-self: flex-start;
        cursor: pointer;
}
    }
}

.footerText {
    font-family: Cooper;
    text-align: center;
    color: #fff;
    margin-bottom: 0px;
    max-width: 90%;
    margin-left: 1rem;
    height: fit-content;
}
</style>