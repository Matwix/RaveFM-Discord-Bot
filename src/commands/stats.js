const Command = require('../structures/command.js')

var moment = require("moment");
var momentDurationFormatSetup = require("moment-duration-format");
const { MessageEmbed } = require('discord.js')

module.exports = class Stats extends Command {
  constructor (client) {
    super(client, {
      name: 'stats',
      aliases: ['st']
    })
  }

  async run (message, args) {
    let srvCount = 0
  	let shardCount = 0
  	let reqShards = await this.client.shard.broadcastEval(`
  		[
  		this.guilds.cache.size
  		]
  	`)
  	reqShards.forEach((data) => {
  		shardCount++
      srvCount = srvCount + data[0]
    })
  	let usrCount = (await this.client.shard.fetchClientValues("users.cache.size")).reduce((a, b) => b + a)
  	let totalSeconds = (this.client.uptime / 1000)
  	let days = Math.floor(totalSeconds / 86400)
  	let hours = Math.floor(totalSeconds / 3600)
  	totalSeconds %= 3600
  	let minutes = Math.floor(totalSeconds / 60)
  	let seconds = Math.floor(totalSeconds % 60)
    message.channel.send(
      new MessageEmbed()
        .setColor('FC9803')
        .setAuthor('💃 RaveFM Bot Stats 💃', process.env.STATION_ICON)
        .setThumbnail(process.env.SONG_IMAGE)
        .addFields(
          {name: "🎶 Current Song Name", value: `Name: ${process.env.SONG_TITLE}\nArtist: ${process.env.SONG_ARTIST}`},
      		{name: "📻 Stream URL", value: process.env.STATION_URL},
      		{name: "🏢 Total Guilds", value: this.client.guilds.cache.size.toLocaleString()},
          {name: "👪 Total Members", value: this.client.users.cache.size.toLocaleString()},
      		{name: "💽 Shards (current of total)", value: (message.guild.shardID + 1) + ' of ' + shardCount},
      		{name: "⏰ Current Shard Uptime", value: moment.duration(this.client.uptime).format(" D [days], H [hrs], m [mins], s [secs]"), inline: true},
      		{name: "⏰ Bot Uptime", value: moment.duration(process.uptime() * 1000).format(" D [days], H [hrs], m [mins], s [secs]"), inline: true},
        )
        .setTimestamp()
        .setFooter(process.env.EMBED_FOOTER, process.env.STATION_ICON)
    )
  }
}
