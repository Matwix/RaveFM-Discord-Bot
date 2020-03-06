const { Client } = require('discord.js')
const { readdirSync } = require('fs')
const axios = require('axios')

module.exports = class RaveFM extends Client {
  constructor (options) {
    super(options)
    this.commands = []
    this.once('ready', this._ready.bind(this))
    this.initCommands('./src/commands')
    this.initEvents('./src/events')
  }

  _ready () {
    setInterval(async ()=>{
      axios.get(process.env['API_CALLBACK'], { responseType: 'json' }).then(response => {
      if(response.data.now_playing.song.title !== process.env['SONG_TITLE']){
        process.env['SONG_TITLE'] = response.data.now_playing.song.title
        process.env['SONG_ARTIST'] = response.data.now_playing.song.artist
        if(response.data.now_playing.song.art == process.env['GENERIC_IMAGE']){
		axios.get(process.env['API_DEEZER'] + response.data.now_playing.song.text, { responseType: 'json' }).then(response => {
            process.env['SONG_IMAGE'] = response.data.data[0].album.cover_medium
          }).catch(error => {
            process.env['SONG_IMAGE'] = process.env['SONG_IMAGE']
          });
        }else{
          process.env['SONG_IMAGE'] = response.data.now_playing.song.art
        }
        if(response.data.live.is_live == true){
          process.env['LIVE_TITLE'] = `${response.data.live.streamer_name} is ***LIVE*** currently playing`
        }else{
          process.env['LIVE_TITLE'] = `RaveFM is currently playing`
        }
        this.user.setActivity(`${response.data.now_playing.song.text}`, { type: 'LISTENING' })
      }}).catch(error => {
        console.log(error);
      });
    }, 1000)
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
}
