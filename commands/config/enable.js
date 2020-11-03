const { MessageEmbed } = require("discord.js");
const { commandArray } = require("../../handler/command.js");
var { enabled } = require("../../handler/command.js");
const { readdirSync } = require("fs");

module.exports = {
    name: "enable",
    category: "config",
    description: "Enables a command you enter",
    usage: "<command>",
    run: async (client, message, args) => {
        if (message.author.id !== '251758061981532162') {
            return message.channel.send(`Only ${message.member} can use this command!`)
                .then(m => m.delete(5000));
        }

        if (!args[0]) {
            return message.channel.send("Give me a command to enable you fucking retard.")
                .then(m => m.delete(5000));
        }

        if(!commandArray.some(cmd => cmd[0] === args[0] + ".js")) {
            return message.channel.send("That command doesn't exist, moron.")
                .then(m => m.delete(5000));
        }

        if(enabled[enabled.indexOf(args[0])]) {
            return message.channel.send("That command is already enabled, idiot.")
                .then(m => m.delete(5000));
        }

        readdirSync("./commands/").forEach(dir => {
            
            const commands = readdirSync(`./commands/${dir}/`).filter(f => f.endsWith(".js"));
    
            for (let file of commands) {
                let pull = require(`../${dir}/${file}`)

                if (pull.name === args[0]) {
                    client.commands.set(pull.name, pull);
                    enabled.push(pull.name);
                    break;
                }
            }
        });

        const embed = new MessageEmbed()
            .setColor(client.guilds.get('714210875506032670').me.displayHexColor)
            .setTimestamp()
            .setAuthor(message.author.tag, message.author.avatarURL)
            .setFooter(client.user.username, client.user.avatarURL)
            .setTitle(`The \`${args[0]}\` command has been enabled successfully! :boar:`);
        message.channel.send(embed);
    }
}

module.exports.commandArray = commandArray;
module.exports.enabled = enabled;