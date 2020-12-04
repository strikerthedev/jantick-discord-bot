const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class LockCommand extends BaseCommand {
  constructor() {
    super('lock', 'system', []);
  }

 async run(client, message, args) {
    if (!message.member.hasPermission('MANAGE_CHANNELS')) {
      message.reply("Command restricted to Server Staff");

      return;
  }

  let channel = message.channel;

  try {
      message.guild.roles.cache.forEach(role => {
          channel.createOverwrite(role, {
              SEND_MESSAGES: false,
              ADD_REACTIONS: false
          });
      });
  } catch (e) {
      bot.logger.error(e);
  }

  message.channel.send(`**${channel}** has been locked by ${message.author}`);
  }
}