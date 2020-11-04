module.exports = {
    name: "test",
    category: "config",
    description: "Test",
    run: async (client, message, args) => {
        message.channel.send(message.guild.members.fetch({ query: "luna", limit: 1 }).displayName);
    }
}