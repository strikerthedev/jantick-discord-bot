const BaseCommand = require('../../utils/structures/BaseCommand');

const { MessageEmbed } = require('discord.js')


module.exports = class WhoisCommand extends BaseCommand {
  constructor() {
    super('whois', 'Info', []);
  }

  run(client, message, args) {
    if(args.length > 1) return message.channel.send('Only mention one user!');
        
    if(!args[0]) return message.channel.send('Mention someone!');

    if(args[0]){

      let member = message.mentions.members.first();

      if(member) {
        let embed = new MessageEmbed()
          .setAuthor(`${member.user.tag} (${member.id})`, member.user.displayAvatarURL())
          .addField("**Username:**", `${member.user.username}`)
          .addField("**Discriminator:**", `${member.user.discriminator}`)
          .addField("**ID:**", `${member.user.id}`)
          .addField("**Status:**", `${member.user.presence.status}`)
          .addField("**Joined On:**", `${member.joinedAt.toLocaleString()}`)
          .addField("**Created On:**", `${member.user.createdAt.toLocaleString()}`)
          .addField("**User Roles:**", `${member.roles.cache.map(role => role.toString()).join(' ')}`)
          .setColor('#3fb7eb')
        message.channel.send(embed);
      } else {
          message.channel.send(`Could not find that member`); 
      }
    }

  }
}