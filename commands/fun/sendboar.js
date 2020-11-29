const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");
const { toJson } = require("unsplash-js");
global.fetch = fetch;
const Unsplash = require('unsplash-js').default;
const { getMember, waitInput } = require('../../functions.js');
const { hostGuild } = require("../../bot.js");

module.exports = {
    name: "sendboar",
    category: "fun",
    description: "Sends a random picture of a boar to someone's DMs :boar:",
    usage: "<receiver>",
    cooldown: 72,
    exceptCooldown: false,
    run: async (client, message, args) => {
        if (!args[0]) {
            const valid = waitInput(message, module.exports.usage);
            if(!valid) {
                return module.exports.exceptCooldown = true;
            } else
                args[0] = valid;
        }
        const receiver = getMember(message, args[0]);
        const disabled = client.disabledBoar.get(receiver.id);
        if(disabled) {
            module.exports.exceptCooldown = true;
            const embed = new MessageEmbed()
                .setColor(client.guilds.cache.get(hostGuild).me.displayHexColor)
                .setTimestamp()
                .setAuthor(message.author.tag, message.author.avatarURL())
                .setFooter(client.user.username, client.user.avatarURL())
                .setTitle(`A random picture of a boar could not be sent to __${receiver.user.tag}__ because they toggled the ability to receive them! :boar:`);
            return message.channel.send(embed);
        }
        var kill = false;

        const accessKey = process.env.ACCESS_KEY;
        const unsplash = new Unsplash({ accessKey: accessKey });
        
        await unsplash.photos.getRandomPhoto({ query: "boar"})
            .then(toJson)
            .then(async (json) => {
                    const embed = new MessageEmbed()
                        .setImage(json.urls.raw)
                        .setColor(client.guilds.cache.get(hostGuild).me.displayHexColor)
                        .setAuthor(`${json.user.name} (${json.user.username}) on Unsplash`, json.user.profile_image.large, json.user.links.html)
                        .setFooter(`instagram.com/${json.user.instagram_username}`, 'https://instagram-brand.com/wp-content/uploads/2016/11/Instagram_AppIcon_Aug2017.png?w=300')
                        .addField(`__${message.author.tag}__ sent you a random picture of a boar! :boar:`, `Sent from **${message.guild.name}** in channel **#${message.channel.name}**!`);
                    const failEmbed = new MessageEmbed()
                        .setColor(client.guilds.cache.get(hostGuild).me.displayHexColor)
                        .setTimestamp()
                        .setAuthor(message.author.tag, message.author.avatarURL())
                        .setFooter(client.user.username, client.user.avatarURL())
                        .setTitle(`A random picture of a boar could not be sent to __${receiver.user.tag}__ because they don't accept DMs or blocked me! :boar:`);

                    await receiver.send(embed).catch(() => { message.channel.send(failEmbed); kill = true; return; });
                });
        
        if (kill)
            return;
        
        const embed = new MessageEmbed()
            .setColor(client.guilds.cache.get(hostGuild).me.displayHexColor)
            .setTimestamp()
            .setAuthor(message.author.tag, message.author.avatarURL())
            .setFooter(client.user.username, client.user.avatarURL())
            .setTitle(`A random picture of a boar has been sent to __${receiver.user.tag}__! :boar:`);

        message.channel.send(embed);
    }
}