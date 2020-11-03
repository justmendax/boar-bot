const { Client, MessageEmbed, Collection } = require("discord.js");
const { updatePresence } = require("./functions.js");
const { commandArray } = require("./handler/command.js");
require("dotenv").config();
const fs = require("fs");

const client = new Client({
    disableEveryone: true
})

var prefix = process.env.PREFIX;
module.exports.prefix = prefix;

client.commands = new Collection();
client.aliases = new Collection();
client.categories = fs.readdirSync("./commands/");
client.activated = new Collection();
client.queue = new Collection();
client.disabledBoar = new Collection();

["command"].forEach(handler => {
    require(`./handler/${handler}`)(client);
})

client.on("ready", () => {
    console.log(`[*] Client is ready as ${client.user.username}!`);

    const embed = new MessageEmbed()
        .setColor(client.guilds.cache.get('714210875506032670').me.displayHexColor)
        .addField(`Bot __*${client.user.username}*__ loaded sucessfully! <:boarparty:738805789371924500>`, `**Prefix: \`${prefix}\`\n\nCommand status:**`)
        .setFooter(client.user.username, client.user.avatarURL)
        .setTimestamp();

    commandArray.forEach(c => {
        embed.addField(c[0], c[1] === true ? '✅' : '❌')
    });

    client.channels.cache.get('737267251916308562').send(embed);
    updatePresence(client);
});

client.on('guildCreate', (guild) => {
    console.log(`[+] Guild '${guild.name}' added (ID: ${guild.id}, Owner: ${guild.owner.user.tag} / ${guild.ownerID}).`);
    updatePresence(client);
});

client.on('guildDelete', (guild) => {
    console.log(`[-] Guild '${guild.name}' removed (ID: ${guild.id}, Owner: ${guild.owner.user.tag} / ${guild.ownerID}).`);
    updatePresence(client);
});

client.on("message", async message => {
    if (message.author.bot || !message.guild || !message.content.startsWith(prefix)) 
        return;
    if (!message.member) 
        message.member = await message.guild.fetchMember(message);

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();

    if (cmd.length == 0) return;

    let command = client.commands.get(cmd);
    if (!command)
        command = client.commands.get(client.aliases.get(cmd));

    if (command && command.cooldown && command.exceptCooldown == false) {
        const trigger = client.activated.get(command.name);
        const now = Date.now();
        if (typeof trigger == 'undefined') {
            client.activated.set(command.name, now);
        } else {
            const left = ((trigger + command.cooldown * 1000 - now) / 1000).toFixed(1);
            const embed = new MessageEmbed()
                .setColor(client.guilds.cache.get('714210875506032670').me.displayHexColor)
                .addField('Too fast! <:boarconfounded:738805584807067789>', `Please wait ${left} more second(s) before reusing the \`${command.name}\` command.`)
                .setFooter(client.user.username, client.user.avatarURL)
                .setTimestamp();
            return message.channel.send(embed);
        }
    }

    if (command) {
        command.run(client, message, args);
        setTimeout(() => client.activated.delete(command.name), command.cooldown * 1000);
    }
})

client.login(process.env.TOKEN);