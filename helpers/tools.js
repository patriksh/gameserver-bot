const Discord = require('discord.js');
const Gamedig = require('gamedig');

module.exports.status = async function(server) {
    let options = {
        type: server.game,
        host: server.host
    };
    if(server.ip) options.ip = server.ip;

    let response = {};
    await Gamedig.query(options).then(status => {
        response.title = server.name + ' (online)';
        response.data = 'Map: ' + status.map;
    }).catch(error => {
        response.title = server.name + ' (offline)';
        response.data = 'Server is unreachable.';
    });

    return response;
};
