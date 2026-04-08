export default {
    projectTitle: "Festival recommender",
    projectType: "Machine learning",
    introText: "Festival recommender beveelt jou aan naar welke muziek festivals je moet gaan op basis van je luistergedrag op Spotify. Het systeem verzamelt data via de Spotify API en gebruikt machine learning om je muzieksmaak te vergelijken met de line-ups van festivals. De interface is ontwikkeld met React.",
    splashImages: [
        { type: 'image', src: '/images/recommender/FR_mock_recommendation.jpg' },
    ],
    content: [
        {
            title: "Concept",
            text: `Het hele jaar door zijn er heel veel festivals in Nederland, maar naar welke moet je gaan? Op deze festivals kunnen bekenden artiesten spelen, maar ook minder bekende die je mogelijk wel heel leuk vindt. Het is natuurlijk een hoop werk om ze allemaal uit te zoeken. Hiervoor heb ik een recommender system gemaakt die festivals aanbeveelt op basis van je meest beluisterde muziek.`,
            media: { type: 'image', src: "/images/recommender/output2.jpg" }
        },
        {
            title: "Data verzamelen",
            text: `Het recommender system moet data over de muziek van de artiesten vergelijken met jouw meest beluisterde muziek. Hiervoor heb ik de Spotify API gebruikt om data over muziek te verzamelen. De Spotify API geeft je toegang tot metadata over tracks zoals danceability, valence en tempo. Uiteindelijk kan ik alle verzamelde data gebruiken om een profiel te maken van jouw muziek en elk individueel festival.`,
            media: { type: 'image', src: "/images/recommender/output.jpg" }
        },
        {
            title: "Development",
            text: `Uiteindelijk wordt je muziekprofiel met elk festival vergeleken met behulp van cosine similarity, wat resulteert in een score tussen nul en één. Hoe hoger deze score, hoe beter het festival aansluit bij je muzieksmaak. Na mijn studie ben ik dit recommender system gaan integreren in een React.js-applicatie. Deze applicatie maakt gebruik van PyScript om Python-code direct in de browser uit te voeren. Daarnaast is het systeem verder verbeterd door muziek te clusteren, zodat een gevarieerde muzieksmaak behouden blijft en niet wordt gegeneraliseerd.`,
            media: { type: 'image', src: "/images/recommender/FR_cosine.jpg" }
        }
    ]
}