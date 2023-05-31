const Discord = require('discord.js');

module.exports = {
    data: new Discord.SlashCommandBuilder()
        .setName('ping')
        .setDescription('Informa a latencia do bot e da API.'),

    async execute(interaction) {

        const startTime = Date.now();

        let embed = new Discord.EmbedBuilder()
            .setColor('Random')
            .setAuthor({ name: interaction.client.user.username, iconURL: interaction.client.user.displayAvatarURL() })
            .setDescription(`🏓 Olá, aguarde um momento: \`calculando...\`.`);

        let embed2 = new Discord.EmbedBuilder()
            .setColor('Random')
            .setAuthor({ name: interaction.client.user.username, iconURL: interaction.client.user.displayAvatarURL() })
            .setDescription(`🏓 Olá ${interaction.user.username}, O ping do bot: \`${interaction.client.ws.ping}ms\`.`)

        interaction.reply({ embeds: [embed], ephemeral: true }).then(msg => {
            setTimeout(() => {
                msg.edit({ embeds: [embed2], ephemeral: true })
            }, 3000)
        })

    },
};