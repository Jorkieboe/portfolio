export default {
    projectTitle: "Begrijpend Biased",
    projectType: "Serious game",
    introText: "Begrijpend biased is a serious games that lets high school students look critically at news on social media in Dutch lessons. Students compile news reports and asses those of others for certain biases in the message. That will teach young people to recognize how such news reports are biased toward a particular opinion.",
    content: [
        {
            title: "Problem",
            text: `Young people are more likely to read their news on social media instead of traditional newspapers or TV outlets. The problem with news on social media platforms like Instagram is the tendency to be short and respond to emotions. Furthermore, the selection of the information creates a frame that puts a message in a certain light. It creates an easy opportunity for confirmation bias to kick in. That is a type of bias in which people are more likely to absorb information that confirms their opinion and block other information that contradicts their opinion. In combination with the algorithm, this puts you in a bubble.`,
            image: "/images/begrijpendbiased/gedragVeran.jpg"
        },
        {
            title: "Concept",
            text: `Begrijpend bias is a serious game that lets high school students look critically at news reports on social media. Students play against each other in groups of four. Every student must compile a news report consisting of an image, headline, and text according to a statement. After that, the student must assess the report of the other players and pick the correct statement. The game consists of multiple rounds in which the teacher explains reading strategies in between to understand the biases even better. This approach will force students to be critical of news reports and read them from the writers' and readers' perspectives.`,
            image: "/images/begrijpendbiased/IMG_2487.jpg"
        },
        {
            title: "Development",
            text: `The application uses the javascript library: Phaser 3 with websockets for the multiplayer functionality. Websockets is a general server, but that could be a problem in classrooms where the groups will play simultaneously. Therefore, we used game codes to separate the different groups. The codes will help to send the compiled reports to the players within a group. Above that is a general lobby for the whole class. So the teacher can control the course of the game and teach the reading strategies.`,
            image: "/images/begrijpendbiased/screens.jpg"
        }
    ]
}