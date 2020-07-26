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
        .addField(`rfm!help | rfm!what`, `Returns a list of commands you can use with the bot.`, false)
        .addField(`rfm!join | rfm!play`, `If you are in a voice channel the bot will join and play the station.`, false)
        .addField(`rfm!leave | rfm!disconnect | rfm!bye | rfm!die`, `The bot will disconnect if it is in a voice channel in this server.`, false)
        .addField(`rfm!invite | rfm!link | rfm!inv | rfm!discord`, `This will return an invite link so you can invite the bot to your server.`, false)
        .addField(`rfm!playing | rfm!status | rfm!current`, `This will return the song playing, Including the Title, Artist and Album Artwork.`, false)
        .addField(`rfm!ping | rfm!pong`, `Returns the latency for message creation & the current API latency`, false)
        .setTimestamp()
        .setFooter('Powered by RaveFM.LIVE', 'https://i.imgur.com/dKuX8Dx.png')
    ).catch(e => this.client.log('error', e))
  }
}
