const { Client } = require('discord.js')
const { readdirSync } = require('fs')
const axios = require('axios');

module.exports = class RaveFM extends Client {
  constructor (options) {
    super(options)
    this.commands = []
    this.once('ready', this._ready.bind(this))
    this.initCommands('./src/commands')
    this.initEvents('./src/events')
  }

  _ready () {
    // Run everything, otherwise it's 30 minutes until DBL updates after restart
    // This also makes sure we have the song info before any commands can be executed
    // As well as our activitiy is upto date after restart
    this.storeSongInfo()
    this.updateDBL()

    // Update stored song info every 10 seconds
    setInterval(async () =>{
      this.storeSongInfo()
    }, 10000)

    // Update DBL every 30 minutes
    setInterval(async () =>{
      this.updateDBL()
    }, 1800000)

    this.log('info', 'I\'ve already woken up!')
  }

  log (type, ...args) {
    console.log(`[${type}]`, ...args)
  }

  initCommands (dir) {
    readdirSync(dir).forEach(file => {
      if (file.endsWith('.js')) {
        try {
          const Command = require(`./commands/${file}`)
          this.commands.push(new Command(this))
          delete require.cache[require.resolve(`./commands/${file}`)]
        } catch (err) {
          this.log('error', err)
        } finally {
          this.log('commands', `${file} loaded.`)
        }
      }
    })
  }

  initEvents (dir) {
    readdirSync(dir).forEach(file => {
      if (file.endsWith('.js')) {
        try {
          const Event = require(`./events/${file}`)
          const event = new Event(this)
          super.on(event.name, (...args) => event._run(...args))
          delete require.cache[require.resolve(`./events/${file}`)]
        } catch (err) {
          this.log('error', err)
        } finally {
          this.log('events', `${file} loaded.`)
        }
      }
    })
  }

  storeSongInfo () {
    axios.get(process.env.STATION_API, {responseType: 'json'}).then(response => {

      // Store song info globally
      process.env['SONG_TEXT'] = response.data.now_playing.song.text
      process.env['SONG_ARTIST'] = response.data.now_playing.song.artist
      process.env['SONG_TITLE'] = response.data.now_playing.song.title
      process.env['SONG_ART'] = response.data.now_playing.song.art

      // Check if art is generic if so call Deezer function to find art
      if(process.env.SONG_ART === process.env.GENERIC_ICON){
        this.searchAlbumCover()
      }else{
        process.env['SONG_IMAGE'] = process.env.SONG_ART
      }

      // Set the user activity to the current song text
      this.user.setActivity(response.data.now_playing.song.text, { type: 'LISTENING' })

    })
  }

  searchAlbumCover () {
    // Lookup song and grab first response for the art if any errors just set to station art
    axios.get(process.env.DEEZER_API + process.env.SONG_TEXT, {responseType: 'json'}).then(response => {
      process.env['SONG_IMAGE'] = response.data.data[0].album.cover_medium
    }).catch(error => {
      process.env['SONG_IMAGE'] = process.env.STATION_ICON
    });
  }

  updateDBL () {
    this.log('info', 'Updated top.gg bot details.')
  }
}
