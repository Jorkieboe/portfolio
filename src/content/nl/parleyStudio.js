export default {
    id: 'parleyStudio',
    projectTitle: "Parley Studio",
    projectType: "AI tool",
    introText: "Parley studio is een AI-platform om historische karakters tot leven te brengen. In parley staat het narratief van het personage centraal en helpt Retrieval-Augmented Generation tegen hallucinaties. De applicatie is gemaakt met Fast api en een Vue.js frontend.",
    splashImages: [
        { type: 'image', src: '/images/parley/neel.png' },
        { type: 'image', src: '/images/parley/chatscreen.jpg' },
        { type: 'image', src: '/images/parley/lijsbeth.jpg' },
    ],
    content: [
        {
            title: "Nieuwe manier van storytelling",
            text: `Parley studio is een tool om ai personages tot leven te wekken. Ik zie AI niet als een doel op zich maar een nieuwe vorm van storytelling. Mijn doel was om een basis te bouwen om de taalmodellen voorspelbaarder en menselijker te maken.`,
            media: { type: 'video', src: "/videos/parley-guillaume.mp4" }
        },
        {
            title: "Sturen van de LLM",
            text: `Het algemene probleem van taalmodellen is dat ze snel terugvallen in hun behulpzame gedrag om jouw vragen te beantwoorden. Een goed gesprek heeft een ritme en een doel. Hiervoor heb ik een hele orchestratie-engine ontwikkeld die de AI stuurt. De interactie voelt hierdoor als een lopend verhaal.`,
            media: { type: 'image', src: "/images/parley/tree.png" }
        },
        {
            title: "Makers tool",
            text: `De focus van de applicatie ligt in de creativiteit en moet ook begrijpelijk zijn voor mensen zonder technische achtergrond. Ik heb met Vue.js een interface gebouwd om op een visuele manier een karakter te creëren. Hiermee kunnen gebruikers via een soort behavior tree (zoals je ziet in game engines) een gesprek opbouwen.`,
            media: { type: 'image', src: "/images/parley/fred.png" }
        },
        {
            title: "Het perspectief",
            text: `Wat een personage weet, bepaalt zijn identiteit. Ik heb een systeem gebouwd waarbij alle informatie wordt gefilterd door de ogen van het personage. Een soldaat uit de 15e eeuw bekijkt de wereld anders dan een gids in het nu. Daardoor kunnen we een consistente wereld creëren waarin een personage alleen vanuit zijn standpunt (Point of View) kan en mag vertellen.`,
            media: { type: 'image', src: "/images/parley/characters.png" }
        },
        {
            title: "Latency is de vijand",
            text: `Op dit moment is het grootste probleem van deze ontwikkelingen latency. Voor een goede immersieve ervaring moet je haast vergeten dat je tegen een computer praat. Hiervoor heb ik een full-stack architectuur opgezet die de tijd tussen spreken en antwoord voelbaar moet verminderen. Dit heb ik gedaan door middle van het streamen van de output en visuele veranderingen op het scherm.`,
            media: { type: 'image', src: "/images/parley/latency.jpg" }
        }
    ]
}