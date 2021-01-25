const Discord = require('discord.js');
const util = require('util');
const fs = require('fs');
const readdir = util.promisify(fs.readdir);

module.exports = {
    name: 'help',
    description: 'Lists bot commands.',
    usage: 'help',
    aliases: ['commands', 'cmds'],
    permissions: [],
    botPermissions: [],
    nsfw: false,
    cooldown: 0,
    ownerOnly: false
}

module.exports.execute = async(bot, msg, args, data) => {
    let prefix = !data.guild.prefix ? bot.config.prefix : data.guild.prefix;
    let embed = new Discord.MessageEmbed()
        .setColor(bot.config.color)
        .setTitle('Help')
        .setFooter(bot.config.credits)
        .addFields(
            { name: 'Status', value: '`' + prefix + 'servers` - show all added servers.\n`' + prefix + 'server <name>` - show a specific server.\n`' + prefix + 'players <name>` - show players on a server.'  },
            { name: 'Config', value: '`' + prefix + 'addserver <game> <ip:port> <name>` - add a gameserver to track.\n`' + prefix + 'deleteserver <name>` - delete a gameserver.\n`' + prefix + 'prefix <text>` - set a new prefix.\n`' + prefix + 'games` - list supported games and their "codes".' },
            { name: 'Misc', value: '`' + prefix + 'info` - information about the bot.\n`' + prefix + 'ping` - useless bot latency.\n`' + prefix + 'invite` - invite the bot to your server.\n`' + prefix + 'support` - get invite to support server.' },
        );
    return msg.channel.send(embed);
}
