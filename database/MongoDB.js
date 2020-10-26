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

module.exports.getServerSchema = () => serversDB;

// module.exports.getServerDB = async function (serverID, guildID) {
//     let serverDB = await serversDB.findOne({ id: serverID, guildID: guildID });
//     if(serverDB) {
//         return serverDB;
//     } else {
//         serverDB = new serversDB({ id: serverID, guildID: guildID });
//         await serverDB.save().catch(err => bot.logger.error('MongoDB server DB error - ' + err));
//         return serverDB;
//     }
// }
