const Discord = require('discord.js');

module.exports = {
    name: 'games',
    description: 'Lists supported games',
    usage: 'games',
    aliases: [],
    permissions: [],
    botPermissions: [],
    nsfw: false,
    cooldown: 1000,
    ownerOnly: false
}

module.exports.execute = async(bot, msg, args, data) => {
    let hasManage = msg.guild.me.permissions.has('MANAGE_MESSAGES');

    // messy stuff
    let perPage = 15;
    let i = 1;
    let iPage = 0;
    let pages = [];
    Object.entries(bot.data.games).forEach(game => {
        let code = game[0], name = game[1];

        if(pages[iPage] === undefined) pages[iPage] = '';
        pages[iPage] += '`' + code + '` - ' + name + '\n';

        if((i - perPage) > perPage) {
            iPage++; i = 0;
        } else i++;
    });

    let page = 1;
    const embed = new Discord.MessageEmbed()
        .setColor(bot.config.color)
        .setTitle('Supported games')
        .setFooter('Page ' + page + ' of ' + pages.length + '.')
        .setDescription(pages[page - 1]);

    msg.channel.send(embed).then(m => {
        if(!hasManage) msg.channel.send('**Tip**: If you give me `Manage Messages` permissions, I\'ll remove the reactions myself so you don\'t need to click twice.');

        m.react('⬅️').then(r => {
            m.react('➡️')
            let backwardsFilter = (reaction, user) => reaction.emoji.name === '⬅️' && user.id === msg.author.id;
            let forwardsFilter = (reaction, user) => reaction.emoji.name === '➡️' && user.id === msg.author.id;
            let backwards = m.createReactionCollector(backwardsFilter, { time: 60000 });
            let forwards = m.createReactionCollector(forwardsFilter, { time: 60000 });

            backwards.on('collect', r => {
                if(page === 1) return;
                page--;
                embed.setDescription(pages[page - 1]);
                embed.setFooter('Page ' + page + ' of ' + pages.length + '.');
                m.edit(embed);
                if(hasManage) r.users.remove(msg.user.id);
            });
            forwards.on('collect', r => {
                if (page === pages.length) return;
                page++;
                embed.setDescription(pages[page - 1]);
                embed.setFooter('Page ' + page + ' of ' + pages.length + '.');
                m.edit(embed);
                if(hasManage) r.users.remove(msg.member.id);
            });
        });
    });
}
