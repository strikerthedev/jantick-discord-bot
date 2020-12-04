const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class ShutdownCommand extends BaseCommand {
  constructor() {
    super('shutdown', 'system', []);
  }

  run(client, message, args) {
    if(message.author.id !== "587499208937046036") {
      return message.channel.send("Command restricted to Jantick Technical Team")
    }

    client.destroy();
  }
}