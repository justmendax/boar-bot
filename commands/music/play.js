const ytdl = require("ytdl-core");

module.exports = {
    name: "play",
    category: "music",
    description: "Plays a song you choose from YouTube",
    usage: "[query | url]",
    run: async (client, message, args) => {
        const voiceChannel = message.member.voiceChannel;

        if(!voiceChannel)
            return message.channel.send("You must be in a voice channel to play music!");
        const permissions = voiceChannel.permissionsFor(message.client.user);
        if(!permissions.has("CONNECT") || !permissions.has("SPEAK"))
            return message.channel.send("I need the permissions to join and speak in your voice channel!");
        const songInfo = await ytdl.getInfo(args[0]);
        const song = {
            title: songInfo.videoDetails.title,
            url: songInfo.videoDetails.video_url
        };

        if(!client.queue.get(message.guild.id)) {
            const queueConstruct = {
                textChannel: message.channel,
                voiceChannel: voiceChannel,
                connection: null,
                songs: [],
                volume: 5,
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
        .playOpusStream(ytdl(song.url))
        .on("finish", () => {
            queue.songs.shift();
            start(client, guild, queue.songs[0]);
        })
        .on("error", err => console.error(err));
    dispatcher.setVolumeLogarithmic(queue.volume / 5);
    queue.textChannel.send(`Started playing: **${song.title}**`);
}