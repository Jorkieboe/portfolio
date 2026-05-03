<script setup>
import { ref, computed, inject, onMounted, onUnmounted, watch } from 'vue'
import Canvas from '../components/canvas.vue'
import { useLang } from '../composables/useLang'
import { useHead } from '@unhead/vue'
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from 'gsap/SplitText';
import { useRoute } from 'vue-router';

import ProfilePic from '../components/ProfilePic.vue';

const { t } = useLang()
const route = useRoute()

useHead({
  title: 'Portfolio - Jorrik Dillisse',
  meta: [
    {
      name: 'description',
      content: 'Creative Developer and Technologist specializing in interactive installations, games, and AI.'
    }
  ]
})

const projectIds =[
  'verhalenvangers',
  'parleyStudio',
  'futurenow',
  'festivalRecommender',
  'lisboastories',
  'vrGame',
]

const store = inject('store')

const projects = computed(() => {
  return projectIds.map((id, index) => {
    const projectDetails = t.value[id]
    const homeInfo = t.value.homePage.projects[index]

    return {
      id,
      content: homeInfo,
      projectImage: homeInfo.projectImage
    }
  })
})

const isMobile = ref(false)

const updateIsMobile = () => {
    const wasMobile = isMobile.value
    isMobile.value = window.innerWidth <= 1024

    if (wasMobile !== isMobile.value) {
      // Crossing breakpoint: Reset state and clear inline styles
      store.projectActive = null
      isAnimating.value = false

      // Stop any running animations
      gsap.killTweensOf(".projectWrapper, .projectImage, .projectPanel, .panelTextDiv");

      // Strip GSAP inline styles so CSS Media Queries can take over
      gsap.set(".projectWrapper, .projectImage, .projectPanel, .panelTextDiv", { clearProps: "all" });
    }
}

const toggleMobile = (index) => {
  if (isAnimating.value) return;
  store.projectActive = store.projectActive === index ? null : index
}

const aboutScrollProgress = ref(0)
const localContentRef = ref(null)
const trackRef = ref(null)
const isAnimating = ref(false)
let mm;
let hoverDelayedCall = null;
let pendingIndex = null;

// const skewedPath = "polygon(15% 0%, 100% 0%, 85% 100%, 0% 100%)";
// const rectPath = "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)";

const animateProject = (index, isOpen) => {
  const wrapper = document.querySelector(`.pj${index + 1}`);
  if (!wrapper) return;
  const panel = wrapper.querySelector('.projectPanel');
  const textDiv = wrapper.querySelector('.panelTextDiv');
  const image = wrapper.querySelector('.projectImage');
  isAnimating.value = true;
  const tl = gsap.timeline({
    defaults: { ease: "power3.inOut", duration: 0.6, overwrite: "auto", force3D: true },
    onComplete: () => {
        isAnimating.value = false;
        if (!isOpen) {
            gsap.set(panel, { display: "none" });
        }
    }
  });
  if (isOpen) {
    gsap.set(panel, { display: "block" });
    // [MODIFIED] Using x instead of marginLeft for compositor-only animation
    tl.to(wrapper, { x: 0 }, 0);
    if(isMobile.value){
      tl.fromTo(image, {
        width: "100vw",
        minWidth: "100vw",
      }, {
        minWidth: 'unset',
        width: "25vw",
      }, 0);
      tl.fromTo(panel, {
        width: 0,
        opacity: 0
      }, {
        width: "75vw",
        opacity: 1
      }, 0);
    }else{
      tl.to(image, {
        width: "20rem",
        minWidth: "20rem",
      }, 0);
      tl.to(panel, { width: "20rem", opacity: 1 }, 0);
    }
    tl.to(textDiv, { opacity: 1, duration: 0.4 }, 0.3);
  } else {
    const isFirst = index === 0;
    // [MODIFIED] Calculate negative shift in rem based on the overlap (5rem)
    const shift = (isFirst || isMobile.value) ? 0 : -80; // -5rem is roughly -80px at 16px base
    tl.to(wrapper, { x: shift }, 0);
    tl.to(image, {
        minWidth: isMobile.value ? "100vw" : "20rem",
        width: isMobile.value ? "100vw" : "20rem",
    }, 0);
    tl.to(panel, { width: 0, opacity: 0 }, 0);
    tl.to(textDiv, { opacity: 0, duration: 0.2 }, 0);
  }
}

const handleHover = (index) => {
  if (isMobile.value || isAnimating.value || store.projectActive === index || pendingIndex === index) return;

  if (hoverDelayedCall) hoverDelayedCall.kill();

  // [MODIFIED] Use pendingIndex to prevent re-triggering logic while mouse moves within the same item
  pendingIndex = index;

  hoverDelayedCall = gsap.delayedCall(0.1, () => {
    if (store.projectActive !== index && !isAnimating.value) {
      store.projectActive = index;
    }
    pendingIndex = null;
  });
}

const handleMouseLeave = () => {
  if (isMobile.value) return;
  if (hoverDelayedCall) hoverDelayedCall.kill();
  pendingIndex = null;

  hoverDelayedCall = gsap.delayedCall(0.1, () => {
    if (route.path === '/' && !isAnimating.value) {
      store.projectActive = null;
    }
  });
}

watch(() => store.projectActive, (newVal, oldVal) => {
  if (oldVal !== null) animateProject(oldVal, false);
  if (newVal !== null) animateProject(newVal, true);
});

onMounted(() => {
  updateIsMobile();
  window.addEventListener('resize', updateIsMobile);

  store.setContentRef(localContentRef.value)
  store.setTrackRef(trackRef.value)
  gsap.registerPlugin(ScrollTrigger, SplitText);
  mm = gsap.matchMedia(localContentRef.value);

   gsap.to(".scroll-cta img", {
    y: 20,
    repeat: -1,
    yoyo: true,
    duration: 1.5,
    ease: "power1.inOut"
  });

  gsap.to(".scroll-cta", {
    scrollTrigger: {
      trigger: ".test-page-wrapper",
      start: "top top",
      end: "200px top",
      scrub: true,
    },
    opacity: 0,
    scale: 0.8,
    pointerEvents: "none"
  });

  mm.add({
    isDesktop: "(min-width: 1025px)",
    isMobile: "(max-width: 1024px)"
  }, (context) => {

    let { isDesktop, isMobile: mobileEnv } = context.conditions;

    if (isDesktop) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: "#projects",
          start: "top 15%",
          end: "+=1000vh",
          pin: true,
          pinSpacing: true,
          scrub: 1,
        }
      });

      tl.from(".projectWrapper", {
        y: 50,
        opacity: 0,
        stagger: 0.2,
        ease: "power2.out",
        duration: 1,
        clearProps: "transform,opacity"
      }).to({}, { duration: 0.5 });
    }

    if (mobileEnv) {
      const wrappers = gsap.utils.toArray(".projectWrapper");
      wrappers.forEach((wrapper) => {
        gsap.from(wrapper, {
          scrollTrigger: {
            trigger: wrapper,
            start: "top 85%",
            toggleActions: "play none none none",
          },
          y: 50,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
          clearProps: "all"
        });
      });
    }

    const tlAbout = gsap.timeline({
      scrollTrigger: {
        trigger: ".about",
        start: isDesktop ? "top 10%" : "0% 60%",
        end: isDesktop ? "bottom bottom" : "20% 50%",
        scrub: 1,
        pin: isDesktop ? ".aboutMeContent" : false,
        pinSpacing: true,
        markers: true
      }
    });

    // [MODIFIED] Using a longer duration proxy so text has room to breathe during the scrub
    const scrollProxy = { val: 0 };
    tlAbout.to(scrollProxy, {
        val: 1,
        duration: 3,
        ease: "none",
        onUpdate: () => {
            aboutScrollProgress.value = scrollProxy.val;
        }
    }, 0);

    if (isDesktop) {

      const paragraphs = gsap.utils.toArray(".meText");
      paragraphs.forEach((p, i) => {
          const split = new SplitText(p, { type: "lines" });

          tlAbout.from(split.lines, {
            autoAlpha: 0,
            y: 30,
            duration: 0.5,
            stagger: 0.1
          }, ">-0.5");
      });

      tlAbout.to({}, { duration: 1 });
    }

  });
});

onUnmounted(() => {
  window.removeEventListener('resize', updateIsMobile);
  if (mm) {
    mm.revert();
  }
  if (hoverDelayedCall) hoverDelayedCall.kill();
  store.setContentRef(null);
  store.setTrackRef(null);
});

</script>

<template>
 <div class="test-page-wrapper">

   <div class="zoom-scroll-track" ref="trackRef"></div>
    <div class="content" ref="localContentRef">
        <div class="projects" id="projects">
            <h3 class="sectionTitle">Work</h3>
            <div class="projectlist">
                <div
                  v-for="(project, index) in projects"
                  :key="project.id"
                  class="projectWrapper"
                  :class="[
                    'pj' + (index + 1),
                    { active: store.projectActive === index }
                  ]"
                  @mousemove="handleHover(index)"
                  @mouseleave="handleMouseLeave"
                >
                    <div class="project" :class="{'reversed': !isMobile && index > 2}">
                        <div class="projectImage" :class="'p' + (index + 1)"  @click="$router.push('/work/' + project.id)">
                          <img v-if="project.projectImage" :src="project.projectImage">
                          <div class="arrow" :class="{ active: store.projectActive === index }" @click.stop="toggleMobile(index)"></div>
                        </div>
                        <div class="projectPanel">
                            <div class="panelTextDiv">
                              <div class="left-guard"></div>
                              <div class="right-guard"></div>

                              <h3 class="panelText title" >{{ project.content.projectTitle }}</h3>
                              <h4 class="panelText type">{{ project.content.projectType }}</h4>
                              <p class="panelText description">{{ project.content.projectText }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="about" id="about">
          <div class="aboutMeContent">
            <h3 class="sectionTitle abs">About me</h3>
            <div class="pic-side">
              <div class="pic-wrapper">
                <ProfilePic :scrollProgress="aboutScrollProgress" />
              </div>
            </div>
            <div class="text-side">
              <div class="meTextwrapper">
                <p class="meText" v-for="text in t.homePage.aboutmeText" v-html="text"></p>
              </div>
            </div>
          </div>
        </div>

      </div>

      <div class="scroll-cta"><img src="/images/Icons/down.svg" ></div>
    </div>
</template>

<style scoped lang="scss">

.scroll-cta{
  position: fixed;
  bottom: 2rem;
  width: 4rem;
  height: 4rem;
  z-index: 999;
  left: 50%;
  transform: translateX(-50%);
}

.zoom-scroll-track {
  height: 250vh;
}

.content {
  position: relative;
  z-index: 1;
  background-color: transparent;

  .section {
    min-height: 100vh;
    padding: 100px 2rem;
    background: white;
    color: #333;
    border-bottom: 1px solid #eee;
  }
}

.projects{
  /* Spacing to clear the fixed navigation. Note: ScrollTrigger adds inline padding here when pinning */
  padding-top: 8vh;
  padding-bottom: 25px;
  max-width: 100rem;
  width: 100%;
  overflow: hidden;
  margin: 0 auto;

  .sectionTitle{
      max-width: 100rem;
      width: 99%;
      top: 5vh;
      left: 5%;
      z-index: 20;
      margin: 0 auto;
      padding-bottom: 2rem;
  }

  .projectlist {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    flex-wrap: nowrap;
    word-wrap: max-content;

    pointer-events: none;
    overflow: hidden;
    // [FIX] Removed expensive global filter drop-shadow to improve hover performance

    .projectWrapper {
      display: flex;
      flex-shrink: 0;
      height: fit-content;
      // [MODIFIED] Replaced static marginLeft with transform for better baseline animation
      // transform: translateX(-5rem);
      margin-left: -5rem;
      pointer-events: all;
      opacity: 1;
      cursor: pointer;
      will-change: transform, opacity, width;
      backface-visibility: hidden;

        // transform: translateX(0);

       &.active{
          flex-grow: 0;
          .project{
            .projectImage {
              // z-index: 50;
            }

            // .projectPanel{
            //   margin-left: -4rem;
            //   left: 0;
            // }

            &.reversed{
              .projectPanel{
                margin-right: -3.5rem;
                // removed padding-left from active to prevent jump
              }
            }
          }
        }

      .project {
        display: flex;
        flex-direction: row;
        justify-content: center;
        width: fit-content;
        padding-left: -10rem;
        pointer-events: none;
        overflow: hidden;

        &.reversed{
          flex-direction: row-reverse;
        }

        .projectImage {
          width: 20rem;
          aspect-ratio: 3/4;
          clip-path: polygon(15% 0%, 100% 0%, 85% 100%, 0% 100%);
          pointer-events: auto;
          background-size: 20rem auto;
          background-position: center;
          position: relative;
          // [MODIFIED] Added box-shadow here instead of global filter
          box-shadow: 10px 10px 30px rgba(0,0,0,0.1);

          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }

        .arrow {
            display: none;
            background-image: url('/images/Icons/ArrowPointer.png');
            background-size: 50px 50px;
            background-repeat: no-repeat;
            width: 50px;
            height: 50px;
            position: absolute;
            z-index: 60;
            right: 10px;
            bottom: 20px;
            pointer-events: auto;
            cursor: pointer;

            &.active {
                transform: scaleX(-1);
            }
        }

        .projectPanel {
            width: 0;
            opacity: 0;
            overflow: hidden;
            // display: none;
            padding-top: 25px;
            padding-left: 5px;
            box-sizing: border-box;
        }

        .panelTextDiv {
            width: 19rem;
            position: relative;
            min-height: 200px;
            height: 100%;
            opacity: 0;

            .left-guard {
              width: 1rem;
              height: 100%;
              float: left;
              shape-outside: polygon(80% 0%, 100% 0%, 40% 100%, 0% 100%);
            }

            .right-guard {
              width: 5rem;
              height: 100%;
              float: right;
              shape-outside: polygon(40% 0%, 100% 0%, 80% 100%, 0% 100%);
            }

            .panelText{
              margin-bottom: .5rem;
              word-wrap: break-word;
              &.title{
                font-size: 1.5rem;
              }
              &.type{
                 font-size: 1.2rem;
              }
              &.description{
                 font-size: 0.8rem;
              }
            }
        }
      }
    }
  }
}

.about {
    width: 100%;
    margin-top: 50px;

    .aboutMeContent {
      position: relative;
      width: 100%;
      height: 100vh;
      margin: 0 auto;
      max-width: 160rem;
      // [MODIFIED] Ensure profile pic and text don't stutter during pinning
      will-change: transform;
      transform: translateZ(0);

      .sectionTitle.abs {
          max-width: 100rem;
          width: 99%;
          top: 5vh;
          left: 5%;
          z-index: 20;
          margin: 0 auto;
      }

      .pic-side {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        .pic-wrapper {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          will-change: transform;
          backface-visibility: hidden;

          .profilePicture {
            max-width: 25rem;
            width: 30vw;
            height: auto;
            border-radius: 4px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
          }
        }
      }

      .text-side {
        position: absolute;
        right: 5%;
        top: 50%;
        transform: translateY(-50%);
        width: 40%;
        z-index: 10;
        display: flex;
        align-items: center;
        pointer-events: none;
        will-change: transform;
        backface-visibility: hidden;

        .meTextwrapper {
          display: flex;
          flex-direction: column;
          gap: 3rem;
          pointer-events: all;

          .meText {
            font-size: 1.3rem;
            line-height: 1.8;
            max-width: 35rem;
            color: #333;
          }
        }
      }
    }
}

@media (max-width: 1024px) {
  .projects{
    .projectlist {
      flex-direction: column;
      .projectWrapper {
        width: 100vw;
        height: 300px;
        margin-left: 0 !important;
        max-width: 100vw;
        overflow: hidden;

        &.active{
          .project{
            width: 100%;
            .projectImage {
              flex-shrink: 0;
            }
            .projectPanel{
              padding: 0 1rem;
              height: 300px;
              margin-left: 0;
              margin-top: 2rem;

              .panelTextDiv{

                .left-guard, .right-guard{
                  display: none;
                }
              }
            }
          }
        }
      .project {
        justify-content: flex-start;
        overflow: visible;
        flex-direction: row;
        width: 100%;
        max-width: 100vw;
        padding-left: 0;

        &.reversed{
          flex-direction: row;
        }

        .projectImage {
            width: 100%;
            height: 300px;
            clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
            flex-shrink: 0;
          }

          .arrow {
              display: block;
              bottom: 125px;
              right: 15px;
          }

          .projectPanel{
            padding: 0 1rem;
            height: 300px;
            margin-left: 0;
            margin-top: 2rem;
            .panelTextDiv{
               width: 60vw;
              .left-guard, .right-guard{
                  display: none;
              }
            }
          }
        }
      }
    }
  }

  .about {
    .aboutMeContent {
      display: flex;
      flex-direction: column;
      height: fit-content;
      padding: 50px 0px;

      .sectionTitle.abs {
          position: relative;
          top: 0;
          left: 0;
          margin-bottom: 2rem;
      }

      .pic-side {
        position: relative;
        width: 100%;
        height: auto;
        margin-bottom: 3rem;

        .pic-wrapper {
            width: 100vw;
            aspect-ratio: 9/10;

            padding-left: 0;
            justify-content: center;
        }

        .profilePicture {
          max-width: 300px;
          transform: none !important;
          opacity: 1 !important;
        }
      }
      .text-side {
        position: relative;
        top: 0;
        right: 0;
        transform: none;
        width: 100%;
        padding-right: 0;

        .meTextwrapper {
          width: 90%;
          margin: 0 auto;
          .meText {
            font-size: 1.2rem;
            max-width: 100%;
          }
        }
      }
    }
  }
}
</style>