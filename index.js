require('dotenv').config();
const Discord = require('discord.js');
const fs = require('node:fs');
const path =require('node:path');
const client = new Discord.Client({ intents: [/*1, 512, 32768, 2, 128*/ 32767] });
const glob = require('glob');
client.commands = new Discord.Collection();
const eventsPath = path.join(__dirname, './src/events');
const eventFiles = glob.sync('**/*.js', { cwd: eventsPath });

require('./src/handler')

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
} 

const foldersPath = path.join(__dirname, './src/slashCommands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		// Set a new item in the Collection with the key as the command name and the value as the exported module
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(`[WARNING] O comando em ${filePath} não possui uma propriedade "data" ou "execute" obrigatória.`);
		}
	}
}


client.login(process.env.token);
