const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");
const { toJson } = require("unsplash-js");
global.fetch = fetch;
const Unsplash = require('unsplash-js').default;
const { getMember } = require('../../functions');

module.exports = {
    name: "sendboar",
    category: "fun",
    description: "Sends a random picture of a boar to someone's DMs :boar:",
    usage: "<receiver>",
    cooldown: 72,
    run: async (client, message, args) => {
        if (!args[0]) {
            module.exports.cooldown = 0;
            return message.channel.send("You need to specify a user to send the boar picture to! :boar:")
                .then(m => m.delete(5000));
        }

        const accessKey = process.env.ACCESS_KEY;
        const unsplash = new Unsplash({ accessKey: accessKey });

        const receiver = getMember(message, args[0]);
        
        unsplash.photos.getRandomPhoto({ query: "boar"})
            .then(toJson)
            .then(json => {
                const embed = new MessageEmbed()
                    .setImage(json.urls.raw)
                    .setColor(client.guilds.get('714210875506032670').me.displayHexColor)
                    .setAuthor(`${json.user.name} (${json.user.username}) on Unsplash`, json.user.profile_image.large, json.user.links.html)
                    .setFooter(`instagram.com/${json.user.instagram_username}`, 'https://instagram-brand.com/wp-content/uploads/2016/11/Instagram_AppIcon_Aug2017.png?w=300')
                    .addField(`__${message.author.tag}__ sent you a random picture of a boar! :boar:`, `Sent from **${message.guild.name}** in channel **#${message.channel.name}**!`);
                receiver.send(embed);
            });
        
        const embed = new MessageEmbed()
            .setColor(client.guilds.get('714210875506032670').me.displayHexColor)
            .setTimestamp()
            .setAuthor(message.author.tag, message.author.avatarURL)
            .setFooter(client.user.username, client.user.avatarURL)
            .setTitle(`A random picture of a boar has been sent to __${receiver.user.tag}__! :boar:`);

        message.channel.send(embed);
        message.delete();
    }
}