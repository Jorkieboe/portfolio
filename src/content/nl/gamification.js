export default {
    id: 'Gamification',
    projectTitle: "Gepersonaliseerde gamification",
    projectType: "Gamification",
    introText: "In mijn afstudeerproject onderzoek ik hoe gamification gepersonaliseerd kan worden om studenten te stimuleren meer te sporten. Met behulp van machine learning-algoritmes leert een applicatie welke factoren een individu het meest motiveren.",
    content: [
        {
            title: "Probleem",
            text: `Gamification is een veelgebruikte techniek om mensen te motiveren om meer te sporten. Verschillende game-elementen kunnen de motivatie vergroten, maar veel bestaande apps hanteren één methode voor alle gebruikers. Dit vormt een beperking, aangezien motivatie per persoon verschilt. Daarom richten steeds meer onderzoekers zich op het personaliseren van gamification.`,
            image: "/public/images/gamification/research.jpg"
        },
        {
            title: "Concept",
            text: `Deze applicatie is een sportapp die dagelijks gepersonaliseerde hardloopchallenges voorstelt. Met behulp van reinforcement learning leert de applicatie de voorkeuren en motivaties van de gebruiker herkennen. Elke challenge is ontworpen voor een specifiek spelertype, zoals de ‘achiever’, waarbij de focus ligt op het verbreken van persoonlijke records. Wanneer een gebruiker vaker voor dit type challenge kiest, leert het systeem dat deze motivatie aansluit bij de gebruiker en kan het vergelijkbare challenges aanbevelen.`,
            image: "/public/images/gamification/interfacesketches.jpg"
        },
        {
            title: "Development",
            text: `Het ontwikkelproces bestond uit drie onderdelen: het creëren van challenges, het ontwikkelen van een recommendation system en het ontwerpen van de gebruikersinterface. De challenges zijn gebaseerd op 2500 gescrapete Strava-challenges en gegroepeerd per spelertype. Het recommendation system maakt gebruik van het Thompson Sampling reinforcement learning-algoritme en is getest in simulaties met andere algoritmes. De gebruikersinterface is ontworpen in Figma met focus op eenvoud en gebruiksgemak tijdens het rennen. En bleek effectief te zijn onder gebruikerstesten.`,
            image: "/public/images/gamification/algoWorking.jpg"
        }
    ]
}