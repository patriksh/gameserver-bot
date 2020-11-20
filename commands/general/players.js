const Discord = require('discord.js');

module.exports = {
    name: 'players',
    description: 'Show server players.',
    usage: 'players <server>',
    aliases: ['p'],
    permissions: [],
    botPermissions: [],
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
            let stats = [];
            servers.forEach(server => {
                stats.push(bot.tools.players(server).then(response => {
                    let embed = new Discord.MessageEmbed()
                        .setColor(bot.config.color)
                        .setTitle(response.title)
                        .setDescription(response.data);

                    if(response.names.length) {
                        embed.addField('Name', response.names, true);
                        if(response.frags.length) embed.addField('Frags', response.frags, true);
                        if(response.pings.length) embed.addField('Ping', response.pings, true);
                    }

                    msg.channel.send(embed);
                }));
            });

            await Promise.all(stats);
            m.delete();
        } else {
            let server = servers[0];
            await bot.tools.players(server).then(response => {
                let embed = new Discord.MessageEmbed()
                    .setColor(bot.config.color)
                    .setTitle(response.title)
                    .setDescription(response.data);
                if(response.names.length) {
                    embed.addField('Name', response.names, true);
                    if(response.frags.length) embed.addField('Frags', response.frags, true);
                    if(response.pings.length) embed.addField('Ping', response.pings, true);
                }

                msg.channel.send(embed);
            });

            m.delete();
        }
    });
}
