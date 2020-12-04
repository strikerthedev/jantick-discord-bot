require('dotenv').config();
const { Client } = require('discord.js');
const { registerCommands, registerEvents } = require('./utils/registry');
const client = new Client();

(async () => {
  client.commands = new Map();
  client.events = new Map();
  client.prefix = process.env.DISCORD_BOT_PREFIX;
  client.mongoose = require('./utils/mongoose');


  await registerCommands(client, '../commands');
  await registerEvents(client, '../events');


  await client.mongoose.init();
  await client.login(process.env.DISCORD_BOT_TOKEN);
})();
