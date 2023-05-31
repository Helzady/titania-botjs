const { REST, Routes } = require('discord.js'); 
const fs = require('node:fs'); 
const path = require('node:path');

//const { clientId, token } = require('./config.json');

require('dotenv').config();
const clientId = process.env.clientId
const token = process.env.token

const commands = []; 

const foldersPath = path.join(__dirname, 'src/SlashCommands');

const commandFolders = fs.readdirSync(foldersPath); 

for (const folder of commandFolders) { 
	const commandsPath = path.join(foldersPath, folder); 
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js')); 

	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		if ('data' in command && 'execute' in command) {
			commands.push(command.data.toJSON()); 
		} else {
			console.log(`[WARNING] O comando em ${filePath} está faltando a propriedade "data" ou "execute".`);
		}
	}
}


const rest = new REST().setToken(token);


(async () => {
	try {
		console.log(`Iniciando o registro global de ${commands.length} comandos (/) da aplicação.`);

		
		const data = await rest.put(
			Routes.applicationCommands(clientId),
			{ body: commands },
		);

		console.log(`Registrou global com sucesso ${data.length} comandos (/) da aplicação.`);
	} catch (error) {
		
		console.error(error);
	}
})();
