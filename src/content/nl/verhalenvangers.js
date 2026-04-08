export default {
    id: "verhalenVangers",
    projectTitle: "Verhalen Vangers",
    projectType: "Werk project",
    introText: "In opdracht van de Grote Sint-Laurenskerk in Alkmaar heb ik een multimedia tour gebouwd om de geheimen van de kerk te ontdekken. De applicatie is gebouwd met React Native en gemanaged op Samsung tablets via ScaleFusion.",
    splashImages: [
        { type: "image", src: "/images/verhalenvangers/storycatchers.jpg" },
        { type: "image", src: "/images/verhalenvangers/organ.jpg" },
        { type: "video", src: "/videos/verhalenvangers-licht.mp4" },
    ],
    content: [
        {
            title: "De tour",
            text: `Het doel van de multimedia tour is om verschillende plekken in het museum te ontdekken. De bezoeker krijgt een ingezoomde foto van een plek. Zij moesten deze plek zien te vinden en daar een vraag beantwoorden. Daarna starten ze een interactie om meer over die plek te weten te komen. Dit konden diverse interacties zijn zoals een puzzel maken, licht in de kerk aanzetten of een audio verhaal beluisteren.`,
            media: { type: "image", src: "/images/verhalenvangers/church.jpg" }
        },
        {
            title: "Frontend",
            text: `De applicatie is gebouwd in React Native. Al kende ik React al, React Native is nog wel een stapje verder om al die native functies te laten werken. Bovendien was er naast diverse libraries als Three js of een gesture plugin, ook een hele complexe logica nodig voor de vertalingen in teksten, plaatjes en videos. In dit project heb ik het meeste werk gehad aan de audio omdat de tablets aan de server lieten weten wanneer de audio klaar was met afspelen. En dat gaf problemen als de audio niet speelde of vroegtijdig stopte.`,
            media: { type: "image", src: "/images/verhalenvangers/screens.jpg" }
        },
        {
            title: "Backend",
            text: `Hoewel mijn rol vooral in de frontend lag, heb ik ook meegewerkt aan de backend. De tablets waren verbonden via socket io met een node server die heel de tour aanstuurde. Tijdens heel het project kampten we met slechte internet verbindingen in de kerk waarop het hele spel in de soep liep. Dit hebben we opgelost met heel veel extra checks in de server communicatie.`,
            media: { type: "video", src: "/videos/verhalenvangers-tablets.mp4" }
        },
    ]
}