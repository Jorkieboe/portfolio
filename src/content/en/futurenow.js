export default {
    id: "futurenow",
    projectTitle: "Future is Now",
    projectType: "Museum Exhibition",
    introText: "My second major assignment was for an exhibition at the Hong Kong Science Museum about the future of transportation, food, and daily life. For this, I worked on a number of applications using Vue, Three.js, Unity, and LED strips.",
    splashImages: [
        {type: 'image', src: '/images/futurenow/overview.jpg'},
        {type: 'image', src: '/images/futurenow/autonomous_driving.jpg'},
        {type: 'image', src: '/images/futurenow/iot.jpg'},
    ],
    content: [
        {
            title: "Fly with Betsy",
            text: `The DC3 (Betsy) was one of the first commercial aircraft in the Hong Kong region. This aircraft is exhibited in the Hong Kong Science Museum. For this, I created a Three.js application to learn more about Betsy. You can look around and inspect hotspots. The aircraft model was quite large to run in a web environment. I did some extra optimization here to keep the framerate at 60 fps.`,
            media: {type: 'video', src:"/videos/futurenow_betsy.mp4"}
        },
        {
            title: "Internet of Things",
            text: `In the future, all our devices will be connected and will perform tasks before we even think about them. In this application, made with Vue.js, visitors play scenarios in which smart devices help them. The interactive runs on one PC with 4 screens in a cross shape. Above the screens hang LEDs that are controlled via Node.js and react to the use of the app.`,
            media: {type: 'video', src:"/videos/futurenow_iot.mp4"}
        },
        {
            title: "Autonomous driving",
            text: `The fully self-driving car is not here yet but will arrive soon. In this interactive, visitors train the AI of a car via a quiz and then do a reaction traffic test against the AI and another player. This application runs on two small screens with a wide screen above them acting as a windshield. It runs in one window spread over multiple screens. Here we synchronize the progression with the Pinia state manager of Vue.js.`,
            media: {type: 'image', src: "/images/futurenow/driving.jpg" }
        },
        {
            title: "Chasing perfection",
            text: `I had a supporting role for chasing perfection, in which I helped with certain components such as UI and Testing. This interactive is a Unity application with an AI fitness coach that watches you via body tracking on a depth camera.`,
            media: {type: 'image', src: "/images/futurenow/posturetraining.jpg"}
        },
    ]
}