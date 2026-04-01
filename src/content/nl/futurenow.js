export default {
    id: "futurenow",
    projectTitle: "Future is Now",
    projectType: "Werk project",
    introText: "Mijn tweede grote opdracht was voor een tentoonstelling in het Hong Kong Science Museum over de toekomst in transport, eten, en dagelijks leven. Hiervoor heb ik gewerkt aan een aantal applicaties.",
    splashImages: [
        {type: 'image', src: '/images/futurenow/overview.jpg'},
        {type: 'image', src: '/images/futurenow/autonomous_driving.jpg'},
        {type: 'image', src: '/images/futurenow/iot.jpg'},
    ],
    content: [
        {
            title: "Fly with Betsy",
            text: `De DC3 (Betsy) was een van de eerste commerciële vliegtuigen in de regio Hong Kong. Dit vliegtuig wordt tentoongesteld in het Hong Kong Science Museum. Hiervoor heb ik een three js applicatie gemaakt om meer te weten te komen over Betsy. Je kan rondkijken en hotspots inspecteren. Het vliegtuig model was best wel groot om te draaien in een webomgeving. Hierin heb ik wat extra optimalisatie gedaan om de framerate op 60 fps te houden.`,
            media: {type: 'video', src:"/videos/futurenow_betsy.mp4"}
        },
        {
            title: "Internet of Things",
            text: `In de toekomst zijn al onze apparaten verbonden en zullen ze taken uitvoeren voordat wij er aan denken. In deze applicatie, gemaakt met Vue.js, gaan bezoekers scenario’s spelen waarin slimme apparaten hun helpen. De interactive draait op één pc met 4 schermen in een soort kruis. Boven de schermen hangen ledjes die reageren op het gebruik van de app. `,
            media: {type: 'video', src:"/videos/futurenow_iot.mp4"}
        },
        {
            title: "Autonomous driving",
            text: `De volledig zelfrijdende auto is er nog niet maar gaat binnenkort wel komen. In deze interactive gaan bezoekers de AI van een auto trainen via een quiz en daarna een reactie verkeerstest doen tegen de AI en een andere speler. Deze applicatie draait op twee kleine schermen met daarboven een breed scherm als voorruit. Het draait in een venster verspreid over meerdere schermen. Hierbij synchroniseren we de progressie met Pinia state manager van Vue.js.`,
            media: {type: 'image', src: "/images/futurenow/driving.jpg" }
        },
        {
            title: "Chasing perfection",
            text: `Ik heb voor chasing perfection een ondersteunende rol gehad, waarin ik hielp bij bepaalde onderdelen zoals UI en Testing. Deze interactive is een unity applicatie met een ai fitness die met je meekijkt via body tracking met een diepte camera.`,
            media: {type: 'image', src: "/images/Inabox/enemy.jpg"}
        },
    ]
}