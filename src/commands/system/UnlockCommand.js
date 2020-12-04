const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class UnlockCommand extends BaseCommand {
  constructor() {
    super('unlock', 'system', []);
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
              SEND_MESSAGES: true,
              ADD_REACTIONS: true
          });
      });
  } catch (e) {
      bot.logger.error(e);
  }

  message.channel.send(`${channel} has been unlocked by ${message.author}`);
  }
}