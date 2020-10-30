const Discord = require('discord.js');

module.exports = {
    name: 'addserver',
    description: 'Add a gameserver to track.',
    usage: 'addserver <game> <ip:port> <name>',
    aliases: ['add', 'a'],
    permissions: ['ADMINISTRATOR'],
    botPermissions: ['SEND_MESSAGES'],
    nsfw: false,
    cooldown: 500,
    ownerOnly: false
}

module.exports.execute = async(bot, msg, args, data) => {
    let game = args[0];
    let ip = args[1];
    let name = args.splice(2).join(' ').trim();
    let prefix = !data.guild.prefix ? bot.config.prefix : data.guild.prefix;

    if(game === undefined)
        return bot.embeds.cmdError(msg, 'Game can\'t be empty.', module.exports);
    if(!(game in bot.data.games))
        return bot.embeds.error(msg, 'Invalid game.\nUse `' + prefix + 'games` to see available games.');
    if(ip === undefined)
        return bot.embeds.cmdError(msg, 'Host can\'t be empty.', module.exports);
    if(name == '')
        return bot.embeds.cmdError(msg, 'Server name can\'t be empty.', module.exports);

    let hostSplit = ip.split(':');
    if(hostSplit[1] === undefined) {
        port = null;
    } else {
        ip = hostSplit[0];
        port = hostSplit[1];
    }

    let serversDB = bot.data.getServerSchema();
    let count = await serversDB.count({ guild: msg.guild.id });
    if(count >= bot.config.serverLimit)
        return bot.embeds.error(msg, 'Current limit of gameservers per guild is `' + bot.config.serverLimit + '`.');

    let server = { guild: msg.guild.id, name: name, game: game, host: ip, port: port };
    let serverDB = new serversDB(server);
    await serverDB.save().catch(err => {
        bot.logger.error('MongoDB server DB error - ' + err);
        return bot.embeds.dbError(msg);
    });

    // TODO: Put server status on insert, alert if IP needs to be whitelisted.
    let embed = new Discord.MessageEmbed()
        .setColor(bot.config.color)
        .setTitle('Server added')
        .setDescription('Querying the server for info.');
    msg.channel.send(embed).then(async m => {
        await bot.tools.status(server).then(response => {
            embed.setDescription(response.title + '\n' + response.data);
        });

        m.edit(embed);
    });
}
