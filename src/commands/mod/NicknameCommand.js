const BaseCommand = require('../../utils/structures/BaseCommand');

const { MessageEmbed } = require('discord.js')

module.exports = class NickanmeCommand extends BaseCommand {
  constructor() {
    super('nick', 'mod', []);
  }

  async run(client, message, args) {// 

    if(!message.member.hasPermission("MANAGE_NICKNAMES")) {
        return message.channel.send("This command is restricted to Jantick Staff.")
    }

    const target = message.mentions.users.first()
    
    if(!target) {
        return message.channel.send("Please mention a user.")
    }

    const member = message.guild.members.cache.get(target.id)



    args.shift()
    const nickname = args.join(' ')

    member.setNickname(nickname)

    var confirmEmbed = new MessageEmbed()
    .setColor("#4BCC85")
    .setDescription(`${target}'s nickname has been changed to: **${nickname}**`);

    message.channel.send(confirmEmbed);
  }
}