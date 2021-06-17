const { MessageEmbed } = require("discord.js");
const { hostGuild } = require("../../bot.js");
const fs = require("fs");

module.exports = {
    name: "addnavagos",
    category: "utils",
    description: "Adds a playlist to the Navagos playlists :boar:",
    usage: "<position url title>",
    run: async (client, message, args) => {
        if (!args[0] || !args[1] || !args[2])
            message.channel.send(`Invalid argument! Run the command again with the following arguments: \`${usage}\`.`);

        const pos = args[0] - 1;
        const url = args[1];
        args.splice(0, 2);
        const title = args.join(" ");
        
        const obj = {
            title: title,
            url: url
        };

        var navagos = JSON.parse(fs.readFileSync("commands/utils/navagos.json"));
        var playlists = navagos.playlists;
        playlists.splice(pos, 0, obj);
        fs.writeFileSync("commands/utils/navagos.json", `{"playlists":${JSON.stringify(playlists)}}`);

        const embed = new MessageEmbed()
            .setColor(client.guilds.cache.get(hostGuild).me.displayHexColor)
            .setTimestamp()
            .setAuthor(message.author.tag, message.author.avatarURL())
            .setFooter(client.user.username, client.user.avatarURL())
            .setTitle(`${title} has been added to the Navagos Playlists in position ${pos + 1}.`);

        message.channel.send(embed);
    }
}