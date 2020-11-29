const { MessageEmbed } = require("discord.js");
const { hostGuild } = require("../../bot.js");

module.exports = {
    name: "toggleboar",
    category: "fun",
    description: "Toggles the ability of receiving boars in your DMs :boar:",
    run: async (client, message, args) => {
        const disabled = client.disabledBoar.get(message.author.id);
        var m = "";
        if(disabled) {
            client.disabledBoar.delete(message.author.id);
            m = "You will start receiving boars in your DMs again! :boar:";
        } else {
            client.disabledBoar.set(message.author.id, true);
            m = "You will no longer receive boars in your DMs! :boar:";
        }
        
        const embed = new MessageEmbed()
            .setColor(client.guilds.cache.get(hostGuild).me.displayHexColor)
            .setTitle(m)
            .setFooter(client.user.username, client.user.avatarURL())
            .setTimestamp();
        message.channel.send(embed);
    }
}