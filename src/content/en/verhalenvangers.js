export default {
    id: "verhalenVangers",
    projectTitle: "Story Catchers",
    projectType: "Work project",
    introText: "Commissioned by the Grote Sint-Laurenskerk in Alkmaar, I built a multimedia tour to discover the secrets of the church. The application is built with React Native and managed on Samsung tablets via ScaleFusion.",
    splashImages: [
        { type: "image", src: "/images/verhalenvangers/storycatchers.jpg" },
        { type: "image", src: "/images/verhalenvangers/organ.jpg" },
        { type: "video", src: "/videos/verhalenvangers-licht.mp4" },
    ],
    content: [
        {
            title: "The tour",
            text: `The goal of the multimedia tour is to discover different places in the museum. The visitor is given a zoomed-in photo of a location. They had to find this place and answer a question there. Afterward, they enter an interaction to learn more about that place. These could be various interactions such as solving a puzzle, turning on the lights in the church, or listening to an audio story.`,
            media: { type: "image", src: "/images/verhalenvangers/church.jpg" }
        },
        {
            title: "Frontend",
            text: `The application is built in React Native. Although I already knew React, React Native is quite a step further to get all those native functions working. Moreover, besides various libraries to make certain interactives work such as Three.js or a gesture plugin, there was also a whole logic to manage the translations for texts, images, and videos. In this project, I spent the most work on the audio because the tablet had to let the server know when it was finished. And that caused problems if the audio didn't play or stopped prematurely.`,
            media: { type: "image", src: "/images/verhalenvangers/screens.jpg" }
        },
        {
            title: "Backend",
            text: `Even though my role was mainly the frontend, I also contributed to the backend. The tablets were connected via socket.io to a Node server that controlled the entire tour. Throughout the project, we struggled with poor internet connections in the church, which caused the entire game to crash if a tablet lost connection. We solved this with a lot of extra checks.`,
            media: { type: "video", src: "/videos/verhalenvangers-tablets.mp4" }
        },
    ]
}