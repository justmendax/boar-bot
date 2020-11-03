const { MessageEmbed } = require("discord.js");
const snekfetch = require('snekfetch');

module.exports = {
    name: "f1",
    category: "fun",
    description: "Sends a random picture from reddit.com/r/F1Porn :boar:",
    run: async (client, message, args) => {
        const { body } = await snekfetch
            .get('https://www.reddit.com/r/F1Porn.json?sort=top&t=month')
            .query({ limit: 800 });
        const allowed = message.channel.nsfw ? body.data.children : body.data.children.filter(post => !post.data.over_18);
        if (!allowed.length) return message.channel.send('It seems we are out of fresh posts... :boarconfounded: Try again later.');
        const randomnumber = Math.floor(Math.random() * allowed.length)

        const embed = new MessageEmbed()
            .setImage(allowed[randomnumber].data.url)
            .setTitle(allowed[randomnumber].data.title)
            .setColor(client.guilds.cache.get('714210875506032670').me.displayHexColor)
            .setAuthor(`${allowed[randomnumber].data.author} on Reddit`)
            .addField("Other info:", "Upvotes: " + allowed[randomnumber].data.ups + " / Comments: " + allowed[randomnumber].data.num_comments)
            .setFooter(`reddit.com/u/${allowed[randomnumber].data.author}`, 'https://www.redditinc.com/assets/images/site/reddit-logo.png');
        message.channel.send(embed);
    }
}