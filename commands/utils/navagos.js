const { MessageEmbed } = require("discord.js");
const { hostGuild } = require("../../bot.js");

module.exports = {
    name: "navagos",
    category: "utils",
    description: "Shows a list of all Navagos playlists :boar:",
    run: async (client, message, args) => {
        const list = [["Atrocious Infinity and Sons", "https://www.youtube.com/playlist?list=PLzqWn1iG-DYsfXIvuLwI3gF2kutMrYFWd"], 
        ["Atrocious Infinity and Sons II", "https://www.youtube.com/playlist?list=PLrmsk9amz4tY1tG4k3AeXSbbBl9oicdyS"], 
        ["THE MOUTH - Uplifting Force I", "https://www.youtube.com/watch?v=teU-ZhfNLfE"],
	["THE MOUTH - Uplifting Force II (Blue Version)", "https://www.youtube.com/watch?v=KgEALk44pbg"],
	["THE MOUTH - Uplifting Force II (Red Version)", "https://www.youtube.com/watch?v=teQPo-vH7kI"],
	[`THE MOUTH - Uplifting Force II (Black "End-All" Version)`, "https://www.youtube.com/watch?v=aVDAaol8HEg"],
	["THE MOUTH - Uplifting Force III (Anthems of Destiny)", "https://www.youtube.com/watch?v=dnxEKE2xF84"],
	["THE MOUTH - Uplifting Force IV (Scroll of Resurrection)", "https://www.youtube.com/watch?v=VqED6GiTJJM"],
	["THE MOUTH - War Thunder: No Limit", "https://www.youtube.com/watch?v=iZw5WggrKrs"],
	["THE MOUTH - Cats and Mouse (SAPP/RL)", "https://www.youtube.com/watch?v=5bsI-L0MOEM"],
	["THE MOUTH - Heroes of Faith I", "https://www.youtube.com/watch?v=ORY_iWoLreY"],
	["Dunkler und anderer Berlin", "https://www.youtube.com/playlist?list=PLrmsk9amz4tbqvLScDApU9xdn_s8O3UZU"]];
        const embed = new MessageEmbed()
            .setColor(client.guilds.cache.get(hostGuild).me.displayHexColor)
            .setTimestamp()
            .setAuthor(message.author.tag, message.author.avatarURL())
            .setFooter(client.user.username, client.user.avatarURL())
            .setTitle("Navagos Playlists");
        
        list.forEach((arr) => {
            embed.addField(arr[0], arr[1]);
        });

        message.channel.send(embed);
    }
}