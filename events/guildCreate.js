const Discord = require('discord.js');

module.exports = async(bot, guild) => {
    let prefix = bot.config.prefix;
    let embed = new Discord.MessageEmbed()
        .setColor(bot.config.color)
        .setTitle('GameserverBot is here!')
        .setDescription('<:gsbot_online:771782245589581884> Welcome to GameserverBot v1.0.\n\nHere are some commands you\'ll need to set me up.')
        .addFields(
            { name: 'Add a server', value: '`' + prefix + 'addserver <game> <ip:port> <name>`' },
            { name: 'Show server status', value: '`' + prefix + 'server <name>`' },
            { name: 'Change the prefix', value: '`' + prefix + 'prefix <prefix>`' },
            { name: 'See more', value: '`' + prefix + 'help`' },
        )
        .setFooter(bot.config.credits);
    let channel = guild.channels.cache.find(channel => channel.type === 'text' && channel.permissionsFor(guild.me).has('SEND_MESSAGES'));
    return channel.send(embed);
};
