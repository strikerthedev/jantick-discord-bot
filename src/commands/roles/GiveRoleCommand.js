const BaseCommand = require('../../utils/structures/BaseCommand');

const { MessageEmbed, Message } = require('discord.js')
const colours = require('../../json/colors.json')

module.exports = class GiveRoleCommand extends BaseCommand {
  constructor() {
    super('giverole', 'Roles', []);
  }

  async run(client, message, args) {

    if (!message.member.hasPermission('MANAGE_ROLES')) {
      message.reply("Command restricted to Server Staff");

      return;
  }

  let member = message.mentions.members.first() 

  if (!member) {
      message.channel.send("I couldn't find that user");

      return;
  }

  let roleName = args.pop(),
      role = message.guild.roles.cache.find(role => role.name === roleName);

  if (!role) {
      message.channel.send("That role doesn't exist, please mention a valid role.");

      return;
  }

  await member.roles.add(role);

  const addedRoleEmbed = new MessageEmbed()
  .setColor(colours.GreenColour)
  .setDescription(`${member} has been given ${role}`)


  message.channel.send(addedRoleEmbed);

  }
}