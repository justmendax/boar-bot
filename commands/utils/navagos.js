const { MessageEmbed } = require("discord.js");
const { hostGuild } = require("../../bot.js");

module.exports = {
    name: "navagos",
    category: "utils",
    description: "Shows a list of all Navagos playlists :boar:",
    run: async (client, message, args) => {
        const list = [["Atrocious Infinity and Sons", "https://www.youtube.com/playlist?list=PLzqWn1iG-DYsfXIvuLwI3gF2kutMrYFWd"], 
        ["Atrocious Infinity and Sons II", "https://www.youtube.com/playlist?list=PLrmsk9amz4tY1tG4k3AeXSbbBl9oicdyS"], 
        ["Uplifting Force I", "https://www.youtube.com/watch?v=teU-ZhfNLfE"],
	["Uplifting Force II (Blue Version)", "https://www.youtube.com/watch?v=KgEALk44pbg"],
	["Uplifting Force II (Red Version)", "https://www.youtube.com/watch?v=teQPo-vH7kI"],
	[`Uplifting Force II (Black "End-All" Version)`, "https://www.youtube.com/watch?v=aVDAaol8HEg"],
	["Uplifting Force III (Anthems of Destiny)", "https://www.youtube.com/watch?v=dnxEKE2xF84"],
	["Uplifting Force IV (Scroll of Resurrection)", "https://www.youtube.com/watch?v=VqED6GiTJJM"],
	["Uplifting Force V (State of Transition)", "https://www.youtube.com/watch?v=0gMr-bqwI0k"],
	["War Thunder: No Limit", "https://www.youtube.com/watch?v=iZw5WggrKrs"],
	["Cats and Mouse (SAPP/RL)", "https://www.youtube.com/watch?v=5bsI-L0MOEM"],
	["Heroes of Faith I", "https://www.youtube.com/watch?v=ORY_iWoLreY"],
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