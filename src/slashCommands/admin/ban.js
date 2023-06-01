const Discord = require('discord.js');

module.exports = {
    data: new Discord.SlashCommandBuilder()
        .setName('ban') // nome do comando
        .setDescription('Banir um usuário') // descrição do comando
        .addUserOption(option =>
            option
                .setName('usuário')
                .setDescription('Usuário a ser banido')
                .setRequired(true))
        .addStringOption(option =>
            option
                .setName('motivo')
                .setDescription('Motivo do banimento')
                .setRequired(false)),

    async execute(interaction) {
        const user = interaction.options.getUser('usuário');
        const reason = interaction.options.getString('motivo') || 'Nenhum motivo fornecido';

        if (!interaction.member.permissions.has('BAN_MEMBERS')) {
            let embed = new Discord.EmbedBuilder()
            .setColor('Random')
            .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.avatarURL() })
            .setDescription('Você não tem permissão para banir membros!')

            return interaction.reply({ embeds: [embed] });
        }

        if (!user.bannable) {
            let embed = new Discord.EmbedBuilder()
            .setColor('Random')
            .setDescription('Não é possível banir este usuário!')

            return interaction.reply({ embeds: [embed], ephemeral: true });
        }

        try {
            await user.ban({ reason });

            let embed = new Discord.EmbedBuilder()
            .setColor('Random')
            .setDescription(`Usuário ${user.tag} foi banido com sucesso!`)
            
            interaction.reply({ embeds: [embed], ephemeral: true });
        } catch (error) {
            console.error(error);

            let embed = new Discord.EmbedBuilder()
            .setColor('Random')
            .setDescription('Ocorreu um erro ao banir o usuário!')

            interaction.reply({ embeds: [embed], ephemeral: true });
        }
    },
};
