const Command = require('../structures/command.js')

const { RichEmbed } = require('discord.js')

module.exports = class Leave extends Command {
  constructor (client) {
    super(client, {
      name: 'leave',
      aliases: ['disconnect', 'bye', 'die']
    })
  }

  async run (message, args) {
    const voiceChannel = this.client.voiceConnections.find(v => v.channel.guild.id === message.member.guild.id)
    const yes = this.client.emojis.find(emoji => emoji.name === "Yes");
    const no = this.client.emojis.find(emoji => emoji.name === "No");

    if (message.member.voiceChannel === undefined) return message.channel.send(`${no} You\'re not in a voice channel.`)
    if (!message.member.voiceChannel.joinable) return message.channel.send(`${no} I can\'t join this voice channel.`)

    message.guild.me.voiceChannel.leave()
    message.channel.send(`${yes} Thanks for tuning into RaveFM!`)
  }
}
