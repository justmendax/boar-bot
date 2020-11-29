const { MessageEmbed } = require("discord.js");
const { hostGuild } = require("../../bot.js");
const { waitInput } = require('../../functions.js');
const manea = require("manea");

module.exports = {
    name: "manea",
    category: "utils",
    description: "Sends a random manea :boar:",
    usage: "<type (veche, noua, populara)>",
    run: async (client, message, args) => {
        while(!args[0] || args[0] != "veche" || args[0] != "noua" || args[0] != "populara") {
            const valid = waitInput(message, module.exports.usage);
            if(!valid) {
                return module.exports.exceptCooldown = true;
            } else
                args[0] = valid;
        }
        const embed = new MessageEmbed()
            .setColor(client.guilds.cache.get(hostGuild).me.displayHexColor)
            .setTimestamp()
            .setAuthor(message.author.tag, message.author.avatarURL())
            .setFooter(client.user.username, client.user.avatarURL())
            .setTitle("Maneaua ta:")
            .addField(manea.iaManeaua(args[0]).name, manea.iaManeaua(args[0]).url);

        message.channel.send(embed);
    }
}