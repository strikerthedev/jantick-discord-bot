const { Message, DiscordAPIError } = require('discord.js');
const BaseEvent = require('../utils/structures/BaseEvent');
const { MessageEmbed } = require('discord.js')

module.exports = class GuildMemberAddEvent extends BaseEvent {
  constructor() {
    super('guildMemberAdd');
  }
  
  async run(client, member) {
    guildMember.addRole(ember.guild.roles.find(role => role.name === "member"));

    let WelcomeEmbed = new MessageEmbed()
    .setDescription(`${member} *[${member.id}]* has joined the Jantick Technologies Discord.`)
    .setColor('#4BCC85')

    let channel = 
    
    channel.send(WelcomeEmbed)  
// 778870460879994920

  } 
}