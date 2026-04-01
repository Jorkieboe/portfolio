export default {
    projectTitle: "Motivate students to sport with personalized gamification.",
    projectType: "Gamification",
    introText: "My graduation project investigates how gamification can be personalized to get students to exercise more. This application will learn how to motivate a specific student using machine learning algorithms.",
    content: [
        {
            title: "Problem",
            text: `Gamification is an often-used method to get people more active. Several game element helps to create motivation. The problem with these apps is that they only use one way to motivate everyone. Multiple researchers argue for new methods to personalize gamification.`,
            media: {type: 'image', src: "/images/gamification/research.jpg"}
        },
        {
            title: "Concept",
            text: `Deze applicatie is een sport app die dagelijks gepersonaliseerde challenges voorstelt om te gaan rennen. De applicatie gebruikt reinforcement learning om de interesses van de gebruiker te herkennen. Alle challenges zijn gemaakt voor één specifiek spelertype. Bijvoorbeeld een challenge dat gaat over het verbreken van persoonlijke records hoort bij het spelertype ‘achiever’. Dus, wanneer de gebruiker een challenges kiest dat gaat over eigen records verbreken, leert het systeem dat speler mogelijk een achiever is. Het system kan vervolgens meer achiever challenges aanbevelen.`,
            media: {type: 'image', src: "/images/gamification/interfacesketches.jpg"}
        },
        {
            title: "Development",
            text: `The development process consists of three steps: Creating challenges, creating a recommendation system with a reinforcement learning algorithm, and designing a user interface. <br> Firstly, the challenges were created by scraping 2500 challenges from Strava. I clustered all the challenges to create new ones for each specific playertype. <br> Secondly, the recommendation system uses the Thompson sampling reinforcement learning algorithm. Combined with the other two algorithms, these were tested in a simulation. In the simulation, the computer selected challenges based on certain users' preferences. <br> Lastly, the user interface was created in Figma. The goal of this application was to get people running and thus fast to use. That has been tested several times among the target audience and turned out to be very simple and clear.`,
            media: {type: 'image', src: "/images/gamification/algoWorking.jpg"}
        }
    ]
}