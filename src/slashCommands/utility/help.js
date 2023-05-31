const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Mostra a lista de comandos disponíveis'),
    async execute(interaction) {
        const commands = interaction.client.commands;
        const commandList = commands.map(command => command.data.toJSON());

        await interaction.reply({
            embeds: [{
                title: 'Comandos Disponíveis',
                description: `Aqui está a lista de todos os comandos disponíveis neste servidor: \n${commandList.map(command => `\`${command.name}\`: ${command.description}`).join('\n')}`
            }]
        });
    }
}
