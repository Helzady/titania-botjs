const Discord = require('discord.js');

module.exports = {
    data: new Discord.SlashCommandBuilder()
        .setName('kick') // nome do comando
        .setDescription('Expulsar um usuário') // descrição do comando
        .addUserOption(option => option.setName('usuário').setDescription('Usuário a ser expulso').setRequired(true))
        .addStringOption(option => option.setName('motivo').setDescription('Motivo da expulsão').setRequired(false)),

    async execute(interaction) {
        const user = interaction.options.getUser('usuário');
        const reason = interaction.options.getString('motivo') || 'Nenhum motivo fornecido';

        if (!interaction.member.permissions.has('KICK_MEMBERS')) {
            let embed = new Discord.EmbedBuilder()
            .setColor('Random')
            .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.avatarURL()})
            .setDescription('Você não tem permissão para expulsar membros!')

            return interaction.reply({ embeds: [embed] });
        }

        if (!user.kickable) {
            let embed = new Discord.EmbedBuilder()
            .setColor('Random')
            .setDescription('Não é possível expulsar este usuário!');

            return interaction.reply({ embeds: [embed], ephemeral: true });
        }

        try {
            await user.kick(reason);
            let embed = new Discord.EmbedBuilder()
            .setColor('Random')
            .setDescription(`Usuário ${user.tag} foi expulso com sucesso!`);

            interaction.reply({ embeds: [embed] , ephemeral: true });
        } catch (error) {
            console.error(error);
            let embed = new Discord.EmbedBuilder()
            .setColor('Random')
            .setDescription('Ocorreu um erro ao expulsar o usuário!');

            interaction.reply({ embeds: [embed], ephemeral: true });
        }
    },
};
