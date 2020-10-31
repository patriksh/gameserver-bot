# GameserverBot
Simple yet powerful bot that allows you to check your current players, map & more.

## Setup
1. Rename config.sample.json to config.json.
2. Edit it by putting in your information (bot token, MongoDB URI).
3. `npm install`
4. `npm start app.js`

## Commands

- `addserver <game> <ip:port> <name>` - Add a gameserver to track.
- `deleteserver <name>` - Delete a gameserver.
- `servers` - List all added servers, show their status.
- `server <name>` - Show status of a specific server.
- `games` - List supported games and their "codes".
- `prefix <prefix>` - Set a new prefix for the bot.
