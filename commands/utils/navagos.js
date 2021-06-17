const { MessageEmbed } = require("discord.js");
const { hostGuild } = require("../../bot.js");
const fs = require("fs");

module.exports = {
    name: "navagos",
    category: "utils",
    description: "Shows a list of all Navagos playlists :boar:",
    run: async (client, message, args) => {
        const navagos = JSON.parse(fs.readFileSync("commands/utils/navagos.json"));
        const embed = new MessageEmbed()
            .setColor(client.guilds.cache.get(hostGuild).me.displayHexColor)
            .setTimestamp()
            .setAuthor(message.author.tag, message.author.avatarURL())
            .setFooter(client.user.username, client.user.avatarURL())
            .setTitle("Navagos Playlists");
        
        navagos.playlists.forEach((obj) => {
            embed.addField(obj.title, obj.url);
        });

        message.channel.send(embed);
    }
}