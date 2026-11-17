export default {
    id: "beerAgent",
    projectTitle: "Beer Agent",
    projectImage: '/images/beer-agent/cover.jpg',
    projectType: "AI Agent",
    projectStats: [
        {
            title: "Rol:",
            content: ["AI Engineer", "Conceptontwikkeling", "Agentic AI"]
        },
        {
            title: "Verantwoordelijkheden:",
            content: [
                "Probleemdefinitie & Conceptontwikkeling",
                "Data verzamelen en verwerken",
                "Agentarchitectuur",
                "Development"
            ]
        },
        {
            title: "Tech:",
            content: ["Python, LLMs", "Tool Calling, Google Places API"]
        }
    ],
    introText: "Een AI-agent die persoonlijke biervoorkeuren combineert met actuele Untappd-data om nieuwe bieren te ontdekken en complete kroegentochten samen te stellen. Met een eigen scoringsmodel en validatiesysteem zorgt de agent voor relevante en betrouwbare aanbevelingen.",
    splashImages: [
        { type: 'image', src: '/images/beer-agent/overview.jpg' },
    ],
    content: [
        {
            title: "Probleem",
            text: `Wanneer ik een nieuw bier wil proberen in een kroeg, moet ik eerst controleren of ik het al eerder heb gedronken. Dat betekent regelmatig zoeken in Untappd, waar je als je in een kroeg staat niet altijd zin in hebt. Hierdoor probeer ik soms onbewust bieren opnieuw. Ik wilde dit proces automatiseren en vooraf kunnen zien welke interessante bieren een kroeg aanbiedt.`,
        },
        {
            title: "Data & scoring",
            text: `De grootste uitdaging was het verzamelen van betrouwbare bierdata. Omdat lang niet alle kroegen hun bierkaart op Untappd publiceren, heb ik een alternatieve aanpak bedacht. Door de Untappd-pagina's van kroegen te scrapen, kan ik de check-infeed gebruiken om te achterhalen welke bieren daar recent zijn gedronken.
            Om de resultaten te rangschikken ontwikkelde ik een eigen scoringsmodel. Dit combineert mijn gemiddelde beoordeling voor een specifieke bierstijl met de waardering van de community. Daarnaast krijgt een bier een bonus wanneer het afkomstig is van een brouwerij die ik nog niet eerder heb geprobeerd.
            Ook de actualiteit speelt een rol: hoe langer geleden een bier is ingecheckt, hoe lager de score. Na 21 dagen wordt de kans klein geacht dat het bier nog beschikbaar is. Met kleurindicaties wordt deze verwachte beschikbaarheid direct inzichtelijk.`,
            media: { type: 'image', src: "/images/beer-agent/scoring.jpg" }
        },
        {
            title: "AI Agent & kroegentochten",
            text: `Met de verzamelde bierdata zag ik een mogelijkheid om het concept uit te breiden. De AI-agent kan nu ook complete kroegentochten samenstellen op basis van persoonlijke voorkeuren, het aantal kroegen en bieren en de onderlinge afstanden via de Google Places API.
            Een belangrijke uitdaging was de betrouwbaarheid van de agent. Omdat een LLM soms niet-bestaande kroegen of bieren kan verzinnen, heb ik een eigen validatie- en commit-systeem ontwikkeld. Bieren worden gecontroleerd of ze bij de gewenste kroeg ingechecked zijn.
            Ongeldige resultaten worden geweigerd, waarbij de agent feedback krijgt over de reden van afwijzing. Op basis daarvan kan hij een alternatief zoeken of een eerdere stap reverten. Pas na succesvolle validatie wordt een kroeg met zijn bieren aan de route toegevoegd.`,
              media: { type: 'video', src: "/videos/beerAgent.mp4", thumbnail: "/images/beer-agent/agent.jpg" }
        },
        {
            title: "Development",
            text: `Ik begon met het uitwerken van een interface in Figma om het concept en de gebruikerservaring vorm te geven. Vervolgens vertaalde ik het idee naar een technisch plan en een gestructureerde todo-lijst volgens spec-based programming.
            Met behulp van een coding agent heb ik de applicatie vervolgens iteratief ontwikkeld. Hierbij lag de focus niet alleen op het bouwen van de functionaliteit, maar ook op het betrouwbaar verzamelen, verwerken en valideren van data.`,
            media: { type: 'image', src: "/images/beer-agent/development.jpg" }
        }
    ]
}
