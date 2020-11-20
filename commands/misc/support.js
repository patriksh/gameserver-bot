const Discord = require('discord.js');

module.exports = {
    name: 'support',
    description: 'Sends support server invite URL.',
    usage: 'support',
    aliases: ['bug', 'error', 'suggest'],
    permissions: [],
    botPermissions: [],
    nsfw: false,
    cooldown: 0,
    ownerOnly: false
}

module.exports.execute = async(bot, msg, args, data) => {
    let embed = new Discord.MessageEmbed()
        .setColor(bot.config.color)
        .setTitle('Support server')
        .setURL(bot.config.supportURL)
        .setDescription('Have suggestions or found bugs? Tell it on my support server:\n\n' + bot.config.supportURL);

    return msg.channel.send(embed);
}
