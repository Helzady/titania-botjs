const Discord = require('discord.js');
const ms = require("ms");

module.exports = {
    data: new Discord.SlashCommandBuilder()
        .setName('slowmode') // nome do comando.
        .setDescription('Configure o modo lento em um canal de texto.') // descrição do comando.
        .addStringOption(option =>
            option
                .setName('tempo')
                .setDescription('Coloque o tempo do modo lento [s|m|h].')
                .setRequired(true))

        .addChannelOption(option =>
            option
                .setName('canal')
                .setDescription('Mencione um canal de texto.')
                .setRequired(false)),

    async execute(interaction) {
        // script do comando aqui!  


        if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.ManageChannels)) {
            interaction.reply({ content: `Você não possui permissão para utilizar este comando.`, ephemeral: true })
        } else {

            let t = interaction.options.getString("tempo");
            let tempo = ms(t);
            let channel = interaction.options.getChannel("canal");
            if (!channel || channel === null) channel = interaction.channel;

            if (!tempo || tempo === false || tempo === null) {
                interaction.reply({ content: `Forneça um tempo válido: [s|m|h].`, ephemeral: true })
            } else {
                channel.setRateLimitPerUser(tempo / 1000).then(() => {
                    interaction.reply({ content: `O canal de texto ${channel} teve seu modo lento definido para \`${t}\`.` })
                }).catch(() => {
                    interaction.reply({ content: `Ops, algo deu errado ao executar este comando, verifique minhas permissões.`, ephemeral: true })
                })
            }

        }

    },
};