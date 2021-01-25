const Discord = require('discord.js');

module.exports = {
    name: 'announce',
    description: 'Announce stuff',
    usage: 'announce <stuff>',
    aliases: [],
    permissions: [],
    botPermissions: [],
    nsfw: false,
    cooldown: 500,
    ownerOnly: false
}

module.exports.execute = async(msg, args, bot) => {
    let count = 0;
    bot.guilds.cache.forEach(guild => {
        let id = guild.channels.cache.find(c => c.type === 'text' && c.permissionsFor(guild.me).has('SEND_MESSAGES')).id;
        if(id !== null) {
            let channel = bot.channels.cache.get(id);
            if(channel) {
                let embed = new Discord.MessageEmbed()
                    .setColor(bot.config.color)
                    .setTitle('GameserverBot news')
                    .setDescription(args.join(' '))
                    .setFooter('GameserverBot v1.0');

                count++;
                if(channel.send(embed)) count++;
            }
        }
    });

    msg.channel.send('Announcement sent to ' + count + ' guilds.');
}
