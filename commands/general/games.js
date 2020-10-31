const Discord = require('discord.js');
const Pagination = require('discord-paginationembed');

module.exports = {
    name: 'games',
    description: 'Lists supported games',
    usage: 'games',
    aliases: [],
    permissions: [],
    botPermissions: ['SEND_MESSAGES', 'MANAGE_MESSAGES'],
    nsfw: false,
    cooldown: 1000,
    ownerOnly: false
}

module.exports.execute = async(bot, msg, args, data) => {
    let games = [];
    Object.entries(bot.data.games).forEach(game => {
        games.push({ code: game[0], name: game[1] });
    });

    const FieldsEmbed = new Pagination.FieldsEmbed()
        .setArray(games)
        .setAuthorizedUsers([msg.author.id])
        .setChannel(msg.channel)
        .setElementsPerPage(20)
        .setPageIndicator(true)
        .formatField('`Code` - Name', g => '`' + g.code + '` - ' + g.name)
        .setDeleteOnTimeout(true);

    FieldsEmbed.embed
        .setColor(bot.config.color)
        .setTitle('Supported games')
        .setDescription('Use reaction emojis to navigate.');
    await FieldsEmbed.build();
}
