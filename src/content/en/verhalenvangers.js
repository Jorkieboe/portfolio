export default {
    projectTitle: "Verhalen Vangers",
    projectType: "Werk project",
    introText: "In opdracht van de Grote kerk in Alkmaar heb ik een multimedia tool gebouwd in react native en verspreid via scalefusion.",
    content: [
        {
            title: "De tour",
            text: `Het doel van de tour was om verschillende plekken in het museum te ontdekken. Je kreeg een ingezoomde foto van een plek. De bezoekers moesten naar die plek toe en daar een vraag beantwoorden. Daarna gingen ze in een interactie in om meer voer die plek te weten te komen. Dit konden verschillende dingen zijn als een puzzel, licht in de kerk aanzetten, een audio verhaal.`,
            image: "/public/images/Inabox/conceptartRot.jpg"
        },
        {
            title: "Frontend",
            text: `De applicatie is gebouwd in react native. Al kende ik react al, native is nog wel iets meer om al die native functies te laten werken. Hier heb ik het meeste werk gehad aan de audio omdat de tablet aan de server liet weten als die klaar was. En dat gaf problemen als de audio niet speelde of vroegtijdige stopte.`,
            image: "/public/images/Inabox/boxroom.jpg"
        },
        {
            title: "Backend",
            text: `Al was mijn rol vooral de frontend, heb ik wel meegewerkt aan de backend. De tablets waren verbonden via socket io met een node server die heel de tour aanstuurde. Tijdens heel het project kampte we met slechte internet verbindingen waarop heel het spel in de soep liep als een tablet de verbinding verloor. Dit hebben we opgelost met heel checks.`,
            image: "/public/images/Inabox/enemy.jpg"
        },
    ]
}