require('dotenv').config(); // carrega as variáveis de ambiente do arquivo .env na raiz do projeto
const { REST, Routes } = require('discord.js'); // importa o módulo REST e Routes da biblioteca Discord.js
const fs = require('node:fs'); // importa o módulo fs do Node.js para acessar o sistema de arquivos
const path = require('node:path'); // importa o módulo path do Node.js para manipular caminhos de arquivo

const clientId = process.env.CLIENTID;
const guildId = process.env.GUILDID;
const token = process.env.TOKEN; // define o token de acesso à API do Discord obtido nas variáveis de ambiente

const commands = []; // cria um array vazio para armazenar os comandos

// Lê todos os arquivos de comandos da pasta 'commands'
const foldersPath = path.join(__dirname, './src/SlashCommands'); // obtém o caminho completo da pasta de comandos
const commandFolders = fs.readdirSync(foldersPath); // lê o conteúdo da pasta de comandos

for (const folder of commandFolders) { // itera sobre todas as subpastas da pasta de comandos
	const commandsPath = path.join(foldersPath, folder); // obtém o caminho completo da subpasta de comandos
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js')); // lê apenas os arquivos .js da subpasta de comandos

	// Para cada arquivo de comando lido, extrai a informação 'data' e 'execute' para serem registrados no Discord
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		if ('data' in command && 'execute' in command) { // checa se o comando tem as informações necessárias para ser registrado no Discord
			commands.push(command.data.toJSON()); // adiciona as informações do comando ao array de comandos
		} else {
			console.log(`[WARNING] O comando em ${filePath} está faltando a propriedade "data" ou "execute".`);
		}
	}
}

// Cria uma instância do módulo REST e prepara a API para registrar os comandos no Discord
const rest = new REST().setToken(token);

// Registra todos os comandos no Discord
(async () => {
	try {
	
		// O método 'put' é usado para registrar todos os comandos no servidor do Discord
		const data = await rest.put(Routes.applicationCommands(clientId), { body: [] })
		.then(() => console.log('Successfully deleted all application commands.'))
		.catch(console.error);
        
	} catch (error) {
		// E, claro, certifique-se de capturar e registrar quaisquer erros!
		console.error(error);
	}
})();
