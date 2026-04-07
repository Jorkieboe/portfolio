export default {
    projectTitle: "Peer pressure VR experience",
    projectType: "Serious game",
    introText: "Drowning is still a major cause of death among young men. In this VR Experience created in the Unreal Engine, young men are confronted with the dangers of water through overestimation and peer pressure.",
    splashImages: [
        { type: 'image', src: '/images/SOTA/npcdialog.jpg' },
        { type: 'image', src: '/images/SOTA/goal.jpg' },
    ],
    content: [
        {
            title: "Problem",
            text: `Drowning is still a major cause of death among young people. Strikingly, besides young children, many young men also become victims. This often arises due to peer pressure around this age. Young men have to prove that they are not afraid and are strong. Because of this need to prove themselves, they easily end up in dangerous situations.`,
            media: { type: 'image', src: "/images/SOTA/beach.jpg" }
        },
        {
            title: "Concept",
            text: `In this VR experience, young men are challenged to go to a rock far out in the sea. Through dialogues with non-player characters, they are persuaded, even though the distance is clearly great. If the user decides to participate, it soon turns out that it is indeed too far, and they drown.`,
            media: { type: 'image', src: "/images/SOTA/npcs.jpg" }
        },
        {
            title: "Development",
            text: `The experience was developed in Unreal Engine as part of a master's assignment to work with new techniques. The process started with building the beach environment and setting up a dialogue system. Based on user tests, the dialogues were refined and environmental signals, such as sounds indicating fatigue, were further improved.`,
            media: { type: 'image', src: "/images/SOTA/dialog.jpg" }
        }
    ]
}