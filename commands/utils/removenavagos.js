const { MessageEmbed } = require("discord.js");
const { hostGuild } = require("../../bot.js");
const { Pool } = require("pg");

module.exports = {
    name: "removenavagos",
    category: "utils",
    description: "Removes a playlist from the Navagos playlists :boar:",
    usage: "<position>",
    run: async (client, message, args) => {
        if (!args[0] || isNaN(args[0]))
            return message.channel.send(`Invalid argument! Run the command again with the following argument: \`${module.exports.usage}\`.`);

        const pos = parseInt(args[0]);

        const pool = new Pool({
            connectionString: process.env.DATABASE_URL,
            ssl: {
                rejectUnauthorized: false
            }
        });

        const maxQuery = await pool.query('SELECT COUNT(*) FROM playlists;');
        const max = parseInt(maxQuery.rows[0].count);
        if (pos > max || pos < 1)
            return message.channel.send(`Invalid position! Run the command again with a proper position.`);

        const playlist = await pool.query('SELECT * FROM playlists WHERE id = $1;', [pos]);
        const title = playlist.rows[0].title;
        await pool.query('DELETE FROM playlists WHERE id = $1;', [pos]);
        await pool.query('UPDATE playlists SET id = id - 1 WHERE id > $1;', [pos]);

        const embed = new MessageEmbed()
            .setColor(client.guilds.cache.get(hostGuild).me.displayHexColor)
            .setTimestamp()
            .setAuthor(message.author.tag, message.author.avatarURL())
            .setFooter(client.user.username, client.user.avatarURL())
            .setTitle(`${title} has been removed from the Navagos Playlists in position ${pos}.`);

        message.channel.send(embed);
    }
}