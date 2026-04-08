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
            text: `Drowning is still a major cause of death among young people. Notably, in addition to young children, a significatn number of young men also become victims. This often arises due to peer pressure around this age. Young men have to prove that they are not afraid and are strong. As a result, they are more likely to take risks and end up in dangerous situations.`,
            media: { type: 'image', src: "/images/SOTA/beach.jpg" }
        },
        {
            title: "Concept",
            text: `In this VR experience, young men are challenged to swim to a rock far out in the sea. Through conversations with non-player characters, they are persuaded to take on the challenge, even though the distance is clearly far way. If the user chooses to participate, it quickly becomes apparent that the distance is too great, ultimately leading to them drowning.`,
            media: { type: 'image', src: "/images/SOTA/npcs.jpg" }
        },
        {
            title: "Development",
            text: `The experience was developed in Unreal Engine as part of a master's assignment to work with new techniques. The process started with building the beach environment and setting up a dialogue system. Based on user tests, the dialogues were refined and environmental signals, such as sounds indicating fatigue, were further improved.`,
            media: { type: 'image', src: "/images/SOTA/dialog.jpg" }
        }
    ]
}