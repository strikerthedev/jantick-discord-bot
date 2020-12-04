const BaseCommand = require('../../utils/structures/BaseCommand');

const Discord = require('discord.js')

module.exports = class UnMuteCommand extends BaseCommand {
  constructor() {
    super('unmute', 'Moderation', []);
  }

  async run(client, message, args) {
    const infractionsSchema = require("../../scheams/infractions-schema")

    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("This command is restricted to Jantick Staff.");

    var person = message.mentions.users.first();
    if (!person) return message.channel.send("Please mention a user you would like to unmute.");
  
    if (!message.guild.members.cache.get(person.id)) return message.channel.send("Please mention a vaild user -- That user is most likely not is not in the server.");
  
    if (person.id === message.author.id) return message.channel.send("You can not mute yourself. ");
  
    if (message.member.roles.highest.position <= message.guild.members.cache.get(person.id).roles.highest.position) return message.channel.send("That user has a higher role ranking, meaning you can not unmute them");
  
    var muterole = message.guild.roles.cache.find((r) => r.name === "Muted");
    if (!muterole) return message.channel.send("Please make a role called `Muted` before continuing with this command.");
  
    var reason = args.splice(1).join(" ");
    if (!reason) {
      reason = "No reason provided";
    }
  
    var muteperson = await message.guild.members.cache.get(person.id);
  
    try {
      await muteperson.roles.remove(muterole);
    } catch (e) {
      message.channel.send(
        "Error: Make sure the `Muted` role is below my highest role!"
      );
      return;
    }
  
    var puncode = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < 10; i++) {
      puncode += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
  
    var userembed = new Discord.MessageEmbed()
      .setColor("#4BCC85")
      .setDescription(`You were unmuted in **${message.guild.name}**`)
      .addField("Reason", reason, true)
      .addField("Infraction ID", puncode, false)
      .setTimestamp();
  
    try {
      person.send(userembed);
    } catch (e) {
      console.log(`Unable to DM user: ${person.tag}`);
    }
  
    var pundate = new Date()
    var month = pundate.getMonth() + 1;
    pundate = month + "/" + pundate.getDate() + "/" + pundate.getFullYear() + " " + pundate.getHours() + ":" + pundate.getMinutes() + "(UTC+0)";
  
    var confirmembed = new Discord.MessageEmbed()
    .setColor("#4BCC85")
    .setDescription(`${person} has been unmuted with ID \`${puncode}\``);

  message.channel.send(confirmembed);

    await new infractionsSchema({
      userId: person.id,
      authorId: message.author.id,
      code: puncode,
      type: "Unmute",
      date: pundate,
      reason: reason,
    }).save();
  
  }
}