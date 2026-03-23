<script setup>
import { useLang } from './composables/useLang'
const { currentLang, setLang } = useLang()

const scrollTo = (id) => {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}
</script>
<template>
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

  <div class="page content-wrapper">
     <router-view />
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
.content-wrapper {
   min-height: 100vh;
   display: flex;
   flex-direction: column;
}
</style>