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
            title: "Harriet Low’s Diary",
            text: `One of the interactions was a projected video diary that visitors could browse through. The interaction consisted of a physical book with markers in the corners, placed under a camera and projector. A camera detected which markers were in view using machine learning and projected the corresponding video. During development, I noticed that it is very important not to run an interface in Python, as that causes a lot of delay in, for example, a video player.`,
            media: { type: 'video', src: "/videos/lisboa-diary.mp4" }
        },
        {
            title: "Trading game",
            text: `Trading game is an application developed with Vue.js, in which you make a trading journey in ancient China. In this, I developed a minigame with Phaser where you have to sail safely to your destination between pirates, rocks, and typhoons. The biggest challenge was the performance. The application ran on 3 PCs where one PC controlled an extra central map. The framerate of the game determined the speed of the boat and that had to be the same across all PCs.`,
            media: { type: 'video', src: "/videos/lisboa-trading.mp4" }
        },
        {
            title: "Façade:",
            text: `In the exhibition stood a scaled replica of the old façade, onto which visuals were projected via projection mapping. Beneath the replica was a touchscreen with a React application. In this, players played a quiz where they had to restore the façade by recognizing the correct figures. With a correct answer, they got a spot on the façade.`,
            media: { type: 'video', src: "/videos/lisboa-facade.mp4" }
        },
    ]
}