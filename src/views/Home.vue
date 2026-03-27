<template>
  <div>
    <div class="home">
        <img class="homeImage" src="/images/home.png">
        <h3 class="homeText">{{ t.homePage.subText }}</h3>
    </div>
    <div class="content">
        <div class="projects" id="projects">
            <h3 class="sectionTitle">Work</h3>
            <div class="projectlist">
                <div
                  v-for="(project, index) in projects"
                  :key="project.id"
                  class="projectWrapper"
                  :class="['pj' + (index + 1), { active: activeProject === index, inactive: activeProject !== null && activeProject !== index }]"
                  v-animate="'oneway'"
                  @mouseenter="!isMobile && (activeProject = index)"
                  @mouseleave="!isMobile && (activeProject = null)"
                >
                    <div class="project">
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
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useLang } from '../composables/useLang'

const { t } = useLang()


const projectIds =[
  'begrijpendBiased',
  'gamification',
  'festivalRecommender',
  'burgerCrush',
  'vrGame',
  'inABox'
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
</script>

<style scoped>
.projectWrapper.active {
  transform: translateY(0px) !important;
  opacity: 1 !important;
  pointer-events: all !important;
}
.projectWrapper.active .projectImage {
  clip-path: polygon(0% 0%, 100% 0%, 75% 100%, 0% 100%);
  min-width: 20vw;
  transition: all 1s;
}
.projectWrapper.active .projectPanel {
  padding-top: 25px;
  padding-left: 5px;
  margin-right: 35px;
  width: 30vw;
  display: block;
  transition: 1s;
  left: 0;
  opacity: 1;
}
.projectWrapper.inactive {
  pointer-events: none;
}

@media (max-width: 765px) {
    .projectWrapper.active .projectImage {
        width: 20vw;
    }
    .projectWrapper.active .projectPanel {
        padding: 0;
        padding-left: 15px;
        width: 70vw;
        height: 300px;
    }
}
</style>