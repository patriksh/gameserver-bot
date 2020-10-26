const Discord = require('discord.js');

module.exports = {
    name: 'servers',
    description: 'List added gameservers.',
    usage: 'servers <game|optional>',
    aliases: ['list', 's'],
    permissions: [],
    botPermissions: ['SEND_MESSAGES'],
    nsfw: false,
    cooldown: 2000,
    ownerOnly: false
}

module.exports.execute = async(bot, msg, args, data) => {
    let game = args[0];
    let search = { guild: msg.guild.id };
    if(game !== undefined) search.game = game

    let serversDB = bot.data.getServerSchema();
    let servers = await serversDB.find(search).catch(err => {
        bot.logger.error('MongoDB server DB error - ' + err);
        return bot.embeds.dbError(msg);
    });

    let embed = new Discord.MessageEmbed()
        .setColor(bot.config.color)
        .setTitle('Servers');

    let stats = [];
    servers.forEach(server => {
        stats.push(bot.tools.status(server).then(response => {
            embed.addField(response.title, response.data);
        }));
    });

    await Promise.all(stats);

    return msg.channel.send(embed);
}
