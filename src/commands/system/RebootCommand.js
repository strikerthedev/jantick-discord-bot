const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class RebootCommand extends BaseCommand {
  constructor() {
    super('reboot', 'system', []);
  }

  async run(client, message, args) {
    if(message.author.id !== "587499208937046036") {
      return message.channel.send("Command restricted to Jantick Technical Team")
    }

    await Promise.all([
      client.destroy(),
      client.login(process.env.DISCORD_BOT_TOKEN)]
    ) 
    
    return message.channel.send("Bot rebooting")
  }
}