module.exports = {
    name: "boarorigin",
    aliases: ['bo'],
    category: "fun",
    description: "Sends the livestream that started it all :boar:",
    run: async (client, message, args) => {
        message.channel.send("https://www.youtube.com/watch?v=2BDnAMR3GLg");
        message.delete();
    }
}