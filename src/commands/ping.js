const Command = require('../structures/command.js')

module.exports = class Ping extends Command {
  constructor (client) {
    super(client, {
      name: 'ping',
      aliases: ['pong']
    })
  }

  async run (message, args) {
	message.channel.send("Pinging...").then(msg => {
		msg.edit(
			`Pong! Latency is ${msg.createdTimestamp -
				message.createdTimestamp}ms. API Latency is ${Math.round(this.client.ping)}ms`
		);
	}).catch(e => this.client.log('error', e));
  }
}
