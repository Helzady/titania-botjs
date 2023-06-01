const Discord = require('discord.js');

module.exports = {
    data: new Discord.SlashCommandBuilder()
        .setName('unban') // nome do comando
        .setDescription('Desbanir um usuário') // descrição do comando
        .addStringOption(option =>
            option
                .setName('user')
                .setDescription('Usuário a ser banido')
                .setRequired(true))
        .addStringOption(option =>
            option
                .setName('motivo')
                .setDescription('Insera um motivo')
                .setAutocomplete(true)
                .setRequired(false)),

    async execute(interaction) {
        
        if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.BanMembers)) {
            interaction.reply(`Você não possui poermissão para utilizar este comando.`);
        } else {
            let userr = interaction.options.getUser("user");
            let user = interaction.guild.members.cache.get(userr.id)
            let motivo = interaction.options.getString("motivo");
            if (!motivo) motivo = "Não definido.";
    
            let embed = new Discord.EmbedBuilder()
            .setColor("Green")
            .setDescription(`O usuário ${user} (\`${user.id}\`) foi banido com sucesso!`);
    
            let erro = new Discord.EmbedBuilder()
            .setColor("Red")
            .setDescription(`Não foi possível banir o usuário ${user} (\`${user.id}\`) do servidor!`);
    
            user.ban({ reason: [motivo] }).then( () => {
                interaction.reply({ embeds: [embed] })
            }).catch(e => {
                interaction.reply({ embeds: [erro] })
            })
        }

    },
};
