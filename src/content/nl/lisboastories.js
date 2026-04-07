export default {
    id: 'lisboaStories',
    projectTitle: "Lisboa stories",
    projectType: "Museum Exhibition",
    introText: "Voor een tentoonstelling in de Lisboa hotels in Macau (China) ontwikkelde ik meerdere interactieve applicaties over de geschiedenis tussen de handel met Macau en de Portugezen. Ik werkte aan diverse applicaties, waaronder webapplicaties, een game en applicatie met computer vision -toepassing. Zie hieronder de verschillende onderdelen",
    splashImages: [
        { type: 'image', src: '/images/lisboa/diary.jpg' },
        { type: 'image', src: '/images/lisboa/trading.jpg' },
        { type: 'image', src: '/images/lisboa/facade.jpg' },
    ],
    content: [
        {
            title: "Harriet Low’s Dairy",
            text: `Een van de interacties was een geprojecteerde video dagboek waar bezoekers doorheen konden bladeren. De interactie bestond uit een fysiek boek met markers in de hoeken, geplaatst onder een camera en projector. Een camera detecteerde met behulp van machine learning welke marker in beeld waren. En projecteerde de bijbehorende video. Tijdens development merkte ik dat het heel erg belangrijk is om een interface niet in python te draaien, dat leverd heel vertraging op in bijvoorbeeld een videoplayer.`,
            media: { type: 'video', src: "/videos/lisboa-diary.mp4" }
        },
        {
            title: "Trading game",
            text: `Trading game is een applicatie ontwikkeld met Vue.js, waarin je een handelsreis maakte in het oude China. Hier in ontwikkelde ik een minigame met Phaser waarbij je veilig naar je bestemming moet varen tussen piraten, rotsen en tyfoons. De grootste uitdaging was de performance. De applicatie draaide op 3 pc’s waar één pc een extra centrale kaart aanstuurde. De framerate van de game bepaalde de snelheid van de boot en dat moest gelijk zijn over alle pcs.`,
            media: { type: 'video', src: "/videos/lisboa-trading.mp4" }
        },
        {
            title: "Façade:",
            text: `In de tentoonstelling stond een geschaalde replica van de oude façade, waarop via projection mapping visuals werden geprojecteerd. Onder de replica bevond zich een touchscreen met een React applicatie. Hierin deden spelers een quiz waar ze de façade moest restoreren door de juiste figureren te herkennen. Bij een goed antwoord kregen ze een plekje op de façade.`,
            media: { type: 'video', src: "/videos/lisboa-facade.mp4" }
        },
    ]
}