const { MessageEmbed } = require("discord.js");
const { hostGuild } = require("../../bot.js");
const fs = require("fs");

module.exports = {
    name: "removenavagos",
    category: "utils",
    description: "Removes a playlist from the Navagos playlists :boar:",
    usage: "<position>",
    run: async (client, message, args) => {
        if (!args[0] || isNaN(args[0]))
            message.channel.send(`Invalid argument! Run the command again with the following argument: \`${usage}\`.`);

        const pos = args[0] - 1;

        var navagos = JSON.parse(fs.readFileSync("commands/utils/navagos.json"));
        var playlists = navagos.playlists;
        const title = playlists[pos].title;
        playlists.splice(pos, 1);
        fs.writeFileSync("commands/utils/navagos.json", `{"playlists":${JSON.stringify(playlists)}}`);

        const embed = new MessageEmbed()
            .setColor(client.guilds.cache.get(hostGuild).me.displayHexColor)
            .setTimestamp()
            .setAuthor(message.author.tag, message.author.avatarURL())
            .setFooter(client.user.username, client.user.avatarURL())
            .setTitle(`${title} has been removed from the Navagos Playlists in position ${pos + 1}.`);

        message.channel.send(embed);
    }
}