module.exports = async(bot, guild) => {
    let guildsDB = bot.data.getGuildSchema();
    let serversDB = bot.data.getServerSchema();

    await serversDB.deleteMany({ guild: guild.id });
    await guildsDB.deleteOne({ id: guild.id });
};
