<script setup>
import { ref, computed, inject, onMounted, onUnmounted } from 'vue'
import Canvas from '../components/canvas.vue'
import { useLang } from '../composables/useLang'
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from 'gsap/SplitText';

const { t } = useLang()

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

const activeProject = ref(null)
const isMobile = ref(typeof navigator !== 'undefined' && /Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone/i.test(navigator.userAgent))

const toggleMobile = (index) => {
  store.projectActive = store.projectActive === index ? null : index
}

const localContentRef = ref(null)
const trackRef = ref(null)
let mm;

onMounted(() => {
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
    isDesktop: "(min-width: 766px)",
    isMobile: "(max-width: 765px)"
  }, (context) => {

    let { isDesktop, isMobile } = context.conditions;

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
        duration: 1
      }).to({}, { duration: 0.5 });
    }

    if (isMobile) {
      const wrappers = gsap.utils.toArray(".projectWrapper");
      wrappers.forEach((wrapper) => {
        gsap.from(wrapper, {
          scrollTrigger: {
            trigger: wrapper,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
          y: 50,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out"
        });
      });
    }

    const aboutContent = document.querySelector('.aboutMeContent');
    const profilePic = document.querySelector('.profilePicture');

    const getCenterOffset = () => {
        if (!aboutContent || !profilePic) return 0;
        const screenMid = window.innerWidth / 2;
        const picRect = profilePic.getBoundingClientRect();
        const picMid = picRect.left + (picRect.width / 2);
        // Returns pixels needed to move pic center to screen center
        return screenMid - picMid;
    };

    const tlAbout = gsap.timeline({
      scrollTrigger: {
        trigger: ".about",
        start: "top 10%",
        end: "+=200%", // Length of the pin
        scrub: 1,
        pin: isDesktop ? ".aboutMeContent" : false,
        pinSpacing: true,
      }
    });

    if (isDesktop) {
      tlAbout
        .fromTo(".profilePicture",
          { x: getCenterOffset(), scale: 1.2 }, // ✅ start here
          { x: getCenterOffset() / 2, rotateY: '30deg',  skewX: '-25deg', scale: 1.0, duration: 0.5 }
        )
        .to(".profilePicture", {
          x: getCenterOffset() / 4, rotateY: '60deg', skewX: '-50deg', scale: 0.9, duration: 0.5
        })
        .to(".profilePicture", {
            x: 0, skewX: '0deg', rotateY: '0deg', scale: 0.8, duration: 0.5
        });

      // Step 2: Fade in text paragraphs one by one
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
    } else {
      tlAbout.from(".profilePicture", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out"
      });

      gsap.from(".meText", {
          scrollTrigger: {
              trigger: ".text-side",
              start: "top 80%",
          },
          opacity: 0,
          y: 20,
          stagger: 0.3,
          duration: 1
      });
    }

  });
});

onUnmounted(() => {
  if (mm) {
    mm.revert();
  }
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
                    { active: store.projectActive === index || activeProject === index }
                  ]"

                  @mouseenter="()=>{store.projectActive = index}"
                  @mouseleave="()=>{store.projectActive = null}"
                >
                    <div class="project" :class="{'reversed': index > 2}">
                        <div class="projectImage" :class="'p' + (index + 1)"  @click="$router.push('/work/' + project.id)">
                          <img v-if="project.projectImage" :src="project.projectImage">
                          <div class="arrow" :class="{ active: activeProject === index }" @click.stop="toggleMobile(index)"></div>
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
                <img class="profilePicture" src="/images/Jorrik.jpg">
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

  .section {
    min-height: 100vh;
    padding: 100px 2rem;
    background: white;
    color: #333;
    border-bottom: 1px solid #eee;
  }
}

.projects{
  padding-top: 25px;
  padding-bottom: 25px;
  max-width: 100rem;
  width: 100%;
  overflow: hidden;
  margin: 0 auto;

  .sectionTitle{
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
    filter: drop-shadow(10px 10px 4px rgba(0,0,0,0.08));

    

    .projectWrapper {
      display: flex;
      flex-shrink: 0;
      height: fit-content;
      margin-left: -5rem;
      pointer-events: all;
      transition: width 0.75s;
      opacity: 1;

      cursor: pointer;

       &:first-child {
        margin-left: 0;
      }

       &.active{
          margin-left: 0;
          // z-index: 10;
          flex-grow: 0;
          .project{
            .projectImage {
              min-width: 18rem;
              // transition: all 1s;
              z-index: 50;
            }

            .projectPanel{
              padding-top: 25px;
              padding-left: 5px;
              margin-left: -4rem;
              width: 20rem;
              display: block;
              transition: 1s;
              left: 0;
              opacity: 1;

              .panelTextDiv {
                opacity: 1;
              }
            }

            &.reversed{
              .projectImage{
                clip-path: polygon(15% 0%, 100% 0%, 100% 100%, 0% 100%);
              }

              .projectPanel{
                margin-right: -4rem;
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
          -webkit-transition: all 1s;
          transition: all 1s;
          pointer-events: auto;
          background-size: cover;
          background-position: center;

          img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }

        .projectPanel {
            width: 0;
            opacity: 0;
            overflow: hidden;
            transition: all 0.6s ease-in-out;
        }

        .panelTextDiv {
            width: 20rem;
            position: relative;
            min-height: 200px;
            height: 100%;
            opacity: 0;
            transition: opacity 0.5s;
            transition-delay: 0.5s;

            .left-guard {
              width: 5rem;
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
      display: flex;
      flex-direction: row;
      max-width: 100rem;
      width: 100%;
      height: 90vh;
     
      margin: 0 auto;
      position: relative;
      align-items: center;

      .sectionTitle.abs {
          position: absolute;
          top: 5vh;
          left: 0;
      }

      .pic-side {
        width: 50%;
        display: flex;
        justify-content: center;
        align-items: center;

        .pic-wrapper {
          width: 100%;
          display: flex;
          justify-content: center;

          .profilePicture {
            max-width: 25rem;
            width: 80%;
            height: auto;
            border-radius: 4px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
          }
        }
      }

      .text-side {
        width: 50%;
        display: flex;
        align-items: center;
        padding-right: 5%;

        .meTextwrapper {
          display: flex;
          flex-direction: column;
          gap: 3rem;

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

@media (max-width: 765px) {
  .projects{
    .projectlist {
      flex-direction: column;
      .projectWrapper {
        width: 100vw;
        height: 300px;
        margin-left: 0;
        &.active{
          .project{
            .projectImage {
              clip-path: polygon(15% 0%, 100% 0%, 85% 100%, 0% 100%);
              min-width: unset;
              width: 20vw;
            }
            .projectPanel{
              padding: 0 1rem;
              width: 80vw;
              height: 300px;
              margin-left: 0;
              margin-top: 2rem;

              .panelTextDiv{
              
                width: 80%;
                .left-guard, .right-guard{
                  display: none;
                }
              }
            }
          }
        }
      .project {
        justify-content: space-between;

        &.reversed{
          flex-direction: row;
        }

        .projectImage {
            
            width: 100vw;
            height: 300px;
            clip-path: none !important;
          }

          .projectPanel{
            // width: 80vw;
            .panelTextDiv{
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
      flex-direction: column;
      height: auto;
      padding: 50px 20px;

      .sectionTitle.abs {
          position: relative;
          top: 0;
          margin-bottom: 2rem;
      }

      .pic-side {
        width: 100%;
        margin-bottom: 3rem;
        .profilePicture {
          max-width: 300px;
          transform: none !important;
          opacity: 1 !important;
        }
      }
      .text-side {
        width: 100%;
        padding-right: 0;
        .meTextwrapper {
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