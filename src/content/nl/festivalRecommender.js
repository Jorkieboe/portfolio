export default {
    projectTitle: "Festival recommender",
    projectType: "Machine learning",
    introText: "Festival recommender beveelt jouw aan naar welke muziek festivals je moet gaan op basis van je luistergedrag op Spotify. Het systeem verzamelt data via de Spotify API en gebruikt machine learning om je muzieksmaak te vergelijken met de line-ups van festivals. De interface is ontwikkeld met React.",
    splashImages: [
        { type: 'image', src: '/images/recommender/FR_mock_recommendation.jpg' },
    ],
    content: [
        {
            title: "Concept",
            text: `Het hele jaar door zijn heel veel festivals door Nederland, maar naar welke moet je gaan. Op deze festivals kunnen bekenden artiesten spelen, maar ook minder bekende die je mogelijk wel heel leuk vind. Het is natuurlijk een hoop werk om ze allemaal vooraf te beluisteren. Hiervoor heb ik een recommender system gemaakt die festivals aanbeveelt op basis van je meest beluisterde muziek.`,
            media: { type: 'image', src: "/images/recommender/output2.jpg" }
        },
        {
            title: "Data verzamelen",
            text: `De recommender system moet data over de muziek van de artiesten vergelijken met jouw meest beluisterde muziek. Hiervoor heb ik de Spotify API gebruikt om data over muziek te verzamelen. De Spotify API geeft je toegang tot metadata over tracks zoals danceability, valence en tempo. Deze waarde ga ik vergelijken met elkaar. Uiteindelijk kan ik alle verzamelde data gebruiken om een profiel te maken van jouw muziek en elk individueel festival.`,
            media: { type: 'image', src: "/images/recommender/output.jpg" }
        },
        {
            title: "Development",
            text: `Uiteindelijk wordt jouw muziekprofiel vergeleken met elk festival via de cosine similarity. Hieruit komt een getal tussen de nul en één. Hoe hoger dit getal is, hoe meer gelijk het festival is aan jouw muzieksmaak. Na mijn studie ben ik dit recommender system gaan verwerken in een react.js app. Deze applicatie gebruikt pyscript om direct in de browser python code te runnen. Daarnaast is het recommender system verder ontwikkeld door de muziek te clusteren zodat een gevarieerde muziek smaak niet gegeneraliseerd wordt.`,
            media: { type: 'image', src: "/images/recommender/FR_cosine.jpg" }
        }
    ]
}