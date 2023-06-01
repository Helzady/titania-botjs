const Discord = require('discord.js');

module.exports = {
    data: new Discord.SlashCommandBuilder()
        .setName('say') // nome do comando.
        .setDescription('Faça eu falar.') // descrição do comando.

        .addStringOption(option =>
            option
                .setName('embed') // Nome da opição.
                .setDescription('Falarei em embed.') // Descrição da opição
                .setRequired(false))

        .addStringOption(option =>
            option
                .setName('normal') // Nome da opção.
                .setDescription('Falarei normal (sem embed).') // Descrição da opção
                .setRequired(false)),

            async execute(interaction) {
            // script do comando aqui!  

                if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.ManageMessages)) {
                    interaction.reply({ content: `Você não possui permissão para utilizar este comando`, ephemeral: true })
                } else {
                    let embed_fala = interaction.options.getString('embed');
                    let normal_fala = interaction.options.getString('normal');
                    
                    if (!embed_fala && !normal_fala) {
                        interaction.reply(`Escreva pelo menos em uma das opções.`)
                    } else {
                        if (!embed_fala) embed_fala = "⠀";
                        if (!normal_fala) normal_fala = "⠀";

                        let embed = new Discord.EmbedBuilder()
                        .setColor('Random')
                        .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynamic: true }) })
                        .setDescription(embed_fala);

                        if (embed_fala === "⠀") {
                            interaction.reply({ content: `Sua mensagem foi enviada!`, ephemeral: true })
                            interaction.channel.send({ content: `${normal_fala}` })

                        } else if (normal_fala === "⠀") {
                            interaction.reply({ content: `Sua mensagem foi enviada!`, ephemeral: true })
                            interaction.channel.send({ embeds: [embed] })
                        } else {
                            interaction.reply({ content: `Sua mensagem foi enviada!`, ephemeral: true })
                            interaction.channel.send({ content: `${normal_fala}`, embeds: [embed] })
                        }

                    
                    }
                    
                }

        },
};