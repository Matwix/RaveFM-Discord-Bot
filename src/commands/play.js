const Command = require('../structures/command.js')

const { MessageEmbed } = require('discord.js')

module.exports = class Play extends Command {
  constructor (client) {
    super(client, {
      name: 'play',
      aliases: ['p']
    })
  }

  async run (message, args) {
    if (message.member.voice.channel === undefined) return message.channel.send(`<:No:645264028335079425> You\'re not in a voice channel.`)
    if (!message.member.voice.channel.joinable) return message.channel.send(`<:No:645264028335079425> I can\'t join this voice channel.`)

    message.member.voice.channel.join().then(connection => {
      connection.play(process.env.STATION_URL)
      message.channel.send(
        new MessageEmbed()
          .setColor('3BC2A1')
          .setDescription(`<:Yes:645264002225668136> Enjoy the tunes, Currently playing`)
          .addField(process.env.SONG_ARTIST, process.env.SONG_TITLE)
          .setThumbnail(process.env.SONG_IMAGE)
          .setTimestamp()
          .setFooter(process.env.EMBED_FOOTER, process.env.STATION_ICON)
      ).catch(e => this.client.log('error', e))
    }).catch(e => this.client.log('error', e))
  }
}
