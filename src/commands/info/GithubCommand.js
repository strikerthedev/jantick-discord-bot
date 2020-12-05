const BaseCommand = require('../../utils/structures/BaseCommand');
const { MessageEmbed } = require('discord.js');
const { oneLine } = require('common-tags');

module.exports = class GitHubCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'github',
      aliases: ['gh', 'repo'],
      usage: 'github',
      description: 'Displays the link to Jantick\'s GitHub repository.',
      type: client.types.INFO
    });
  }
  run(message) {
    const embed = new MessageEmbed()
      .setTitle('GitHub Link')
      .setThumbnail('https://github.githubassets.com/images/modules/open_graph/github-mark.png')
      .setDescription(oneLine`
        Click [here](https://github.com/Jantick/jantick-discord-bot/) to to visit my GitHub repository!
        Please support me by starring ⭐ the repo, and feel free to comment about issues or suggestions!
      `)
      .addField('Other Links',
        '**[Create an issue](https://github.com/Jantick/jantick-discord-bot/issues) | ' +
        '[Support Server](https://discord.gg/YxtnsqYja6)**'
      )
      .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
      .setTimestamp()
      .setColor(message.guild.me.displayHexColor);
    message.channel.send(embed);
  }
};
