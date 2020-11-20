const Discord = require('discord.js');

module.exports = {
    name: 'servers',
    description: 'List added gameservers.',
    usage: 'servers <game|optional>',
    aliases: ['list', 's'],
    permissions: [],
    botPermissions: [],
    nsfw: false,
    cooldown: 2000,
    ownerOnly: false
}

module.exports.execute = async(bot, msg, args, data) => {
    let game = args[0];
    let search = { guild: msg.guild.id };
    if(game !== undefined) search.game = game

    let prefix = !data.guild.prefix ? bot.config.prefix : data.guild.prefix;

    let embed = new Discord.MessageEmbed()
        .setColor(bot.config.color)
        .setTitle('Loading...')
        .setDescription('Querying the servers for info.');
    msg.channel.send(embed).then(async m => {
        let serversDB = bot.data.getServerSchema();
        let servers = await serversDB.find(search).catch(err => {
            bot.logger.error('MongoDB server DB error - ' + err);
            return bot.embeds.dbError(msg);
        });

        let embed = new Discord.MessageEmbed()
            .setColor(bot.config.color)
            .setTitle('Servers (' + servers.length + ')');

        let stats = [];
        servers.forEach(server => {
            stats.push(bot.tools.status(server).then(response => {
                embed.addField(response.title, response.data);
            }));
        });

        if(!servers.length) {
            embed.setDescription('No servers added.');
            embed.setFooter('Tip: use ' + prefix + 'add <game> <host> <name> to add a server.')
        }

        await Promise.all(stats);
        m.edit(embed);
    });
}
