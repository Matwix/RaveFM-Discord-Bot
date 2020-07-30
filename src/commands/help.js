const Command = require('../structures/command.js')

const { MessageEmbed } = require('discord.js')

module.exports = class Invite extends Command {
  constructor (client) {
    super(client, {
      name: 'help',
      aliases: ['h']
    })
  }

  async run (message, args) {
    message.channel.send(
      new MessageEmbed()
        .setColor('3BC2A1')
        .setTitle(`RaveFM Commands`)
        .setDescription(`Below is a list of commands you can use with the RaveFM Bot.`)
        .addField(`rfm!help | rfm!h`, `Returns a list of commands you can use with the bot.`, false)
        .addField(`rfm!play | rfm!p`, `If you are in a voice channel the bot will join and play the station.`, false)
        .addField(`rfm!leave | rfm!l`, `The bot will Leave if it is in a voice channel in this server.`, false)
        .addField(`rfm!invite | rfm!i`, `This will return an invite link so you can invite the bot to your server.`, false)
        .addField(`rfm!song | rfm!s`, `This will return the song playing, Including the Title, Artist and Album Artwork.`, false)
        .addField(`rfm!ping`, `Returns the latency for message creation & the current API latency`, false)
        .addField(`rfm!stats | rfm!st`, `This will return statistics about the bot including how many guilds, members & shards etc.`, false)
        .setTimestamp()
        .setFooter(process.env.EMBED_FOOTER, process.env.STATION_ICON)
    ).catch(e => this.client.log('error', e))
  }
}
