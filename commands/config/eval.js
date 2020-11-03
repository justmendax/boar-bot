const { MessageEmbed } = require("discord.js");
const beautify = require("beautify");

module.exports = {
    name: "eval",
    category: "config",
    aliases: ["e"],
    description: "Evaluates the code you put in",
    usage: "<code>",
    run: async (client, message, args) => {
        if (message.author.id !== '251758061981532162') {
            return message.channel.send(`Only ${message.member} can use this command!`)
                .then(m => m.delete(5000));
        }

        if (!args[0]) {
            return message.channel.send("Give me some code to evaluate you fucking retard.")
                .then(m => m.delete(5000));
        }

        try {
            if (args.join(" ").toLowerCase().includes("token")) {
                message.channel.send("You tried. <:boarclown:757318812637855784>")
                    .then(m => m.delete(5000));
                return;
            }

            const toEval = args.join(" ");
            const evaluated = eval(toEval);

            let embed = new MessageEmbed()
                .setColor("GREEN")
                .setTimestamp()
                .setFooter(client.user.username, client.user.avatarURL)
                .setTitle("Eval")
                .addField("To evaluate:", `\`\`\`js\n${beautify(args.join(" "), { format: "js" })}\n\`\`\``)
                .addField("Evaluated:", evaluated)
                .addField("Type of:", typeof(evaluated));

            message.channel.send(embed);
        } catch (e) {
            let embed = new MessageEmbed()
                .setColor("RED")
                .setTimestamp()
                .setFooter(client.user.username, client.user.avatarURL)
                .setTitle(":x: Error!")
                .setDescription(e)
            
            message.channel.send(embed);
        }
    }
}