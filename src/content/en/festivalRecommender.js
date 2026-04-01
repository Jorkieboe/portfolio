export default {
    projectTitle: "Festival recommender",
    projectType: "Machine learning",
    introText: "Festival recommender suggests which music festivals you should go to based on the music you listen to on Spotify. This system uses machine learning to compare your favorite music with the performing artists at festivals.",
    content: [
        {
            title: "Concept",
            text: `There are many festivals throughout the year in the Netherlands, but which one should you go to? You will hear many known artists at those festivals, but you also might like lesser-known artists. However, it is a lot of work to listen to all artists performing at certain festivals. Therefore. I created a recommender system that suggests festivals based on your most listened-to tracks.`,
            media: {type: 'image', src: "/images/recommender/output2.jpg"}
        },
        {
            title: "Data collection",
            text: `This recommender system will compare data about all the artists with your most listened-to tracks. So, I used the Spotify API to collect data about music. The Spotify API gives you access to metadata about tracks, such as danceability, valence, and tempo. I will compare these datapoints with each other. Finally, I can use the data to create a profile for your music and every festival.`,
            media: {type: 'image', src: "/images/recommender/output.jpg"} 
        },
        {
            title: "Development",
            text: `The last step is to compare your music with every festival using the cosine similarity. That will give a number between zero and one. The higher the number, the more similar the festival in comparison to your music taste. After the master's, I started implementing the recommendation model into a react.js app. The application uses Pyscript to run Python code directly in the browser. Furthermore, improving the model by clustering music to prevent generalization of music taste.`,
            media: {type: 'image', src: "/images/recommender/FR_cosine.jpg"} 
        }
    ]
}