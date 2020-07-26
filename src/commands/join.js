const Command = require('../structures/command.js')

const { RichEmbed } = require('discord.js')

module.exports = class Join extends Command {
  constructor (client) {
    super(client, {
      name: 'join',
      aliases: ['play']
    })
  }

  async run (message, args) {
    const voiceChannel = this.client.voiceConnections.find(v => v.channel.guild.id === message.member.guild.id)
    const yes = this.client.emojis.find(emoji => emoji.name === "Yes");
    const no = this.client.emojis.find(emoji => emoji.name === "No");

    if (message.member.voiceChannel === undefined) return message.channel.send(`${no} You\'re not in a voice channel.`)
    if (!message.member.voiceChannel.joinable) return message.channel.send(`${no} I can\'t join this voice channel.`)

    message.member.voiceChannel.join().then(connection => {
	  const Stream = connection.playStream(process.env.STATION_URL);
      Stream.setVolume(0.2);
      message.channel.send(
        new RichEmbed()
          .setColor('3BC2A1')
          .setDescription(`${yes} Enjoy the tunes, Currently playing`)
          .addField(`${process.env.SONG_ARTIST}`, `${process.env.SONG_TITLE}`)
          .setThumbnail(`${process.env.SONG_IMAGE}`)
          .setTimestamp()
          .setFooter('Powered by RaveFM.LIVE', 'https://i.imgur.com/dKuX8Dx.png')
      ).catch(e => this.client.log('error', e))
    }).catch(e => this.client.log('error', e))
  }
}
