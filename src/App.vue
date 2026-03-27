<script setup>
import { provide, watch, reactive, onMounted } from 'vue';
import { useLang } from './composables/useLang'
const { currentLang, setLang } = useLang()
import { useMainStore } from './store/store'
import Canvas from './components/canvas.vue';
import { useSpring, useMotionProperties } from '@vueuse/motion';
import gsap from 'gsap';

const store = useMainStore()

provide('store', store)

const vh = window.innerHeight
const initialHeaderPx = vh - (vh * store.headerSize)

const scrollTo = (id) => {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

const onBeforeLeave = () => {
  const vh = window.innerHeight
  const headerPx = vh * store.headerSize
  
  store.isTransitioning = true
}

const onLeave = (el, done) => {
  store.isTransitioning = true
   gsap.to(store, {
    transitionClipOverride: 0,
    duration: 0.4,
    onComplete: ()=>{
      store.isTransitioning = false
      done()
    }
  })
}

const onEnter = (el, done) => {
  store.isTransitioning = true
  gsap.to(store, {
    transitionClipOverride: initialHeaderPx,
    delay: 0.5,
    duration: 0.4,
    onComplete: ()=>{
      store.isTransitioning = false
      done()
    }
  })
}

</script>
<template>
   <div ref="motionprop" style="display: none;"></div>
  <!-- <div class="header">
      <div class="headerContent">
          <router-link id='title' to="/"><h2>Jorrik Dillisse</h2></router-link>

          <ul v-if="$route.path === '/'">
              <li id='clickable' @click="scrollTo('projects')">work</li>
              <li id='clickable' @click="scrollTo('about')">about me</li>
              <li id='clickable' @click="scrollTo('footer')">contact</li>
          </ul>
          <ul v-else>
              <li id='clickable' @click="$router.push('/')">work</li>
              <li id='clickable' @click="$router.push('/')">about me</li>
              <li id='clickable' @click="scrollTo('footer')">contact</li>
          </ul>

          <select :value="currentLang" @change="e => setLang(e.target.value)" class="langSel">
              <option value="nl">nl</option>
              <option value="en">en</option>
          </select>
      </div>
  </div> -->

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

h3, h4, p{
  margin: 0;
}
.content-wrapper {
   min-height: 100vh;
   display: flex;
   flex-direction: column;
}
</style>