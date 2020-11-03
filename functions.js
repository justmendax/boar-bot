require("dotenv").config();

module.exports = {
    updatePresence: function(client) {
        return client.user.setPresence({
        activity: {
		name: `${client.guilds.cache.size} guilds. (v${process.env.VERSION})`,
		type: 'WATCHING'
	},
	status: "online"
        });
    },

    getMember: function(message, toFind = '') {
        toFind = toFind.toLowerCase();

        let target = message.guild.members.cache.get(toFind);

        if (!target && message.mentions.members)
            target = message.mentions.members.first();
        
        if (!target && toFind) {
            target = message.guild.members.cache.find(member => {
                return member.displayName.toLowerCase().includes(toFind) || member.user.tag.toLowerCase().includes(toFind);
            });
        }
        
        if (!target)
            target = message.member;

        return target;
    },

    formatDate: function(date) {
        return new Intl.DateTimeFormat('en-US').format(date);
    },

    waitInput: function(message, usage) {
        message.channel.send(`You need to send the following parameter: \`${usage}\`. You have 10 seconds to send it below this message, or write \`cancel\` to cancel the command, before it automatically cancels! :boar:`)
            .then(msg => message.channel.awaitMessages(m => m.author.id === message.author.id, { max: 1, time: 10000, errors: ['time'] })
                .then(received => {
                    if(received[0].content == "cancel") {
                        message.channel.send("Command cancelled!");
                        msg.delete();
                        return false;
                    } else return received[0];
                }).catch(() => {
                    message.channel.send("Command cancelled!");
                    msg.delete();
                    return false;
                }));
    }
}