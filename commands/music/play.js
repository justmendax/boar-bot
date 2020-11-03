const ytdl = require("ytdl-core");
const sf = require("seconds-formater");

const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "play",
    category: "music",
    description: "Plays a song you choose from YouTube",
    usage: "[query | url]",
    run: async (client, message, args) => {
        const voiceChannel = message.member.voice.channel;
        var embed = new MessageEmbed()
            .setColor(client.guilds.cache.get('714210875506032670').me.displayHexColor)
            .addField("Oops!", "You **must** be in a **voice channel** to play music!")
            .setFooter(client.user.username, client.user.avatarURL)
            .setTimestamp();
        if(!voiceChannel)
            return message.channel.send(embed);

        embed = new MessageEmbed()
            .setColor(client.guilds.cache.get('714210875506032670').me.displayHexColor)
            .addField("Oops!", "I **need** the permissions to **join** and **speak** in your voice channel!")
            .setFooter(client.user.username, client.user.avatarURL)
            .setTimestamp();
        const permissions = voiceChannel.permissionsFor(message.client.user);
        if(!permissions.has("CONNECT") || !permissions.has("SPEAK"))
            return message.channel.send(embed);

        const songInfo = await ytdl.getInfo(args[0]);
        const song = {
            title: songInfo.videoDetails.title,
            url: songInfo.videoDetails.video_url,
            thumbnail: songInfo.videoDetails.thumbnail.thumbnails[1].url,
            length: songInfo.videoDetails.lengthSeconds,
            requesterNickname: message.member.nickname,
            requesterTag: message.member.user.tag
        };

        if(!client.queue.get(message.guild.id)) {
            const queueConstruct = {
                textChannel: message.channel,
                voiceChannel: voiceChannel,
                connection: null,
                songs: [],
                volume: 2.5,
                playing: true
            }
            client.queue.set(message.guild.id, queueConstruct);

            queueConstruct.songs.push(song);

            try {
                var connection = await voiceChannel.join();
                queueConstruct.connection = connection;
                start(client, message.guild, queueConstruct.songs[0]);
            } catch (err) {
                console.log(err);
                client.queue.delete(message.guild.id);
                return;
            }
        } else {
            client.queue.songs.push(song);
            return message.channel.send(`${song.title} has been added to the queue!`);
        }
    }
}

function start(client, guild, song) {
    const queue = client.queue.get(guild.id);
    if(!song) {
        queue.voiceChannel.leave();
        client.queue.delete(guild.id);
        return;
    }

    const dispatcher = queue.connection
        .play(ytdl(song.url))
        .on("start", () => {
            const now = Date.now();
            module.exports.currentSongStartTime = now;
        })
        .on("finish", () => {
            queue.songs.shift();
            start(client, guild, queue.songs[0]);
        })
        .on("error", err => console.error(err));
    dispatcher.setVolumeLogarithmic(queue.volume / 5);
    const embed = new MessageEmbed()
            .setColor(client.guilds.cache.get('714210875506032670').me.displayHexColor)
            .setTitle(song.title)
            .setURL(song.url)
            .setAuthor("Now Playing...", client.user.displayAvatarURL())
            .addField(`Requested by: ${song.requesterNickname} (${song.requesterTag})`, `*0:00 / ${song.length >= 3600 ? sf.convert(song.length).format('HH:MM:SS') : sf.convert(song.length).format('MM:SS')}*`)
            .setThumbnail(song.thumbnail)
            .setFooter(client.user.username, client.user.avatarURL)
            .setTimestamp();
    queue.textChannel.send(embed);
}