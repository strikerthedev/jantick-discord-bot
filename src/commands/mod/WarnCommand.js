const BaseCommand = require('../../utils/structures/BaseCommand');

const Discord = require('discord.js')

module.exports = class WarnCommand extends BaseCommand {
  constructor() {
    super('warn', 'Moderation ', []);
  }

  async run(client, message, args) {
    const infractionsSchema = require("../../scheams/infractions-schema")
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("This command is restriced to Jantick Staff.");

  var person = message.mentions.users.first();
  if (!person) return message.channel.send("Please mention a vaild user to warn.");

  if (person.id === message.author.id) return message.channel.send("You can not warn your self.");

  if (message.member.roles.highest.position <= message.guild.members.cache.get(person.id).roles.highest.position) return message.channel.send("That user has a higher role ranking, meaning you can not warn them.");

  var reason = args.splice(1).join(" ")
  if (!reason) {
    reason = "No reason provided"
  }

  var puncode = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < 10; i++) {
    puncode += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  var userembed = new Discord.MessageEmbed()
    .setColor("#FF5050")
    .setDescription(`You were warned in **${message.guild.name}**`)
    .addField("Reason", reason, true)
    .addField("Infraction ID", puncode, false)
    .setTimestamp();

  try {
    person.send(userembed)
  } catch (e) {
    console.log(`Unable to DM user: ${person.tag}`);
  }

  var pundate = new Date()
  var month = pundate.getMonth() + 1;
  pundate = month + "/" + pundate.getDate() + "/" + pundate.getFullYear() + " " + pundate.getHours() + ":" + pundate.getMinutes() + "(UTC+0)";

  await new infractionsSchema({ 
    userId: person.id,
    authorId: message.author.id,
    code: puncode,
    type: "Warn",
    date: pundate,
    reason: reason,
  }).save()

  var confirmembed = new Discord.MessageEmbed()
    .setColor("#4BCC85")
    .setDescription(`${person} has been warned with ID \`${puncode}\``);

  message.channel.send(confirmembed)
  }
}