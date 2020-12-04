const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class SlowModeCommand extends BaseCommand {
  constructor() {
    super('slowmode', 'Moderation', []);
  }

  async run(client, message, args) {
    const { channel } = message

    if (args.length < 2) {
      message.channel.send('Please provide a duration and a reason.')
      return
    }

    let duration = args.shift().toLowerCase()
    if (duration === 'off') {
      duration = 0
    }

    if (isNaN(duration)) {
      message.channel.senf(
        'Please provide either a number of seconds or the word "off".'
      )
      return
    }

    channel.setRateLimitPerUser(duration, args.join(' '))
    message.channel.send(`The slowmode for this channel has been set to: **${duration}**.`)
  }
}