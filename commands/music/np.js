const { MessageEmbed } = require("discord.js");
const sf = require("seconds-formater");
const { currentSongStartTime } = require("./play");

module.exports = {
    name: "np",
    aliases: ['nowplaying'],
    category: "music",
    description: "Shows the currently playing song",
    run: async (client, message, args) => {
        const queue = client.queue.get(message.guild.id);
        if(!queue.playing || !queue) {
            const embed = new MessageEmbed()
                .setColor(client.guilds.cache.get('714210875506032670').me.displayHexColor)
                .setAuthor("Nothing is playing right now!", client.user.displayAvatarURL())
                .setFooter(client.user.username, client.user.avatarURL)
                .setTimestamp();
            message.channel.send(embed);
        } else {
            const song = queue.songs[0];
            message.channel.send(currentSongStartTime + " " + Date.now());
            const embed = new MessageEmbed()
                .setColor(client.guilds.cache.get('714210875506032670').me.displayHexColor)
                .setTitle(song.title)
                .setURL(song.url)
                .setAuthor("Now Playing...", client.user.displayAvatarURL())
                .addField(`Requested by: ${song.requesterNickname} (${song.requesterTag})`, `*${songCur >= 3600 ? sf.convert(songCur).format('HH:MM:SS') : sf.convert(songCur).format('MM:SS')} / ${song.length >= 3600 ? sf.convert(song.length).format('HH:MM:SS') : sf.convert(song.length).format('MM:SS')}*`)
                .setThumbnail(song.thumbnail)
                .setFooter(client.user.username, client.user.avatarURL)
                .setTimestamp();
            message.channel.send(embed);
        }
    }
}