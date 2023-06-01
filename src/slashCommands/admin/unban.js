const Discord = require('discord.js');

module.exports = {
    data: new Discord.SlashCommandBuilder()
        .setName('unban') // nome do comando
        .setDescription('Desbanir um usuário') // descrição do comando
        .addStringOption(option => option.setName('usuário').setDescription('Usuário a ser desbanido').setRequired(true)),

    async execute(interaction) {
        const userTag = interaction.options.getString('usuário');

        if (!interaction.member.permissions.has('BAN_MEMBERS')) {
            let embed = new Discord.EmbedBuilder()
            .setColor('Random')
            .setAuthor({ name: interaction.user.tag, iconURL: interaction.user.avatarURL()})
            .setDescription('Você não tem permissão para desbanir membros!')

            return interaction.reply({ embeds: [embed] });
        }

        const bannedUsers = await interaction.guild.bans.fetch();
        const bannedUser = bannedUsers.find(user => user.user.tag === userTag);

        if (!bannedUser) {
            let embed = new Discord.EmbedBuilder()
            .setColor('Random')
            .setDescription('Usuário não encontrado na lista de banimentos!')

            return interaction.reply({ embeds: [embed], ephemeral: true });
        }

        try {
            await interaction.guild.members.unban(bannedUser.user);
            let embed = new Discord.EmbedBuilder()
            .setColor('Random')
            .setDescription(`Usuário ${userTag} foi desbanido com sucesso!`)

            interaction.reply({ embeds: [embed], ephemeral: true });
        } catch (error) {
            console.error(error);
            let embed = new Discord.EmbedBuilder()
            .setColor('Random')
            .setDescription('Ocorreu um erro ao desbanir o usuário!')

            interaction.reply({ embeds: [embed], ephemeral: true });
        }
    },
};
