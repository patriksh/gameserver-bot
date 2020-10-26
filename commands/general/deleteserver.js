const Discord = require('discord.js');

module.exports = {
    name: 'help',
    description: 'Lists bot commands.',
    usage: 'help',
    aliases: ['commands', 'cmds'],
    permissions: [],
    botPermissions: ['SEND_MESSAGES'],
    nsfw: false,
    cooldown: 0,
    ownerOnly: false
}

module.exports.execute = async(bot, msg, args, data) => {
    let embed = new Discord.MessageEmbed()
        .setAuthor(bot.user.username + ' help', bot.user.displayAvatarURL())
        .setFooter(bot.config.credits)
        .setColor(bot.config.color);

    return msg.channel.send(embed);
}
