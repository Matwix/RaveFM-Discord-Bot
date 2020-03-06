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
      const broadcast = this.client.createVoiceBroadcast().playStream(process.env.STATION_URL);
      const Stream = connection.playBroadcast(broadcast);
      Stream.setVolume(0.15);
      message.channel.send(`${yes} I am here! Enjoy the tunes.`)
    }).catch(e => this.client.log('error', e))
  }
}
