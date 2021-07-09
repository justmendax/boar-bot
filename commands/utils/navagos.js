const { MessageEmbed } = require("discord.js");
const { hostGuild } = require("../../bot.js");
const { Pool } = require("pg");

module.exports = {
    name: "navagos",
    category: "utils",
    description: "Shows a list of all Navagos playlists :boar:",
    run: async (client, message, args) => {
        const embed = new MessageEmbed()
            .setColor(client.guilds.cache.get(hostGuild).me.displayHexColor)
            .setTimestamp()
            .setAuthor(message.author.tag, message.author.avatarURL())
            .setFooter(client.user.username, client.user.avatarURL())
            .setTitle("Navagos Playlists");

        const pool = new Pool({
            connectionString: process.env.DATABASE_URL,
            ssl: {
                rejectUnauthorized: false
            }
        });

        const res = await pool.query('SELECT * FROM playlists ORDER BY id ASC;');
        await pool.end();

        res.rows.forEach(row => embed.addField(`${row.id}. ${row.title}`, row.url));

        message.channel.send(embed)
    }
}