export default {
    id: "sophia",
    projectTitle: "Children's Brain Lab<br> Self-Portrait",
    projectType: "web application",
    projectStats: [{
        title: "Role:",
        content: ["Front-end development, UX"]
    },
    {
        title: "Responsibilities:",
        content: ["Building responsive Front-end", "Building interactive prototype in Figma"]
    },
    {
        title: "Tech: ",
        content: ["Vue.js, VueUse Motion, Figma"]
    }],
    introText: "A web application for Sophia Children's Hospital, built with Vue.js, where children can view the results of assessments conducted at the Children's Brain Lab.",
    splashImages: [
        { type: 'image', src: "/images/sophia/zelfportrait_splash.jpg" }
    ],
    content: [
        {
            title: "The Self-Portrait",
            text: `Sophia Children's Hospital is home to the Children's Brain Lab, where children with neurological and sensory conditions undergo playful and engaging assessments. The hospital wanted a web application where children and their parents could access information about upcoming assessments and view their latest results.`,
            media: { type: 'image', src: "/images/sophia/zelfportrait_screens.jpg" }
        },
        {
            title: "Themes",
            text: `The application was designed for children and needed to have the same playful character as the Children's Brain Lab itself. Children can choose from four different themes, which change the colors and visual appearance of the entire application.`,
            media: { type: 'image', src: "/images/sophia/zelfportrait_themes.jpg" }
        },
        {
            title: "Animations",
            text: `Beyond the UI, we also wanted to make the application feel more playful through animation. I used VueUse Motion to add bouncy animations to buttons, pop-ups, and navigation.`,
            media: { type: 'video', src: "/videos/zelfportret.mp4", thumbnail: "/images/sophia/zelfportret_thumbnail.jpeg" }
        },
    ]
}