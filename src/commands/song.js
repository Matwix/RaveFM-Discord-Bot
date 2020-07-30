const Command = require('../structures/command.js')

const { MessageEmbed } = require('discord.js')

module.exports = class Song extends Command {
  constructor (client) {
    super(client, {
      name: 'song',
      aliases: ['s']
    })
  }

  async run (message, args) {
    message.channel.send(
      new MessageEmbed()
        .setColor('3BC2A1')
        .setDescription(`Currently Playing`)
        .addField(process.env.SONG_ARTIST, process.env.SONG_TITLE)
        .setThumbnail(process.env.SONG_IMAGE)
        .setTimestamp()
        .setFooter(process.env.EMBED_FOOTER, process.env.STATION_ICON)
    ).catch(e => this.client.log('error', e))
  }
}
