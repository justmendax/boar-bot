const { MessageEmbed } = require("discord.js");
const { hostGuild } = require("../../bot.js");
const { Pool } = require("pg");

module.exports = {
    name: "addnavagos",
    category: "utils",
    description: "Adds a playlist to the Navagos playlists :boar:",
    usage: "<position url title>",
    run: async (client, message, args) => {
        if (!args[0] || isNaN(args[0]) || !args[1] || !args[2])
            return message.channel.send(`Invalid argument! Run the command again with the following arguments: \`${module.exports.usage}\`.`);

        var pos = parseInt(args[0]);
        if (pos < 1)
            return message.channel.send(`Invalid position! Run the command again with a proper position.`);
        const url = args[1];
        args.splice(0, 2);
        const title = args.join(" ");

        const pool = new Pool({
            connectionString: process.env.DATABASE_URL,
            ssl: {
                rejectUnauthorized: false
            }
        });
        const maxQuery = await pool.query('SELECT COUNT(*) FROM playlists;');
        const max = parseInt(maxQuery.rows[0].count);
        await pool.query('UPDATE playlists SET id = id + 1 WHERE id >= $1;', [pos]);
        if(pos > max)
            pos = max + 1;
        await pool.query('INSERT INTO playlists VALUES ($1, $2, $3);', [pos, title, url]);

        await pool.end();

        const embed = new MessageEmbed()
            .setColor(client.guilds.cache.get(hostGuild).me.displayHexColor)
            .setTimestamp()
            .setAuthor(message.author.tag, message.author.avatarURL())
            .setFooter(client.user.username, client.user.avatarURL())
            .setTitle(`${title} has been added to the Navagos Playlists in position ${pos}.`);

        message.channel.send(embed);
    }
}