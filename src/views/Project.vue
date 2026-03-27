<script setup>
import { computed, onMounted, inject, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useLang } from '../composables/useLang'

const route = useRoute()
const { t } = useLang()

const store = inject('store')

const localContentRef = ref()

onMounted(()=>{
  store.content = localContentRef
})

const projectId = computed(() => route.params.id)
const projectData = computed(() => t.value[projectId.value])

const getTitle = (obj) => obj?.title || obj?.firstTitle || obj?.secondTitle || obj?.thirdTitle || ''
const getText = (obj) => obj?.text || obj?.firstText || obj?.secondText || obj?.thirdText || ''

const configMap = {
  begrijpendBiased: {
    prefix: 'bb',
    hasSmall: true,
    imgBig: 'bb_bigImage',
    imgSmall1: 'bb_small',
    imgSmall2: 'bb_small2',
    imgSec1: 'bb_problem',
    imgSec2: 'bb_concept',
    imgSec3: 'bb_dev'
  },
  gamification: {
    prefix: 'gf',
    hasSmall: false,
    imgBig: 'gf_bigImage',
    imgSec1: 'gf_probleem',
    imgSec2: 'gf_concept',
    imgSec3: 'gf_development'
  },
  festivalRecommender: {
    prefix: 'rf',
    hasSmall: false,
    imgBig: 'rf_bigImage',
    imgSec1: 'rf_concept',
    imgSec2: 'rf_data',
    imgSec3: 'rf_development'
  },
  burgerCrush: {
    prefix: 'bc',
    hasSmall: false,
    imgBig: 'bc_bigImage',
    imgSec1: 'bc_opdracht',
    imgSec2: 'bc_Development',
    imgSec3: ''
  },
  vrGame: {
    prefix: 'vr',
    hasSmall: true,
    imgBig: 'vr_bigImage',
    imgSmall1: 'vr_smallIm1',
    imgSmall2: 'vr_smallIm2',
    imgSec1: 'vr_probleem',
    imgSec2: 'vr_concept',
    imgSec3: 'vr_development'
  },
  inABox: {
    prefix: 'ib',
    hasSmall: true,
    imgBig: 'ib_bigImage',
    imgSmall1: 'ib_smallIm1',
    imgSmall2: 'ib_smallIm2',
    imgSec1: 'ib_game',
    imgSec2: 'ib_art',
    imgSec3: 'ib_development'
  }
}

const cfg = computed(() => configMap[projectId.value] || configMap.begrijpendBiased)
</script>
<template>
  <div class="content" ref="localContentRef" v-if="projectData">
      <div class="projectIntro">
          <div class="projectTitle">
              <h4 id="projectType">{{ projectData.projectType }}</h4>
              <h2 class="projectName">{{ projectData.projectTitle }}</h2>
          </div>
          <div class="projectDescription">
              <p class='text' id="projectDescriptionPage">{{ projectData.introText }}</p>
          </div>
      </div>

      <div class="projectOverview" :class="cfg.prefix">
          <div class="bigImage" :id="cfg.imgBig" v-animate="'oneway'"></div>

          <div class="bigImage" id="gf_bigImage2" v-if="projectId === 'gamification'" v-animate="'oneway'"></div>

          <div class="smallImageSection" v-if="cfg.hasSmall">
              <div class="smallImage1" :id="cfg.imgSmall1" v-animate="'oneway'"></div>
              <div class="smallImage2" :id="cfg.imgSmall2" v-animate="'oneway'"></div>
          </div>
      </div>

      <div class="projectInfoSection" id="projectProblem" v-if="projectData.content[0]" v-animate>
          <div class="sectionInfo">
              <h2 class="subTitle">{{ getTitle(projectData.content[0]) }}</h2>
              <p class="text subSectionText" v-html="getText(projectData.content[0])"></p>
          </div>
          <div class="topMask">
              <div class="subSectionImage" :id="cfg.imgSec1" v-animate></div>
          </div>
      </div>

      <div class="projectInfoSection middle" id="projectConcept" v-if="projectData.content[1]" v-animate>
          <div class="topMask" id="middlemask">
              <div class="subSectionImage middle" :id="cfg.imgSec2" v-animate></div>
          </div>
          <div class="sectionInfo" id="middleSection" v-animate>
              <h2 class="subTitle">{{ getTitle(projectData.content[1]) }}</h2>
              <p class="text subSectionText" v-html="getText(projectData.content[1])"></p>
          </div>
      </div>

      <div class="projectInfoSection" id="projectDevelopment" v-if="projectData.content[2]" v-animate>
          <div class="sectionInfo">
              <h2 class="subTitle">{{ getTitle(projectData.content[2]) }}</h2>
              <p class="text subSectionText" v-html="getText(projectData.content[2])"></p>
          </div>
          <div class="topMask">
              <div class="subSectionImage" :id="cfg.imgSec3" v-animate></div>
          </div>
      </div>
  </div>
</template>