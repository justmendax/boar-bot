module.exports = {
    name: "nasheed",
    category: "fun",
    description: "Sends random nasheed :boar:",
    run: async (client, message, args) => {
        const nasheed = ["https://www.youtube.com/watch?v=T94PHkuydcw", "https://www.youtube.com/watch?v=jhGz2DUcKIo", "https://www.youtube.com/watch?v=fvIWPFEZi_s"];
        const random = nasheed[Math.floor(Math.random() * nasheed.length)]
        message.channel.send(random);
    }
}