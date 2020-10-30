const Discord = require('discord.js');
const Gamedig = require('gamedig');

module.exports.status = async function(server) {
    let options = {
        type: server.game,
        host: server.host,
        socketTimeout: 5000
    };
    if(server.port) options.port = server.port;

    let response = {};
    await Gamedig.query(options).then(status => {
        response.raw = status;
        response.title = '<:gsbot_online:771782245589581884> ' + server.name;
        response.data = 'Map: ' + status.map + '\nPlayers: ' + status.players.length + '/' + status.maxplayers + '\nConnect: ' + status.connect;
    }).catch(error => {
        response.raw = error;
        response.title = '<:gsbot_offline:771782255374761985>' + server.name;
        response.data = 'Server is unreachable.';
    });

    return response;
};
