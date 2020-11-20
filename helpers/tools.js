const Discord = require('discord.js');
const Gamedig = require('gamedig');

module.exports.status = async function(server) {
    let options = {
        type: server.game,
        host: server.host,
        socketTimeout: 3000,
        maxAttempts: 3
    };
    if(server.port) options.port = server.port;

    let response = {};
    await Gamedig.query(options).then(status => {
        response.raw = status;
        response.title = '<:gsbot_online:771782245589581884> ' + server.name;
        response.data = 'Map: ' + status.map + '\nPlayers: ' + status.players.length + '/' + status.maxplayers + '\nConnect: ' + status.connect;
    }).catch(error => {
        response.raw = error;
        response.title = '<:gsbot_offline:771782255374761985> ' + server.name;
        response.data = 'Server is unreachable.';
    });

    return response;
};

module.exports.players = async function(server) {
    let options = {
        type: server.game,
        host: server.host,
        socketTimeout: 3000,
        maxAttempts: 3
    };
    if(server.port) options.port = server.port;

    let response = {
        names: [],
        frags: [],
        pings: []
    };
    await Gamedig.query(options).then(status => {
        response.title = '<:gsbot_online:771782245589581884> ' + server.name;
        response.data = (status.players.length) ? 'Total players online: ' + status.players.length : 'No one is playing at the moment.';

        for(let i = 0; i < status.players.length; i++) {
            let player = status.players[i];
            if(!player.name) continue;

            response.names.push(player.name);
            if(player.frags) response.frags.push(player.frags);
            if(player.kills) response.frags.push(player.kills);
            if(player.ping) response.pings.push(player.ping);
        }
    }).catch(error => {
        response.title = '<:gsbot_offline:771782255374761985> ' + server.name;
        response.data = 'Server is unreachable.';
    });

    return response;
};
