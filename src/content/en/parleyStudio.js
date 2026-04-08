export default {
    id: 'parleyStudio',
    projectTitle: "Parley Studio",
    projectType: "AI tool",
    introText: "Parley studio is an AI platform to bring historical characters to life. In Parley, the character's narrative takes center stage and Retrieval-Augmented Generation helps prevent hallucinations. The application is built with Fast API and a Vue.js frontend.",
    splashImages: [
        { type: 'image', src: '/images/parley/neel.png' },
        { type: 'image', src: '/images/parley/chatscreen.jpg' },
        { type: 'image', src: '/images/parley/lijsbeth.jpg' },
    ],
    content: [
        {
            title: "New way of storytelling",
            text: `Parley studio is a tool to bring AI characters to life. I do not see AI as a goal in itself but as a new form of storytelling. My goal was to build a foundation to make the language models more predictable and human.`,
            media: { type: 'video', src: "/videos/parley-guillaume.mp4" }
        },
        {
            title: "Guiding the LLM",
            text: `The general problem with language models is that they quickly fall back into their helpful behavior to answer your questions. A good conversation has a rhythm and a goal. For this, I developed an entire orchestration engine that guides the AI. This makes the interaction feel like an ongoing story.`,
            media: { type: 'image', src: "/images/parley/tree.png" }
        },
        {
            title: "Creator tool",
            text: `The focus of the application is on creativity and must also be understandable for people without a technical background. I built an interface with Vue.js to create a character in a more visual way. This allows users to build a conversation via a kind of behavior tree (as you see in game engines).`,
            media: { type: 'image', src: "/images/parley/fred.png" }
        },
        {
            title: "The perspective",
            text: `What a character knows determines their identity. I built a system where all information is filtered through the eyes of the character. A 15th-century soldier views the world differently than a modern-day guide. This allows us to create a consistent world in which a character can and may only tell things from their Point of View.`,
            media: { type: 'image', src: "/images/parley/characters.png" }
        },
        {
            title: "Latency is the enemy",
            text: `Currently, the biggest problem with these developments is latency. For a good immersive experience, you should almost forget that you are talking to a computer. For this, I set up a full-stack architecture that noticeably reduces the time between speaking and answering. By streaming the output and updating the visuals on the screen, the perceived wait is minimized.`,
            media: { type: 'image', src: "/images/parley/latency.jpg" }
        }
    ]
}