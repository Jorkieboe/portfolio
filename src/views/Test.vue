<script setup>
import { ref, computed, inject, onMounted } from 'vue'
import Canvas from '../components/canvas.vue'
import { useLang } from '../composables/useLang'
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";



const { t } = useLang()

// The IDs corresponding to the translations JSON objects
const projectIds =[
  'begrijpendBiased',
  'gamification',
  'festivalRecommender',
  'burgerCrush',
  'vrGame',
  'inABox'
]

const store = inject('store')

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

const localContentRef = ref(null)
let ctx;

onMounted(() => {
  store.setContentRef(localContentRef)
  gsap.registerPlugin(ScrollTrigger);
  
  ctx = gsap.context(() => {
    
    // 1. YOUR EXISTING PROJECTS TIMELINE
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#projects",
        start: "top 15%",  
        end: "+=1550vh",   
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
    });

    tl.to({}, { duration: 0.5 });

    const disp = document.querySelector("feDisplacementMap");
  const offset = document.querySelector("feOffset");

    const tlAbout = gsap.timeline({
      scrollTrigger: {
        trigger: "#about",
        start: "top top",
        end: "+=2000", 
        scrub: 1,  
        pin: true, 
        pinSpacing: true,      
      }
    });



  }, localContentRef.value);
});

</script>

<template>
 <div class="test-page-wrapper">

   <div class="zoom-scroll-track" :style="{ height: ('100%' * store.headerSize) + 'px' }"></div>
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
            
                  @mouseenter="()=>{store.projectActive = index}"
                  @mouseleave="()=>{store.projectActive = null}"
                >
                    <div class="project" :class="{'reversed': index > 2}">
                        <div class="projectImage" :class="'p' + (index + 1)" @click="$router.push('/work/' + project.id)">
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
          <svg width="0" height="0">
            <filter id="distort">
              
              <feTurbulence 
                type="turbulence"
                baseFrequency="0.01 0.25"
                numOctaves="2"
                result="noise"
              />

              <feOffset in="noise" dy="0" result="move" />

              <feDisplacementMap
                in="SourceGraphic"
                in2="move"
                scale="0"
                xChannelSelector="R"
                yChannelSelector="G"
              />

            </filter>
          </svg>
          <img class="profilePicture" src="/images/Jorrik.jpg">
            <!-- <h3 class="sectionTitle">About me</h3>
            <div class="aboutMeContent">
                
                <p class="meText" v-html="t.homePage.aboutmeText"></p>
            </div> -->
        </div>
    </div>
</div>
</template>

<style scoped lang="scss">


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

.zone {
  width: 100%;
  background-color: transparent;
  pointer-events: none;
}

.pin-scacer{
  pointer-events: none;
  
}

.projects{
  padding-top: 25px;
  padding-bottom: 25px;
  max-width: 100rem;
  width: 100%;
  overflow: hidden;
  margin: 0 auto;

  // height: 125vh;
  

  .projectlist {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    flex-wrap: nowrap;
    word-wrap: max-content;
    
    pointer-events: none;
    overflow: hidden;

    .projectWrapper {
      display: flex;
      flex-shrink: 0;
      // width: 25rem;
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
          // width: 45rem;
          margin-left: 0;
          z-index: 10;
          flex-grow: 0;
          .project{
            .projectImage {
              clip-path: polygon(0% 0%, 100% 0%, 85% 100%, 0% 100%);
              min-width: 18rem; 
              transition: all 1s;
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
            
            }

            &.reversed{
              .projectImage{
                clip-path: polygon(15% 0%, 100% 0%, 100% 100%, 0% 100%);
              }

              .projectPanel{
                // margin-left: 0;
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
        // flex-grow: 1;
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
        }

        #notActive {
            pointer-events: none;
        }

        .projectPanel {
            width: 0;
            opacity: 0;
            overflow: hidden;
            transition: all 0.6s ease-in-out;
            // transform: translateX(-3rem);
        }

        .panelTextDiv {
            width: 20rem; 
            position: relative;
            // overflow: hidden;
            // clip-path: polygon(15% 0%, 100% 0%, 85% 100%, 0% 100%);
            min-height: 200px; 
            height: 100%;

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
              /* We define the shape of the 'empty space' on the right */
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
    display: flex;
    justify-content: center;
    align-items: center;
    margin: auto;
    margin-top: 50px;
    margin-bottom: 50px;
    max-width: 100rem;
    width: 100%;
    height: 100vh;
    margin: 0 auto;

    .profilePicture {
      max-width: 30rem;
      width: 90%;
      object-fit: contain;
      height: fit-content;
      margin: 0 auto;
      filter: url(#distort);
    }

    .aboutMeContent {
    display: flex;
    align-items: center;
    justify-content: space-around;
 
    width: 100%;

    .meText {
        width: 100%;
        font-size: 1rem;
      }
    }
}







.p1 {
    background-image: url("/images/begrijpendbiased.jpg");
    background-position: center;
    background-size: auto 30vw;
    z-index: 1;
}

.p2 {
    background-image: url("/images/gamification/challenge screen.jpg");
    background-position: center;
    background-size: auto 30vw;
    z-index: 2;
}

.p3 {
    background-image: url("/images/recommender/FR_mock_recommendation.jpg");
    background-position: center;
    background-size: auto 30vw;
    z-index: 3;
}

.p4 {
    background-image: url("/images/BurgerCrush/crushBanner.jpg");
    background-position: center;
    background-size: auto 30vw;
    z-index: 4;
}

.p5 {
    background-image: url("/images/SOTA/npcs.jpg");
    background-position: center;
    background-size: auto 30vw;
    z-index: 5;
}

.p6 {
    background-image: url("/images/Inabox/playercharacter.jpg");
    background-position: center;
    background-size: auto 30vw;
    z-index: 6;
}



.project:hover .panelText {
    display: block;
}

@media (max-width: 765px) {

  .projects{
    .projectlist {
        flex-direction: column;
        flex-wrap: wrap;
        cursor: pointer;

      .projectWrapper {
        max-width: 100vw;
        height: 300px;
        width: 100vw;
        margin-left: 0px;
        cursor: pointer;
        
    

        .project {

          &.active{
            .projectImage {
              width: 20vw;
            }

            .projectPanel{
              padding: 0;
              padding-left: 15px;
              width: 70vw;
              height: 300px;

              .panelTextDiv {
                  width: 75vw;
              }
          }
          }

          .projectImage {
              height: 300px;
              width: 100vw;
              max-width: 100vw;
              clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
              position: relative;
              cursor: pointer;

              &.p1 {
                background-size: auto 80vw;
              }

              &.p2 {
                background-size: auto 80vw;
              }

              &.p3 {
                background-size: auto 80vw;
              }

              &.p4 {
                  background-size: auto 80vw;
              }

              &.p5 {
                background-size: auto 80vw;
              }

              &.p6 {
                background-size: auto 80vw;
              }
          }

        

        
        }
      }
    }
    
  }
  

    
}
</style>