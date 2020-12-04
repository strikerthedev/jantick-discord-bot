// const { db } = require('../../scheams/infractions-schema');
// const BaseCommand = require('../../utils/structures/BaseCommand');

// module.exports = class RemoveWarnsCommand extends BaseCommand {
//   constructor() {
//     super('removewarn', 'testing', []);
//   }

//   async run(client, message, args) {
//     const infractionsSchema = require("../../scheams/infractions-schema")
    
//     if (!message.member.hasPermission("MANAGE_MESSAGES")) {
//         return message.channel.send("This command is restriced to Jantick Staff.")
//     }

//     const user = message.mentions.member.first()

//     if(!user) {
//         return message.channel.send("To remove a warn please mention a user within in the guild.")
//      }

//     if(!message.author.id === user.id) { 
//         return message.channel.send("You are restricted to reseting other peoples warns, not your own. Please contact a Jantick Admin.")
//     }

//     var result = await infractionsSchema.find({
//         code: string,
//       })
//       .catch((e) => false);

//       if(!result === null) {
//           return message.channel.send("That user does not have any warnings, please mention a user with warnings.")

//       } else {
//           db.collection.remove(
//               result
//           )

//           return message.channel.send(`Warn `/`${result}`/` was removed from ${user}`)
//       }
//     }
// }
