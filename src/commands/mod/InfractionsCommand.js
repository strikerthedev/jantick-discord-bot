const BaseCommand = require('../../utils/structures/BaseCommand');

const Discord = require('discord.js')

module.exports = class InfractionsCommand extends BaseCommand {
  constructor() {
    super('infractions', 'Moderation ', []);
  }

  async run(client, message, args) {
    const infractionsSchema = require("../../scheams/infractions-schema")
    if (!message.member.hasPermission("MANAGE_MESSAGES")) {
      var result = await infractionsSchema.find({
        userId: message.author.id,
      })
      .catch((e) => false);
  
      if (result.length < 1) return message.channel.send("That person doesnt have any warnings.");
      if (result.length > 25) return message.channel.send("To many infractions to show, most likely due to having to many infractions (> 25)")
  
      var authorembed = new Discord.MessageEmbed()
      .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
      .setDescription(`All infractions for ${message.author}`)
  
      result.forEach((result) => {
        const { authorId, code, type, date, reason } = result
        .addField(`${type}`, `ID: ${code}\nReason: ${reason}\nDate: \`${date}\``, false)
      })
  
      .setColor("#4BCC85");
  
      message.channel.send(authorembed)
    } else {
      if(!args[0]) {
        var noargsresult = await infractionsSchema.find({
          userId: message.author.id,
        })
        .catch((e) => false);
    
        if (noargsresult.length < 1) return message.channel.send("That person doesnt have any warnings.");
        if (noargsresult.length > 25) return message.channel.send("To many infractions to show, most likely due to having to many infractions (> 25)")
    
        var noargsembed = new Discord.MessageEmbed()
        noargsembed.setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
        noargsembed.setDescription(`All infractions for ${message.author}`)
    
        noargsresult.forEach((noargsresult) => {
          const { authorId, code, type, date, reason } = noargsresult
          noargsembed.addField(`${type}`, `ID: \`${code}\`\nReason: ${reason}\nDate: \`${date}\``, false)
        })
    
        noargsembed.setColor("#4BCC85");
    
        message.channel.send(noargsembed)
      } else {
        var person = message.mentions.users.first()
        var personId
        if(!person) {
          var argsresult = await infractionsSchema.find({
            userId: args[0],
          })
          .catch((e) => false);
    
          if (argsresult.length < 1) return message.channel.send("That person doesnt have any warnings.");
          if (argsresult.length > 25) return message.channel.send("To many infractions to show, most likely due to having to many infractions (> 25)")
        
          var argsembed = new Discord.MessageEmbed()
          argsembed.setAuthor(`${client.user.tag}`, client.user.displayAvatarURL({ dynamic: true }))
          argsembed.setDescription(`All infractions for user with ID \`${args[0]}\``)
  
          argsresult.forEach((argsresult) => {
            const { authorId, code, type, date, reason } = argsresult
            argsembed.addField(`${type}`, `ID: \`${code}\`\nReason: ${reason}\nDate: \`${date}\``, false)
          })
  
          argsembed.setColor("#4BCC85")
  
          message.channel.send(argsembed)
        } else {
          var argsresult = await infractionsSchema.find({
            userId: person.id,
          })
          .catch((e) => false);
    
          if (argsresult.length < 1) return message.channel.send("That person doesnt have any warnings.");
          if (argsresult.length > 25) return message.channel.send("To many infractions to show, most likely due to having to many infractions (> 25)")
        
          var argsembed = new Discord.MessageEmbed()
          argsembed.setAuthor(`${person.tag}`, person.displayAvatarURL({ dynamic: true }))
          argsembed.setDescription(`All infractions for ${person}`)
  
          argsresult.forEach((argsresult) => {
            const { authorId, code, type, date, reason } = argsresult
            argsembed.addField(`${type}`, `ID: \`${code}\`\nReason: ${reason}\nDate: \`${date}\``, false)
          })
  
          argsembed.setColor("#4BCC85")
  
          message.channel.send(argsembed)
        }
      }
    }
  }
}