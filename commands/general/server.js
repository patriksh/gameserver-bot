const Discord = require('discord.js');

module.exports = {
    name: 'server',
    description: 'Show info about a server.',
    usage: 'server <name>',
    aliases: ['s'],
    permissions: [],
    botPermissions: ['SEND_MESSAGES'],
    nsfw: false,
    cooldown: 2000,
    ownerOnly: false
}

module.exports.execute = async(bot, msg, args, data) => {
    let name = args.join(' ').trim();
    if(name == '')
        return bot.embeds.cmdError(msg, 'Server name can\'t be empty.', module.exports);

    let serversDB = bot.data.getServerSchema();
    let servers = await serversDB.find({ name: { $regex: name, $options: 'i' }, guild: msg.guild.id }).catch(err => {
        bot.logger.error('MongoDB server DB error - ' + err);
        return bot.embeds.dbError(msg);
    });

    if(!servers.length)
        return bot.embeds.cmdError(msg, 'No servers found for query `' + name + '`.', module.exports);

    let embed = new Discord.MessageEmbed()
        .setColor(bot.config.color)
        .setTitle('Loading...')
        .setDescription('Querying the servers for info.');
    msg.channel.send(embed).then(async m => {
        if(servers.length > 1) {
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
            m.edit(embed);
        } else {
            let embed = new Discord.MessageEmbed()
                .setColor(bot.config.color);
            await bot.tools.status(servers[0]).then(response => {
                embed.setTitle(response.title);
                embed.setDescription(response.data);
            })
            m.edit(embed);
        }
    });
}
