export default {
    projectTitle: "Festival recommender",
    projectType: "Machine learning",
    introText: "Festival recommender recommends which music festivals you should go to based on your listening behavior on Spotify. The system collects data via the Spotify API and uses machine learning to compare your music taste with festival lineups. The interface was developed with React.",
    splashImages: [
        { type: 'image', src: '/images/recommender/FR_mock_recommendation.jpg' },
    ],
    content: [
        {
            title: "Concept",
            text: `There are many festivals throughout the Netherlands all year round, but which one should you go to? At these festivals, famous artists might play, but also less famous ones that you might really like. Of course, it is a lot of work to sort them all out. For this, I made a recommender system that recommends festivals based on your most listened-to music.`,
            media: { type: 'image', src: "/images/recommender/output2.jpg" }
        },
        {
            title: "Data collection",
            text: `The recommender system has to compare data about the artists' music with your most listened-to music. For this, I used the Spotify API to collect data about music. The Spotify API gives you access to metadata about tracks such as danceability, valence, and tempo. I am going to compare these values with each other. Ultimately, I can use all the collected data to create a profile of your music and each individual festival.`,
            media: { type: 'image', src: "/images/recommender/output.jpg" }
        },
        {
            title: "Development",
            text: `Finally, your music profile is compared with each festival using cosine similarity. This results in a number between zero and one. The higher this number, the more similar the festival is to your music taste. After my studies, I started integrating this recommender system into a React.js app. This application uses PyScript to run Python code directly in the browser. In addition, the recommender system was further developed by clustering the music so that a varied music taste is not generalized.`,
            media: { type: 'image', src: "/images/recommender/FR_cosine.jpg" }
        }
    ]
}