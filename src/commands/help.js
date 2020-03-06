const Command = require('../structures/command.js')

const { RichEmbed } = require('discord.js')

module.exports = class Invite extends Command {
  constructor (client) {
    super(client, {
      name: 'help',
      aliases: ['what']
    })
  }

  async run (message, args) {
    message.channel.send(
      new RichEmbed()
        .setColor('3BC2A1')
        .setTitle(`RaveFM Commands`)
        .setDescription(`Below is a list of commands you can use with the RaveFM Bot.`)
        .addField(`r!help | r!what`, `Returns a list of commands you can use with the bot.`, false)
        .addField(`r!join | r!play`, `If you are in a voice channel the bot will join and play the station.`, false)
        .addField(`r!leave | r!disconnect | r!bye | r!die`, `The bot will disconnect if it is in a voice channel in this server.`, false)
        .addField(`r!invite | r!link | r!inv | r!discord`, `This will return an invite link so you can invite the bot to your server.`, false)
        .addField(`r!playing | r!status | r!current`, `This will return the song playing, Including the Title, Artist and Album Artwork.`, false)
        .setTimestamp()
        .setFooter('Powered by RaveFM.LIVE', 'https://i.imgur.com/NQHaImr.png')
    ).catch(e => this.client.log('error', e))
  }
}
