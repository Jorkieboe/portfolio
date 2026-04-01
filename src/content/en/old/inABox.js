export default {
    projectTitle: "In a Box",
    projectType: "Game",
    introText: "In a Box is a work-in-progress puzzle-platform game where you play in a box that can rotate. Resulting in a change of gravity, so you must approach the puzzle from multiple dimensions.",
    content: [
        {
            title: "Game",
            text: `In a box is a work-in-progress puzzle-platform game I created. You play as a stuffed animal hedgehog, which belongs to the cobbler's son. He has a mysterious backroom where other cuddly toys disappear. One day, the hedgehog decides to enter that room and ends up stuck in a world of cardboard boxes. These boxes can rotate, which affects gravity. Your goal is to discover this world and free all stuffed animals.`,
            image: "/images/Inabox/conceptartRot.jpg"
        },
        {
            title: "Art Style",
            text: `The game takes place in the cobbler’s back room on a desk where he creates boxes for his son. Therefore, the boxes have a crafted look with paper textures. In this dark room, a light shines onto the box that represents a stage light. That moves the focus to the box where the game plays out.`,
            image: "/images/Inabox/boxroom.jpg"
        },
        {
            title: "Development",
            text: `The game was created in the Unreal Engine 5 with visual blueprint scripting. The challenge of this game was that UE5 doesn’t support other directions of gravity. That was partly fixable by using a plugin from the Unreal marketplace. However, I needed to remake some built-in features to support multiple gravity directions, like movement or pathfinding.`,
            image: "/images/Inabox/enemy.jpg"
        }
    ]
}