const { Events } = require('discord.js');

module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(client) {
        try {
            
            console.log(`O bot ${client.user.username}`);
            console.log(`O bot esta conecta com ${client.guilds.cache.size} servidores!`);
            console.log(`O bot está conectado a ${client.users.cache.size} members!`);

        } catch (error) {
            console.error(error);
        }
    },
};
