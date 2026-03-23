
let hover = false;
let hoveredElement;

let projectElements = document.getElementsByClassName("projectWrapper")

let mobile = false
let pass = false

if (navigator.userAgent.match(/Android/i)
         || navigator.userAgent.match(/webOS/i)
         || navigator.userAgent.match(/iPhone/i)
         || navigator.userAgent.match(/iPad/i)
         || navigator.userAgent.match(/iPod/i)
         || navigator.userAgent.match(/BlackBerry/i)
         || navigator.userAgent.match(/Windows Phone/i)) {
            mobile = true ;
         } 

function backButtonEvent(e) {
    e.preventdefault()
    alert('tja')
    window.location.replace('index.html');
}

function expandpreview(element, pass)
{
    if(mobile == false || pass == true){
        let active = false
        // for (let i = 0; i < projectElements.length; i++) {
        //     if(projectElements[i].hasAttribute('projectActive')){
        //         active = true
        //     }
        // }

        let project =  element.closest('.projectWrapper');
        
        if (active == false){  
            console.log('open') 
            // console.log(element)
            // element.removeAttribute("id", "notActive");
            element.setAttribute("id", "projectActive");
            image = element.querySelectorAll(".projectImage"); 
            image[0].setAttribute("id", "projectImageActive");

            panel = element.querySelectorAll(".projectPanel"); 
            panel[0].setAttribute("id", "activePanel");

            for (let i = 0; i < projectElements.length; i++) {
                if(projectElements[i] != element){
                    projectElements[i].setAttribute("id", "notActive");
                }
                }
        }

    }
}

function closepreview(element, pass)
{
    console.log('close')
    if(mobile == false || pass == true){
        
        image = element.querySelectorAll(".projectImage"); 
        image[0].removeAttribute("id", "projectImageActive");

        panel = element.querySelectorAll(".projectPanel"); 
        panel[0].removeAttribute("id", "activePanel");
        element.removeAttribute("id", "projectActive");

        for (let i = 0; i < projectElements.length; i++) {
            if(projectElements[i] != element){
                projectElements[i].removeAttribute("id", "notActive");
            }
            }
    }
}

function OpenCloseMobilePreview(element){
   console.log('arrow')
   console.log('t')
    event.stopPropagation()
    // for (let i = 0; i < projectElements.length; i++) {
    //     if(element.classList.contains('active')){
    //         closepreview(projectElements[i], true) 
            
    //     }
    // }

    let allArrows = document.getElementsByClassName("arrow")
    for (let i = 0; i < allArrows.length; i++) {
        if(allArrows[i].classList.contains('active') && allArrows[i] != element){
            let project =  allArrows[i].closest('.projectWrapper');
            allArrows[i].classList.remove('active')
            closepreview(project, true) 
            
        }
    }
    element.classList.toggle('active')
    let project =  element.closest('.projectWrapper');
    if(element.classList.contains('active')){
        expandpreview(project, true)
    }else{
        closepreview(project, true) 
    }
}

function scrollto(num){
    if (num == 0){
        el =  document.getElementsByClassName('projects')
        el[0].scrollIntoView();
    } else if (num == 1){
        el =  document.getElementsByClassName('about')
        el[0].scrollIntoView();
    }else{
        el =  document.getElementsByClassName('footer')
        el[0].scrollIntoView();
    }
}

const observer = new IntersectionObserver(entries => {
    
    // Loop over the entries
    entries.forEach(entry => {
      // If the element is visible
      if (entry.isIntersecting) {
        // Add the animation class
        entry.target.classList.add('animate');
      }else{
        entry.target.classList.remove('animate');
      }
    }),{
        threshold: 0.8
    }
});

const observer_OneWay = new IntersectionObserver(entries => {
    // Loop over the entries
    entries.forEach(entry => {
      // If the element is visible
      if (entry.isIntersecting) {
        // Add the animation class
        entry.target.classList.add('animate');
      }
    }),{
        threshold: 0.8
    }
});


  
// const ani_elements = document.querySelectorAll('.subSectionImage')

// for (let i = 0; i< ani_elements.length; i++){
//     const el = ani_elements[i]

//     observer.observe(el)

// }

document.querySelectorAll('.subSectionImage').forEach(div => {
    observer.observe(div);
});

document.querySelectorAll('.bigImage').forEach(div => {
    observer_OneWay.observe(div);
});

document.querySelectorAll('.smallImage1').forEach(div => {
    observer_OneWay.observe(div);
});

document.querySelectorAll('.smallImage2').forEach(div => {
    observer_OneWay.observe(div);
});

document.querySelectorAll('.sectionInfo').forEach(div => {
    observer.observe(div);
});

document.querySelectorAll('.projectWrapper').forEach(div => {
    observer_OneWay.observe(div);
});

document.querySelectorAll('.about').forEach(div => {
    observer_OneWay.observe(div);
});


// observer.observe(projectElements);

function openboodunnit(){
    console.log('tja')
    window.location.href = 'work/Boodunnit.html';
}

function openbgbiased(){
    console.log('tja')
    window.location.href = 'work/Begrijpendbias.html';
}

function opengrad(){
    window.location.href = 'work/gamification.html';
}

function openmccrush(){
    console.log('tja')
    window.location.href = 'work/Burgercrush.html';
}

function openboxgame(){
    console.log('tja')
    window.location.href = 'work/InABox.html';
    
}

function openvrgame(){
    console.log('tja')
    window.location.href = 'work/vrgame.html';
}

function openrecommender(){
    console.log('tja')
    window.location.href = 'work/Recommender.html';
}


// $(document).mouseover(function(e){
//     console.log(e.target); // i just retrieved the id for a demo
//   });


function loadText(language, pageName){
    console.log(language)
    fetch('../lang/' + language + '.json')
    .then((response) => response.json())
    .then((json) => {console.log(json)
        console.log(pageName)
            if(pageName != 'homePage'){
            document.querySelector('#projectDescriptionPage').innerHTML =  json[pageName].introText

            console.log(json[pageName].content[0].text)

            document.querySelectorAll('.projectInfoSection').forEach((element, index)=>{
                    element.querySelector('.subSectionText').innerHTML = json[pageName].content[index].text ;
                    element.querySelector('.subTitle').innerHTML = json[pageName].content[index].title;
            })
        }else{
            console.log(json[pageName])
            document.querySelector('.homeText').innerHTML = json[pageName].subText

            document.querySelectorAll('.project').forEach((element, index)=>{
                element.querySelector('#projectTitle').innerHTML = json[pageName].projects[index].projectTitle ;
                element.querySelector('#projectType').innerHTML = json[pageName].projects[index].projectType;
                element.querySelector('#projectDescription').innerHTML = json[pageName].projects[index].projectText;
        })
            document.querySelector('.meText').innerHTML = json[pageName].aboutmeText
        }}
        )
        
};

function langSelection(){
    lang = document.querySelector('.langSel').value
    localStorage.setItem("language", lang);
    loadText(lang, currentPage)
};
   


