const { MessageEmbed } = require("discord.js");
const { hostGuild } = require("../../bot.js");

module.exports = {
    name: "nasheed",
    category: "utils",
    description: "Shows a list of all Nasheed songs.",
    run: async (client, message, args) => {
        const list = [["Kun Faya Kun Full Video Song Rockstar | Ranbir Kapoor | A.R. Rahman, Javed Ali, Mohit Chauhan", "https://www.youtube.com/watch?v=T94PHkuydcw"],
        ["Naat Qaseeda Molana Anas Younus Mere Aqa Mery Mery Mola", "https://www.youtube.com/watch?v=jhGz2DUcKIo"],
        ["Maula Ya Salli Ft. Sami Yusuf Qasida Burda Shareef [NASHEED]", "https://www.youtube.com/watch?v=fvIWPFEZi_s"]];
        const embed = new MessageEmbed()
            .setColor(client.guilds.cache.get(hostGuild).me.displayHexColor)
            .setTimestamp()
            .setAuthor(message.author.tag, message.author.avatarURL())
            .setFooter(client.user.username, client.user.avatarURL())
            .setTitle("Nasheed Songs");
        
        list.forEach((arr) => {
            embed.addField(arr[0], arr[1]);
        });

        message.channel.send(embed);
    }
}