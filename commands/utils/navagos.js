const { MessageEmbed } = require("discord.js");
const { hostGuild } = require("../../bot.js");
const { Client } = require("pg");

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

        const db = new Client({
            connectionString: process.env.DATABASE_URL,
            ssl: {
                rejectUnauthorized: false
            }
        });

        db.connect();

        db.query('SELECT * FROM playlists', (err, res) => {
            if(err)
                throw err;
            else {
                res.rows.forEach(row => embed.addField(`${row.id}. ${row.title}`, row.url));
            }
        });

        db.end();
        message.channel.send(embed);
    }
}