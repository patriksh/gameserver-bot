const Discord = require('discord.js');

module.exports = {
    name: 'announce',
    description: 'Send an announcement to all guilds.',
    usage: 'announce',
    aliases: [],
    permissions: [],
    botPermissions: [],
    nsfw: false,
    cooldown: 0,
    ownerOnly: true
}

module.exports.execute = async(bot, msg, args, data) => {
    let count = 0;
    bot.guilds.cache.forEach(guild => {
        id = guild.channels.cache.find(c => c.type === 'text' && c.permissionsFor(guild.me).has('SEND_MESSAGES')).id;
        if(id !== null) {
            let channel = bot.channels.cache.get(id);
            if(channel) {
                let embed = new Discord.MessageEmbed()
                    .setColor(bot.config.color)
                    .setTitle(bot.user.username + ' news')
                    .setDescription(args.join(' '));

                if(channel.send(embed)) count++;
            }
        }
    });

    return msg.channel.send('Announcement sent to ' + count + ' guilds.');
}
