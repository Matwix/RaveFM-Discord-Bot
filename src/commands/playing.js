const Command = require('../structures/command.js')

const { RichEmbed } = require('discord.js')

module.exports = class Playing extends Command {
  constructor (client) {
    super(client, {
      name: 'playing',
      aliases: ['status', 'current']
    })
  }

  async run (message, args) {
    message.channel.send(
      new RichEmbed()
        .setColor('3BC2A1')
        .setDescription(process.env.LIVE_TITLE)
        .addField(`${process.env.SONG_ARTIST}`, `${process.env.SONG_TITLE}`)
        .setThumbnail(`${process.env.SONG_IMAGE}`)
        .setTimestamp()
        .setFooter('Powered by RaveFM.LIVE', 'https://i.imgur.com/NQHaImr.png')
    ).catch(e => this.client.log('error', e))
  }
}
