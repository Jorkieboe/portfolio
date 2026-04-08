export default {
    id: 'lisboaStories',
    projectTitle: "Lisboa stories",
    projectType: "Museum Exhibition",
    introText: "For an exhibition in the Lisboa hotels in Macau (China), I developed several interactive applications about the history of trade between Macau and the Portuguese. I worked on various applications, including web applications, a game, and an application with a computer vision implementation. See the different components below.",
    splashImages: [
        { type: 'image', src: '/images/lisboa/diary.jpg' },
        { type: 'image', src: '/images/lisboa/trading.jpg' },
        { type: 'image', src: '/images/lisboa/facade.jpg' },
    ],
    content: [
        {
            title: "Harriet Low's Diary",
            text: `One of the interactions was a projected video diary that visitors could browse. The interaction consisted of a physical book with markers in the corners, placed beneath a camera and projector. A camera detected which markers were in view using machine learning and projected the corresponding video. During development, I found that running an interface in Python can introduce significant delays, particularly in components such as video playback.`,
            media: { type: 'video', src: "/videos/lisboa-diary.mp4" }
        },
        {
            title: "Trading game",
            text: `Trading game is an application developed with Vue.js, in which players embark on a trading journey through ancient China. As part of this project, I developed a minigame with Phaser where you have to sail safely to your destination between pirates, rocks, and typhoons. The biggest challenge was the performance. The application ran on 3 PCs where one PC controlled an extra central map. The game's framerate determined the speed of the boat and therefore had to be synchronized across all PCs.`,
            media: { type: 'video', src: "/videos/lisboa-trading.mp4" }
        },
        {
            title: "Façade",
            text: `In the exhibition featured scaled replica of the old façade, onto which visuals were projected using projection mapping. Beneath the model was a touchscreen running a React application, where visitors could play a quiz to restore the façade by identifying the correct figures. Each correct answer revealed a corresponding element on the façade.`,
            media: { type: 'video', src: "/videos/lisboa-facade.mp4" }
        },
    ]
}