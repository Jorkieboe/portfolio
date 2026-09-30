export default {
    id: "futurenow",
    projectTitle: "Future is Now",
    projectType: "Museum Exhibition",
    projectStats: [{
        title: "Role:",
        content: ["Full-stack development, UX"]
    },
    {
        title: "Responsibilities:",
        content: ["Full-stack development", "Interaction design collaboration", "Remote installation", "Optimizations"]
    },
    {
        title: "Tech: ",
        content: ["Vue.js, Node.js, Phidgets, Three.js, Unity"]
    }],
    introText: "One of my major assignments was for an exhibition at the Hong Kong Science Museum about the future of transportation, food, and daily life.",
    splashImages: [
        { type: 'image', src: '/images/futurenow/overview.jpg' },
        { type: 'image', src: '/images/futurenow/autonomous_driving.jpg' },
        { type: 'image', src: '/images/futurenow/iot.jpg' },
    ],
    content: [
        {
            title: "Fly with Betsy",
            text: `The DC3 (Betsy) was one of the first commercial aircraft in the Hong Kong region. This aircraft is exhibited in the Hong Kong Science Museum. For this, I created a Three.js application to learn more about Betsy. You can look around and inspect hotspots. The aircraft model was quite heavy to run in a web environment. Here, I applied extra optimizations to maintain a smooth 60 fps framerate.`,
            media: { type: 'video', src: "/videos/futurenow_betsy.mp4" }
        },
        {
            title: "Internet of Things",
            text: `In the future, all our devices will be interconnected and will perform tasks before we even think of them. In this application, built with Vue.js, visitors play scenarios where smart devices assist them. The interactive runs on a single PC across 4 screens arranged in a cross layout. Above the screens are LEDs controlled via Phidgets with Node.js that react to app usage.`,
            media: { type: 'video', src: "/videos/futurenow_iot.mp4" }
        },
        {
            title: "Autonomous driving",
            text: `Fully autonomous vehicles aren't here yet, but they will arrive soon. In this interactive, visitors train a car's AI through a quiz, after which they compete in a reaction traffic test against the AI and another player. This application runs on two small screens with a wide screen above as a windshield, operating within a single window spanned across multiple monitors. We synchronize progress using Vue.js Pinia state management.`,
            media: { type: 'image', src: "/images/futurenow/driving.jpg" }
        },
        {
            title: "Chasing perfection",
            text: `I had a supporting role on Chasing Perfection, assisting with specific parts like UI and testing. This interactive is a Unity application featuring an AI fitness coach that observes your posture via body tracking on a depth camera.`,
            media: { type: 'image', src: "/images/futurenow/posturetraining.jpg" }
        },
    ]
}