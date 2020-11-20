const Discord = require('discord.js');

module.exports = {
    name: 'guilds',
    description: 'Show the guilds the bot is in.',
    usage: 'guilds',
    aliases: [],
    permissions: [],
    botPermissions: [],
    nsfw: false,
    cooldown: 0,
    ownerOnly: true
}

module.exports.execute = async(bot, msg, args, data) => {
    let description = '';
    let count = 0;
    bot.guilds.cache.forEach((guild) => {
        description += '• ' + guild.name + '\n';
        count++;
    });

    let embed = new Discord.MessageEmbed()
        .setColor(bot.config.color)
        .setTitle('Guilds (' + count + ')')
        .setDescription(description);
    return msg.channel.send(embed);
}
