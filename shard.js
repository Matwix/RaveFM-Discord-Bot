const { ShardingManager } = require('discord.js');

const shard = new ShardingManager('./index.js', {
  token: process.env.TOKEN,
  totalShards: 'auto'
});

shard.spawn();

shard.on('shardCreate', shard => {
	console.log(`[${new Date().toString().split(" ", 5).join(" ")}] Launched shard #${shard.id}`);
});
