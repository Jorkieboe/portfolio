<script setup>
import { computed, onMounted, inject, ref, watch } from 'vue'
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
const selectedImage = ref(null)

let mm;

const openImage = (image) => {
    selectedImage.value = image
}

const closeImage = () => {
    selectedImage.value = null
}

// [FIX] Handle body scroll locking without fighting CSS specificity
watch(selectedImage, (newVal) => {
    if (newVal) {
        document.body.style.overflow = 'hidden'
    } else {
        document.body.style.overflow = ''
    }
})

onMounted(() => {
    store.content = localContentRef
    gsap.registerPlugin(ScrollTrigger, SplitText);
    mm = gsap.matchMedia(localContentRef.value);

    mm.add({
        isDesktop: "(min-width: 766px)",
        isMobile: "(max-width: 765px)"
    }, (context) => {
        let { isDesktop, isMobile } = context.conditions;

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
         
            duration: 0.5,
            ease: "power2.out"
        })

        gsap.from(".small-image", {
            scrollTrigger: {
                trigger: ".small-image-container",
                start: "top 85%", // Animation starts when the container is near the bottom
                toggleActions: "play none none reverse", // Plays when scrolling down, reverses when scrolling up
            },
            y: 100,           // Slides up from 100px
            opacity: 0,       // Starts invisible
            scale: 0.9,       // Subtle scale up
            duration: 1,      

            ease: "power2.out"
        });

        const infoContainers = gsap.utils.toArray(".projectInfoContainer");

        infoContainers.forEach((container) => {
            const image = container.querySelector(".subSectionImage");
            const text = container.querySelector(".sectionInfo");

            if (image) {
                gsap.fromTo(image,
                    { opacity: 0, y: isDesktop ? 50 : 30 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 1,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: container,
                            start: "top 80%",
                            toggleActions: "play none none reverse"
                        }
                    }
                );
            }

            if (text) {
                gsap.fromTo(text,
                    { y: isDesktop ? 120 : 60 },
                    {
                        y: isDesktop ? -120 : -60,
                        ease: "none",
                        scrollTrigger: {
                            trigger: container,
                            start: "top 95%",
                            end: "bottom 5%",
                            scrub: true
                        }
                    }
                );

                gsap.fromTo(text,
                    { opacity: 0 },
                    {
                        opacity: 1,
                        duration: 0.8,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: container,
                            start: "top 80%",
                            toggleActions: "play none none reverse"
                        }
                    }
                );
            }
        });

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
        <img v-if="projectData.splashImages?.length" 
         class="bigImage" 
         :src="projectData.splashImages[0].src">

      </div>

        <div class="small-image-container">
            <img v-for="(img, index) in projectData.splashImages.slice(1)" 
                :key="index"
                class="small-image" 
                :src="img.src">
        </div>
      <

      <div v-for="(content, index) in projectData.content" :key="index" class="projectInfoContainer" :class="{ 'reversed': index % 2 !== 0 }">
        <div class="container">
          <div class="subSectionImage" @click="openImage(content.image)">
              <img :src="content.image" :alt="content.title" class="subSectionImg">
          </div>
          <div class="sectionInfo">
              <h2 class="subTitle">{{ content.title }}</h2>
              <p class="text subSectionText" v-html="content.text"></p>
          </div>
        </div>
      </div>

      <!-- [MODIFIED] Using Teleport to avoid CSS specificity issues and !important -->
      <Teleport to="body">
        <Transition name="lightbox">
            <div v-if="selectedImage" class="lightbox-overlay" @click="closeImage">
                <img class="close-button" src="/images/Icons/close-icon.svg">
                <div class="lightbox-content">
                    <img :src="selectedImage" class="lightbox-img" />
                </div>
            </div>
        </Transition>
      </Teleport>
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
        flex-direction: column;
        height: fit-content;
 
        align-items: center;

        .bigImage {
            max-width: 80rem;
            width: 75vw;
            height: auto;
            margin-bottom: 3rem;
        }

       

    }

    .small-image{
        max-width: 30rem;
        width: 100%;
        aspect-ratio: 16/9;
    }

    .small-image-container{
        display: flex;
        height: fit-content;
        gap: 8rem;
        margin-bottom: 3rem;
        margin: 0 auto;     
    }

    .projectInfoContainer {
        padding: 8rem 0;
        width: 100%;
        position: relative;

        .container {
            display: grid;
            grid-template-columns: repeat(12, 1fr);
            gap: 20px;
            max-width: 1200px;
            width: 90%;
            margin: 0 auto;
            align-items: center;

            .subSectionImage {
                grid-column: 1 / 8;
                grid-row: 1;
                z-index: 1;
                display: flex;
                justify-content: center;
                align-items: center;
                cursor: zoom-in;
                transition: opacity 0.4s ease;

                .subSectionImg {
                    width: 100%;
                    max-height: 600px;
                    object-fit: contain;
                    border-radius: 8px;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.08);
                    transition: transform 0.3s ease;

                    &:hover {
                        transform: scale(1.02);
                    }
                }
            }

            .sectionInfo {
                grid-column: 6 / 13;
                grid-row: 1;
                z-index: 2;
                background: rgba(255, 255, 255, 0.95);
                padding: 4rem;
                box-shadow: 0 20px 40px rgba(0,0,0,0.08);
                border-radius: 12px;
                backdrop-filter: blur(10px);

                .subTitle {
                    margin-top: 0;
                    font-size: 2.5rem;
                    color: #2BA69C;
                    margin-bottom: 1.5rem;
                }

                .subSectionText {
                    color: #444;
                    line-height: 1.8;
                    font-size: 1.15rem;
                    margin: 0;
                }
            }
        }

        &.reversed {
            .container {
                .subSectionImage {
                    grid-column: 6 / 13;
                }
                .sectionInfo {
                    grid-column: 1 / 8;
                }
            }
        }
    }

    @media (max-width: 900px) {
        .projectIntro {
            flex-direction: column;
            margin-top: 150px;

            .projectName {
                font-size: 3rem;
                margin-bottom: 2rem;
            }
        }

        .projectOverview {
            flex-direction: column;
            height: auto;

            .bigImage {
                height: 400px;
                background-size: cover;
            }
            .smallImageSection {
                .smallImage1, .smallImage2 {
                    height: 250px;
                    background-size: cover;
                }
            }
        }

        .projectInfoContainer {
            padding: 4rem 0;

            .container {
                display: flex;
                flex-direction: column;
                width: 100%;
                gap: 0;

                .subSectionImage {
                    width: 100%;
                    display: flex;
                    justify-content: flex-end;

                    .subSectionImg {
                        width: 90%;
                        max-height: 400px;
                    }
                }

                .sectionInfo {
                    width: 95%;
                    margin-top: -60px;

                    padding: 2.5rem;
                    box-sizing: border-box;

                    .subTitle {
                        font-size: 2rem;
                    }
                    .subSectionText {
                        font-size: 1rem;
                    }
                }
            }

            &.reversed {
                .container {
                    margin: 0;

                    .subSectionImage {
                        justify-content: flex-start;
                    }
                }
            }
        }
    }
</style>

<style lang="scss">
.lightbox-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.25);
    backdrop-filter: blur(8px);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999999;
    cursor: zoom-out;
}

.close-button{
    position: absolute;
    top: 2rem;
    left: 2rem;
    width: 2rem;
    height: 2rem;
    // background-color: red;
}

.lightbox-content {
    max-width: 75vw;
    max-height: 75vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

.lightbox-img {
    height: 90vh;
    object-fit: contain;
    border-radius: 4px;
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
}

/* Lightbox Animation */
.lightbox-enter-active,
.lightbox-leave-active {
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);

    .lightbox-img {
        transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    }
}

.lightbox-enter-from,
.lightbox-leave-to {
    opacity: 0;

    .lightbox-img {
        transform: scale(0.85);
    }
}

@media (max-width: 900px) {
    .lightbox-img {
        width: 90vw;
        height: auto;
    }
}
</style>