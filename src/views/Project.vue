<script setup>
import { computed, onMounted, inject, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useLang } from '../composables/useLang'
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from 'gsap/SplitText';
import {colors} from '../utils/colors'

const route = useRoute()
const { t } = useLang()

const store = inject('store')

const localContentRef = ref()

let mm;

onMounted(() => {
    store.content = localContentRef
    gsap.registerPlugin(ScrollTrigger, SplitText);
    mm = gsap.matchMedia(localContentRef.value);

    mm.add({
        isDesktop: "(min-width: 766px)",
        isMobile: "(max-width: 765px)"
    }, (context) => {

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".projectOverview",
                start: "top 15%",
                end: "+=800",
                pin: true,
                pinSpacing: true,
                scrub: 1,
                markers: false
            }
        });

        tl.from(".bigImage", {
            scale: 0.8,
            opacity: 0,
            duration: 0.5,
            ease: "power2.out"
        })

        tl.from([".smallImage1", ".smallImage2"], {
            scale: 0,
            opacity: 0,
            stagger: 0.2,
            duration: 0.8,
            ease: "back.out(1.7)"
        }, "-=0.5");

    })
})

const projectId = computed(() => route.params.id)
const projectData = computed(() => t.value[projectId.value])

const configMap = {
  begrijpendBiased: {
    prefix: 'bb',
    hasSmall: true,
    imgBig: 'bb_bigImage',
    imgSmall1: 'bb_small',
    imgSmall2: 'bb_small2'
  },
  gamification: {
    prefix: 'gf',
    hasSmall: false,
    imgBig: 'gf_bigImage'
  },
  festivalRecommender: {
    prefix: 'rf',
    hasSmall: false,
    imgBig: 'rf_bigImage'
  },
  burgerCrush: {
    prefix: 'bc',
    hasSmall: false,
    imgBig: 'bc_bigImage'
  },
  vrGame: {
    prefix: 'vr',
    hasSmall: true,
    imgBig: 'vr_bigImage',
    imgSmall1: 'vr_smallIm1',
    imgSmall2: 'vr_smallIm2'
  },
  inABox: {
    prefix: 'ib',
    hasSmall: true,
    imgBig: 'ib_bigImage',
    imgSmall1: 'ib_smallIm1',
    imgSmall2: 'ib_smallIm2'
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
              <p class='text'>{{ projectData.introText }}</p>
          </div>
      </div>

      <div class="projectOverview" :class="cfg.prefix">
          <div class="bigImage" :id="cfg.imgBig" v-animate="'oneway'"></div>

          <div class="bigImage" id="gf_bigImage2" v-if="projectId === 'gamification'" v-animate="'oneway'"></div>

          <div class="smallImageSection" v-if="cfg.hasSmall">
              <div class="smallImage1" :id="cfg.imgSmall1"></div>
              <div class="smallImage2" :id="cfg.imgSmall2"></div>
          </div>
      </div>

      <div v-for="(content, index) in projectData.content" :key="index" class="projectInfoContainer" :style="{backgroundColor: index == 0 ? colors[store.projectActive ? store.projectActive : 0].top.hex : 'transparent'}" :class="[{ 'middle': index % 2 !== 0 }, {'first': index == 0}]">
        <div class="wrapper">
          <div class="sectionInfo">
              <h2 class="subTitle">{{ content.title }}</h2>
              <p class="text subSectionText" v-html="content.text"></p>
          </div>

          <div class="subSectionImage">
              <img :src="content.image" :alt="content.title" class="subSectionImg">
          </div>
        </div>
      </div>
  </div>
</template>
<style lang="scss" scoped>
    .projectIntro {
        display: flex;
        justify-content: space-between;
        max-width: 1920px;
        width: 90%;
        margin: auto;
        margin-top: 100px;

        #projectType {
            font-family: Cooper;
            font-size: 2rem;
            margin-bottom: 0px;
        }
        .projectName {
            font-family: Cooper;
            font-size: 5rem;
            max-width: 800px;
            width: 100%;
            margin-top: 0;
        }
        .projectDescription {
            max-width: 700px;
            display: flex;
            align-items: center;
            p{
                font-size: 1.2rem;
            }
        }
    }

    .projectOverview {
        max-width: 1920px;
        width: 100vw;
        display: flex;
        height: 800px;
        margin: auto;

        .bigImage {
            max-width: 1200px;
            width: 100vw;
            height: 800px;
            background-image: url('/images/mobilescreens.jpg');
            background-position: center;
            background-size: auto 800px;
            background-repeat: no-repeat;
            overflow: hidden;
        }

        .smallImageSection {
            display: flex;
            flex-direction: column;

           .smallImage1 {
                max-width: 720px;
                width: 100vw;
                height: 400px;
                background-image: url('/images/sfeer.jpg');
                background-position: center;
                background-size: auto 420px;
                background-repeat: no-repeat;
                overflow: hidden;
            }

            .smallImage2 {
                max-width: 720px;
                width: 100vw;
                height: 400px;
                background-image: url('/images/uitlegschermronde1.jpg');
                background-position: center;
                background-size: auto 420px;
                background-repeat: no-repeat;
                overflow: hidden;
            }
        }
    }

    .projectInfoContainer {
        
        padding: 20px 0;
        &.first{
            background-color: aquamarine;
        }

        .wrapper{
            display: flex;
            justify-content: center;
            align-items: center;
            max-width: 60rem;
            width: 90%;
            margin: 0 auto;
            .sectionInfo {
                display: flex;
                flex-direction: column;
                justify-content: center;
                margin-left: 50px;
                margin-right: 50px;

                p, h2{
                    color: black;
                }
            }

            .subSectionImage {
                width: 500px;
                height: 300px;
                object-fit: contain;
                display: flex;
                justify-content: center;
                align-items: center;

                .subSectionImg {
                    height: 100%;
                    width: auto;
                    object-fit: contain;
                }
            }
         }
    }

    .projectInfoSection.middle {
        flex-direction: row-reverse;
        .subSectionImage {

        }
    }

    @media (max-width: 765px) {
        .projectInfoSection {
            flex-wrap: wrap;
            &.middle {
                flex-direction: column-reverse;
            }
        }
    }
</style>