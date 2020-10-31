const Discord = require('discord.js');
const guildsDB = require('./Schematics/Guild.js');
const serversDB = require('./Schematics/Server.js');

module.exports.getGuildDB = async function (guildID) {
    let guildDB = await guildsDB.findOne({ id: guildID });
    if(guildDB) {
        return guildDB;
    } else {
        guildDB = new guildsDB({ id: guildID });
        await guildDB.save().catch(err => bot.logger.error('MongoDB guild DB error - ' + err));
        return guildDB;
    }
}

module.exports.getGuildSchema = () => guildsDB;
module.exports.getServerSchema = () => serversDB;
