export default {
    id: "beerAgent",
    projectTitle: "Beer Agent",
    projectImage: '/images/beer-agent/cover.jpg',
    projectType: "AI Agent",
    projectStats: [
        {
            title: "Role:",
            content: ["AI Engineer", "Concept Development", "Agentic AI"]
        },
        {
            title: "Responsibilities:",
            content: [
                "Problem Definition & Concept Development",
                "Data Collection & Processing",
                "Agent Architecture",
                "Development"
            ]
        },
        {
            title: "Tech:",
            content: ["Python, LLMs", "Tool Calling, Google Places API"]
        }
    ],
    introText: "An AI agent that combines personal beer preferences with real-time Untappd data to discover new beers and create complete pub crawls. Using a custom scoring model and validation system, the agent delivers relevant and reliable recommendations.",
    splashImages: [
        { type: 'image', src: '/images/beer-agent/overview.jpg' },
    ],
    content: [
        {
            title: "The Problem",
            text: `Whenever I want to try a new beer at a pub, I first need to check whether I've already had it before. This often means searching through Untappd, something I don't always feel like doing when I'm already at a pub. As a result, I sometimes end up unknowingly ordering beers I've tried before. I wanted to automate this process and be able to see in advance which interesting beers a pub has to offer.`,
        },
        {
            title: "Data & Scoring",
            text: `The biggest challenge was collecting reliable beer data. Since many pubs don't publish their beer menus on Untappd, I came up with an alternative approach. By scraping the Untappd pages of pubs, I can use their check-in feeds to identify which beers have recently been consumed there.
            To rank the results, I developed a custom scoring model. It combines my average rating for a specific beer style with the community's rating. Additionally, a beer receives a bonus if it comes from a brewery I haven't tried before.
            Recency also plays a role: the longer ago a beer was checked in, the lower its score. After 21 days, the likelihood of the beer still being available is considered low. Colour indicators make this estimated availability immediately clear.`,
            media: { type: 'image', src: "/images/beer-agent/scoring.jpg" }
        },
        {
            title: "AI Agent & Pub Crawls",
            text: `With the collected beer data, I saw an opportunity to expand the concept. The AI agent can now also create complete pub crawls based on personal preferences, the desired number of pubs and beers, and the distances between locations using the Google Places API.
            A key challenge was ensuring the agent's reliability. Since an LLM can sometimes hallucinate non-existent pubs or beers, I developed a custom validation and commit system. Each beer is verified to ensure it has actually been checked in at the selected pub.
            Invalid results are rejected, and the agent receives feedback explaining why they were rejected. Based on this feedback, it can search for an alternative or revert to a previous step. A pub and its beers are only added to the route after successful validation.`,
            media: { type: 'video', src: "/videos/beerAgent.mp4", thumbnail: "/images/beer-agent/agent.jpg" }
        },
        {
            title: "Development",
            text: `I started by designing an interface in Figma to shape the concept and user experience. I then translated the idea into a technical plan and a structured to-do list using spec-based programming.
            With the help of a coding agent, I developed the application iteratively. The focus was not only on building the functionality but also on ensuring reliable data collection, processing, and validation.`,
            media: { type: 'image', src: "/images/beer-agent/development.jpg" }
        }
    ]
}
