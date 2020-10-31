const Discord = require('discord.js');
const Num2Emoji = require('number-to-emoji');

module.exports = {
    name: 'deleteserver',
    description: 'Delete a gameserver.',
    usage: 'delete <name>',
    aliases: ['delete', 'd'],
    permissions: ['ADMINISTRATOR'],
    botPermissions: ['SEND_MESSAGES'],
    nsfw: false,
    cooldown: 500,
    ownerOnly: false
}

module.exports.execute = async(bot, msg, args, data) => {
    let name = args.join(' ').trim();
    if(name == '')
        return bot.embeds.cmdError(msg, 'Server name can\'t be empty.', module.exports);

    let serversDB = bot.data.getServerSchema();
    let servers = await serversDB.find({ name: { $regex: name, $options: 'i' }, guild: msg.guild.id }).limit(10).catch(err => {
        bot.logger.error('MongoDB server DB error - ' + err);
        return bot.embeds.dbError(msg);
    });

    if(!servers.length)
        return bot.embeds.cmdError(msg, 'No servers found for query `' + name + '`.', module.exports);

    if(servers.length > 1) {
        let embed = new Discord.MessageEmbed()
            .setColor(bot.config.color)
            .setTitle('Multiple servers found')
            .setDescription('I found multiple servers for query `' + name + '`.\nPick a server to delete by reacting.');

        let embed_servers = '';
        servers.forEach((server, key) => {
            let i = key + 1;
            embed_servers += '**' + i + '**) ' + server.name + '\n';
        });
        embed.addField('Servers', embed_servers);

        msg.channel.send(embed).then(m => {
            servers.forEach((server, key) => m.react(Num2Emoji.toEmoji(key + 1)));

            let filter = (reaction, user) => user.id == msg.author.id && parseFloat(Num2Emoji.fromEmoji(reaction.emoji.name)) > 0;
            m.awaitReactions(filter, { max: 1, time: 30000 }).then(collected => {
                let num = Num2Emoji.fromEmoji(collected.first().emoji.name);
                let server = servers[num - 1];

                if(server) {
                    serversDB.deleteOne({ id: server.id }).then(() => {
                        m.reactions.removeAll();
                        let embed = new Discord.MessageEmbed()
                            .setColor(bot.config.color)
                            .setTitle('Server deleted')
                            .setDescription('Successfully deleted `' + server.name + '`.');
                        return m.edit(embed);
                    }).catch(err => {
                        bot.logger.error('MongoDB server DB error - ' + err);
                        return bot.embeds.dbError(msg);
                    });
                } else {
                    return bot.embeds.dbError(msg);
                }
            }).catch(() => {
                m.reactions.removeAll();
                let embed = new Discord.MessageEmbed()
                    .setColor(bot.config.color)
                    .setTitle('Server delete cancelled')
                    .setDescription('No reaction after 30 seconds.');
                return m.edit(embed);
            });
        });
    } else {
        await serversDB.deleteOne({ id: servers[0].id }).catch(err => {
            bot.logger.error('MongoDB server DB error - ' + err);
            return bot.embeds.dbError(msg);
        });

        let embed = new Discord.MessageEmbed()
            .setColor(bot.config.color)
            .setTitle('Server deleted')
            .setDescription('Successfully deleted `' + servers[0].name + '`.');
        return msg.channel.send(embed);
    }
}
