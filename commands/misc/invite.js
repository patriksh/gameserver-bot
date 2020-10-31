const Discord = require('discord.js');

module.exports = {
    name: 'invite',
    description: 'Sends bot invite URL.',
    usage: 'invite',
    aliases: [],
    permissions: [],
    botPermissions: ['SEND_MESSAGES'],
    nsfw: false,
    cooldown: 0,
    ownerOnly: true
}

module.exports.execute = async(bot, msg, args, data) => {
    let embed = new Discord.MessageEmbed()
        .setColor(bot.config.color)
        .setTitle('Invite me')
        .setURL(bot.config.inviteURL)
        .setDescription('Use this link to invite me to your server:\n\n' + bot.config.inviteURL);

    return msg.channel.send(embed);
}
