const BaseCommand = require('../../utils/structures/BaseCommand');

const { MessageEmbed } = require('discord.js')


module.exports = class FaqCommand extends BaseCommand {
  constructor() {
    super('faq', 'info', []);
  }

  run(client, message, args) {
   message.delete()


   if(message.author.id !== "587499208937046036") {
      return message.channel.send("Administration commands are restriced to Jantick Admins with `Type 3 Access`")
    }

    const faqEmbed = new MessageEmbed()
    .setAuthor("Jantick Techonlogies FAQ")
    .setDescription("At Jantick Technologies we keep a close eye on questions that are asked in the server, and in general. To save people from asnwering the same questions over and over again we have created a FAQ channel; This channel is where you will be able to find the most frequently asked questions we recieve.")
    .addField("(1) - What is Jantick Technologies?", "Jantick Techonlogies is a techonlogy and brand development company, we aim to deliever high quality development services from our Techonlogies branch, and also brand consulting to imporve your brand in all aspects from; Logo, Management, Social Presence etc.")
    .addField("(2) - Where can I purchase services?", "Although we accpet payments via PayPal purchasing Development and Consulting packages requires you to purchase them via [jantick.com](https://jantick.com) -- These payments are sent via PayPals payment button feature, all payments are secure and direct. [Learn More](https://jantick.com/legal/privacy)")
    .addField("(3) - How does Brand Consulting work?", "At Jantick, we are dedicated to making sure that you get the corret support and brand improvments you paid for. To acheive this we hold multiple meetings of a 1-2 week length and then spend the last week finalising your pruchase with the developers, creative team and the marketing team. The following process is followed: \n\n `a)` First Meeting - Meet & Greet \n `b)` Discovery Session - This meeting can range from 1-5 hours and is used to learn what you want to acheieve. \n `c)` We will take the notes that we took away and take to our Staff Team and create multiple business strataigies. \n `d)` Final Meeting - Explain our ideas and process along with the designs that we developed for your brand. ")
    .addField("Final Note", "These are just some of our most asked questions, we have a full page dedicated to how we strucutre our meeting process for Brand Consulting and also some of the most Frequently Asked Questions -- Learn more at [jantick.com](https://jantick.com)")
    .setFooter("Last Updated: 26/11/2020")
    .setColor("#3fb7eb")

    message.channel.send(faqEmbed)
  }
}