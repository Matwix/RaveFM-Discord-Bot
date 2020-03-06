const Command = require('../structures/command.js')

const { RichEmbed } = require('discord.js')

module.exports = class Invite extends Command {
  constructor (client) {
    super(client, {
      name: 'invite',
      aliases: ['link', 'inv', 'discord']
    })
  }

  async run (message, args) {
    message.channel.send(
      new RichEmbed()
        .setColor('2CAA80')
        .setDescription(`Here you go! [Click this link](https://discordapp.com/oauth2/authorize?client_id=645170466033762304&scope=bot&permissions=37047360) to invite the bot to your server. Enjoy the tunes! 🥳`)
        .setTimestamp()
        .setFooter('Powered by RaveFM.LIVE', process.env.FOOTER_ICON)
    )
  }
}
