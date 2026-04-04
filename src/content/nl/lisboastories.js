export default {
    id: 'lisboaStories',
    projectTitle: "Lisboa stories",
    projectType: "Werk project",
    introText: "Voor een tentoonstelling in de Lisboa hotels in Macau (China) ontwikkelde ik meerdere interactieve applicaties over de geschiedenis tijdens handel in Macau met de portugezen. Ik werkte aan diverse applicaties, waaronder webapplicaties, een game en applicatie met computer vision -toepassing. Zie hieronder de verschillende onderdelen",
    splashImages: [
        { type: 'image', src: '/images/lisboa/diary.jpg' },
        { type: 'image', src: '/images/lisboa/trading.jpg' },
        { type: 'image', src: '/images/lisboa/facade.jpg' },
    ],
    content: [
        {
            title: "Harriet Low’s Dairy",
            text: `Een van de interacties was een geprojecteerde video dagboek waar bezoekers doorheen konden bladeren. De interactie bestond uit een fysiek boek met markers in de hoeken, geplaatst onder een camera en projector. Een camera detecteerde met behulp van machine learning welke marker in beeld waren. En projecteerde de bijbehorende video. Om een soepele video te behouden werd de python backend van de videoplayer gescheiden.`,
            media: { type: 'video', src: "/videos/lisboa-diary.mp4" }
        },
        {
            title: "Trading game",
            text: `Trading game is een applicatie ontwikkeld met Vue.js, waarin je een handelsreis maakte in het oude China. Hier in ontwikkelde ik een minigame met Phaser waarbij je zo veilig naar je bestemming moest komen tussen piraten, rotsen en tyfoons. De grootste uitdaging was de performance. De applicatie draaide op 3 pc’s waar één pc een extra centrale kaart aanstuurde. De framerate van de game bepaalde de snelheid van de boot en wat optimalisatie kwam van pas.`,
            media: { type: 'image', src: "/images/Inabox/boxroom.jpg" }
        },
        {
            title: "Façade:",
            text: `In de tentoonstelling stond een geschaalde replica van de oude façade, waarop via projection mapping visuals werden geprojecteerd. Onder de replica bevond zich een touchscreen met een React applicatie. Hierin deden spelers een quiz waar ze de façade moest restoreren door de juiste figureren te herkennen. Bij een goed antwoord kregen ze een plekje op de façade.`,
            media: { type: 'video', src: "/videos/lisboa-facade.mp4" }
        },
    ]
}