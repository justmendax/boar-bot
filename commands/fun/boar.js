const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");
const { toJson } = require("unsplash-js");
global.fetch = fetch;
const Unsplash = require('unsplash-js').default;
const { hostGuild } = require("../../bot.js");

module.exports = {
    name: "boar",
    category: "fun",
    description: "Displays a random picture of a boar :boar:",
    cooldown: 72,
    exceptCooldown: false,
    run: async (client, message, args) => {
        const accessKey = process.env.ACCESS_KEY;
        const unsplash = new Unsplash({ accessKey: accessKey });
        
        unsplash.photos.getRandomPhoto({ query: "boar"})
            .then(toJson)
            .then(json => {
                const embed = new MessageEmbed()
                    .setImage(json.urls.raw)
                    .setColor(client.guilds.cache.get(hostGuild).me.displayHexColor)
                    .setAuthor(`${json.user.name} (${json.user.username}) on Unsplash`, json.user.profile_image.large, json.user.links.html)
                    .setFooter(`instagram.com/${json.user.instagram_username}`, 'https://instagram-brand.com/wp-content/uploads/2016/11/Instagram_AppIcon_Aug2017.png?w=300');
                message.channel.send(embed);
            });
    }
}