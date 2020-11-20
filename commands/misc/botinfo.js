const Discord = require('discord.js');

module.exports = {
    name: 'botinfo',
    description: 'Displays information about the bot.',
    usage: 'botinfo',
    aliases: ['stats', 'info', 'botstats'],
    permissions: [],
    botPermissions: [],
    nsfw: false,
    cooldown: 0,
    ownerOnly: false
}

module.exports.execute = async(bot, msg, args, data) => {
    let ping = Date.now() - msg.createdTimestamp;
    let guilds = bot.guilds.cache.size.toString();
    let users = bot.guilds.cache.reduce((a, g) => a + g.memberCount, 0).toString();

    let embed = new Discord.MessageEmbed()
        .setColor(bot.config.color)
        .setTitle(bot.user.username)
        .setThumbnail(bot.user.displayAvatarURL())
        .setDescription('Bot that allows you to show live information (map, players) about your gameservers (CoD, Minecraft, CS:GO & more).')
        .addFields(
            { name: 'Features', value: 'Show server players, map & more.\nSupport for 200+ games.\nUp to 15+ gameservers per guild.' },
            { name: 'Guilds', value: guilds.toLocaleLowerCase(), inline: true },
            { name: 'Users', value: users.toLocaleLowerCase(), inline: true },
            { name: 'Ping', value: ping + ' ms', inline: true },
            { name: 'Library', value: 'Discord.js 12', inline: true },
            { name: 'Creator', value: 'Defected#0001', inline: true },
        );

    return msg.channel.send(embed);
};
