const Command = require('../structures/command.js')

const { RichEmbed } = require('discord.js')

module.exports = class Leave extends Command {
  constructor (client) {
    super(client, {
      name: 'leave',
      aliases: ['l']
    })
  }

  async run (message, args) {
    if (message.member.voice.channel === undefined) return message.channel.send(`<:No:645264028335079425> You\'re not in a voice channel.`)
    if (!message.member.voice.channel.joinable) return message.channel.send(`<:No:645264028335079425> I can\'t join this voice channel.`)
    message.guild.me.voice.channel.leave()
    message.channel.send(`<:Yes:645264002225668136> Thanks for tuning into RaveFM!`)
  }
}
