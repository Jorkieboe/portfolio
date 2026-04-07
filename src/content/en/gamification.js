export default {
    id: 'Gamification',
    projectTitle: "Personalized gamification",
    projectType: "Gamification",
    introText: "In my graduation project, I investigate how gamification can be personalized to encourage students to exercise more. Using machine learning algorithms, an application learns which factors motivate an individual the most.",
    content: [
        {
            title: "Problem",
            text: `Gamification is a widely used technique to motivate people to exercise more. Various game elements can increase motivation, but many existing apps use a single method for all users. This is a limitation, as motivation varies per person. Therefore, more and more researchers are focusing on personalizing gamification.`,
            media: {type: 'image', src: "/images/gamification/research.jpg"}
        },
        {
            title: "Concept",
            text: `This application is a sports app that suggests personalized running challenges daily. Using reinforcement learning, the application learns to recognize the user's preferences and motivations. Each challenge is designed for a specific player type, such as the 'achiever', where the focus is on breaking personal records. When a user frequently chooses this type of challenge, the system learns that this motivation suits the user and can recommend similar challenges.`,
            media: {type: 'image', src:"/images/gamification/interfacesketches.jpg"}
        },
        {
            title: "Development",
            text: `The development process consisted of three parts: creating challenges, developing a recommendation system, and designing the user interface. The challenges are based on 2,500 scraped Strava challenges and grouped by player type. The recommendation system uses the Thompson Sampling reinforcement learning algorithm and has been tested in simulations against other algorithms. The user interface was designed in Figma with a focus on simplicity and ease of use while running, and proved to be effective in user tests.`,
            media: {type: 'image', src:"/images/gamification/algoWorking.jpg"}
        }
    ]
}