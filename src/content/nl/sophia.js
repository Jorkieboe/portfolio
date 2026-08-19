export default {
    id: "sophia",
    projectTitle: "Het KinderHersenLab Zelfportret",
    projectType: "webapplicatie",
    introText: "Een webapplicatie voor het Sophia kinderziekenhuis gemaakt in vue.js waar kinderen hun resulaten kunnen inzien van onderzoeken in het kinderhersenlab",
    splashImages: [
        { type: 'image', src: "/images/sophia/zelfportrait-splash.jpg" }
    ],
    content: [
        {
            title: "Het Zelfportret",
            text: `In het Sophia Kinderziekenhuis bevind zich het KinderHersenLab waar kinderen met hersen/zenuw en of zintuigelijke aandoening op een speelse manier worden onderzocht. Het ziekenhuis wilt daarvoor een webapplicatie waar kinderen met hun ouders informatie over toekomstige onderzoeken en laatste resultaten kunnen zien.`,
            media: { type: 'image', src: "/images/sophia/zelfportrait_screens.jpg" }
        },
        {
            title: "Thema's ",
            text: `De doelgroep van de applicatie was gericht op kinderen en moest dezelfde speelse uitstraling hebben als het KinderHersenLab zelf. De kinderen kunnen uit 4 verschillende thema's kiezen waardoor alle kleuren in de applicatie veranderen naar dat thema.`,
            media: { type: 'image', src: "/images/sophia/zelfportrait_themes.jpg" }
        },
        {
            title: "Animaties",
            text: `Naast de UI konden we app ook nog speelser maken met animaties. Hiervoor heb ik vueuse motion gebruikt om bouncy animaties toe te voegen aan knoppen, pop ups en navigatie.`,
            media: { type: 'video', src: "/videos/zelfportret.mp4", thumbnail: "/images/sophia/zelfportret_thumbnail.jpeg" }
        },
    ]
}