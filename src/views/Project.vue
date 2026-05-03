<script setup>
import { computed, onMounted, onUnmounted, inject, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useLang } from '../composables/useLang'
import { useHead } from '@unhead/vue'
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from 'gsap/SplitText';
import {colors} from '../utils/colors'

const route = useRoute()
const { t } = useLang()

const store = inject('store')

const localContentRef = ref()
const selectedMedia = ref(null)

let mm;

const projectId = computed(() => route.params.id)
const projectData = computed(() => t.value[projectId.value])

useHead({
  title: () => projectData.value ? `${projectData.value.projectTitle} - Jorrik Dillisse` : 'Project - Jorrik Dillisse',
  meta: [
    {
      name: 'description',
      content: () => projectData.value ? projectData.value.introText : 'Project details'
    }
  ]
})

const openMedia = (contentItem) => {
    console.log(contentItem)
    selectedMedia.value = contentItem.media
}

const closeMedia = () => {
    selectedMedia.value = null
}

watch(selectedMedia, (newVal) => {
    if (newVal) {
        document.body.style.overflow = 'hidden'
    } else {
        document.body.style.overflow = ''
    }
})

onMounted(() => {
    store.setContentRef(localContentRef.value)
    gsap.registerPlugin(ScrollTrigger, SplitText);
    mm = gsap.matchMedia(localContentRef.value);

    mm.add({
        isDesktop: "(min-width: 768px)",
        isMobile: "(max-width: 767px)"
    }, (context) => {
        let { isDesktop, isMobile } = context.conditions;

        if(isDesktop){
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: ".projectOverview",
                    start: "center 60%",
                    end: isDesktop ? "+=800" : 'bottom bottom',
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
        }

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

onUnmounted(() => {
    store.setContentRef(null);
})

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

      <div class="projectOverview">
        <template v-if="projectData.splashImages?.[0]">
          <video v-if="projectData.splashImages[0].type === 'video'"
                 class="bigImage"
                 autoplay muted playsinline
                 :src="projectData.splashImages[0].src"></video>
          <img v-else
               class="bigImage"
               :src="projectData.splashImages[0].src">
        </template>
      </div>

        <div class="small-image-container">
            <template v-for="(media, index) in projectData.splashImages?.slice(1)" :key="index">
                <video v-if="media.type === 'video'"
                       class="small-image"
                       autoplay muted loop playsinline
                       :src="media.src"></video>
                <img v-else
                     class="small-image"
                     :src="media.src">
            </template>
        </div>

      <div v-for="(content, index) in projectData.content" :key="index" class="projectInfoContainer" :class="{ 'reversed': index % 2 !== 0 }">
        <div class="container">
          <div class="subSectionImage" @click="openMedia(content)">
              <video v-if="content.media.type === 'video'" :src="content.media.src" class="subSectionImg" muted playsinline></video>
              <img v-else :src="content.media.src" :alt="content.title" class="subSectionImg">
              <div v-if="content.media.type === 'video'" class="play-button"><img src="/images/svg/play-icon.svg"></div>
          </div>
          <div class="sectionInfo">
              <h2 class="subTitle">{{ content.title }}</h2>
              <p class="text subSectionText" v-html="content.text"></p>
          </div>
        </div>
      </div>

      <Teleport to="body">
        <Transition name="lightbox">
            <div v-if="selectedMedia" class="lightbox-overlay" @click="closeMedia">
                <img class="close-button" src="/images/Icons/close-icon.svg">
                <div class="lightbox-content">
                    <video v-if="selectedMedia.type === 'video'" :src="selectedMedia.src" class="lightbox-vid" controls autoplay></video>
                    <img v-else :src="selectedMedia.src" class="lightbox-img" />
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
        padding-top: 9.5rem;

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
        justify-content: center;
        align-items: center;
        margin: 0 auto;

        .bigImage {
            max-width: 80rem;
            width: 75vw;
            aspect-ratio: 16/9;
            margin: 0 auto 3rem;
            object-fit: cover;
        }

    }

    .small-image{
        max-width: 30rem;
        width: 100%;
        aspect-ratio: 16/9;
        object-fit: cover;
    }

    .small-image-container{
        display: flex;
        height: fit-content;
        gap: 8rem;
        margin-bottom: 3rem;
        margin: 0 auto;
    }

    .projectInfoContainer {
        padding: 5rem 0;
        width: 100%;
        position: relative;
        // [MODIFIED] Performance boost for scrolled containers
        will-change: transform;
        backface-visibility: hidden;

        .container {
            display: grid;
            grid-template-columns: repeat(12, 1fr);
            gap: 20px;
            max-width: 1200px;
            width: 90%;
            margin: 0 auto;
            align-items: center;

            .subSectionImage {
                position: relative;
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
                    border-radius: 0.1rem;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.08);
                    transition: transform 0.3s ease;

                    &:hover {
                        transform: scale(1.02);
                    }
                }

                .play-button{
                    position: absolute;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 50px;
                    height: 50px;
                    background-color: white;
                    border-radius: 50%;
                    left: 50%;
                    transform: translateX(-50%);

                    img{
                        width: 80%;
                        height: 80%;
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

    @media (max-width: 1024px) {
        .small-image-container{
            // flex-direction: column;
            gap: 0.1rem;

            .small-image{
                width: 50%;
            }
        }

       .projectOverview .bigImage{
        max-width: 80rem;
        width: 90vw;
        margin: 0 auto 0.1rem
       }
    }

    @media (max-width: 768px) {
        .projectIntro {
            flex-direction: column;
            margin-top: 8.3rem;
            margin-bottom: 2rem;

            .projectName {
                font-size: 3rem;
                margin-bottom: 2rem;
            }
        }

        .projectOverview {
            flex-direction: column;
            height: auto;

            .bigImage {
                width: 100%;
                height: auto;
                background-size: cover;
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
}

.lightbox-content {
    display: flex;
    justify-content: center;
    align-items: center;
}

.lightbox-img, .lightbox-vid {
    max-width: 80vw;
    max-height: 90vh;
    object-fit: contain;
    border-radius: 4px;
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
}

.lightbox-enter-active,
.lightbox-leave-active {
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);

    .lightbox-img, .lightbox-vid {
        transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    }
}

.lightbox-enter-from,
.lightbox-leave-to {
    opacity: 0;

    .lightbox-img, .lightbox-vid {
        transform: scale(0.85);
    }
}

@media (max-width: 900px) {
    .lightbox-img, .lightbox-vid {
        width: 90vw;
        height: auto;
    }
}
</style>