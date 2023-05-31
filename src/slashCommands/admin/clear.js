const Discord = require('discord.js');

module.exports = {
  data: new Discord.SlashCommandBuilder()
    .setName('clear') // nome do comando.
    .setDescription('Limpe o canal de texto') // descrição do comando.
    .addNumberOption(option =>
      option
        .setName('quantidade')
        .setDescription('Número de mensagens para serem apagadas')
        .setRequired(true)),

  async execute(interaction) {
    try {
      let numero = interaction.options.getNumber('quantidade');

      if (!interaction.member.permissions.has('MANAGE_MESSAGES')) {
        interaction.reply({ content: 'Você não possui permissão para utilizar este comando.', ephemeral: true });

      } else {

        if (parseInt(numero) > 99 || parseInt(numero) <= 0) {

          let embed = new Discord.EmbedBuilder()
            .setColor('Random')
            .setDescription('/clear [1 - 99]');

          interaction.reply({ embeds: [embed], ephemral: true });

        } else {

          if (parseInt(numero) > 14) {

            let embed = new Discord.EmbedBuilder()
              .setColor('Random')
              .setDescription(`Você só pode excluir mensagens que têm menos de 14 dias de idade.`);

            interaction.reply({ embeds: [embed], ephemral: true });

          } else {

            interaction.channel.bulkDelete(parseInt(numero));

            let embed = new Discord.EmbedBuilder()
              .setColor('Green')
              .setAuthor({ name: interaction.user.username, iconURL: interaction.user.avatarURL() })
              .setDescription(`O canal de texto ${interaction.channel} teve \`${numero}\` mensagens deletadas por \`${interaction.user.username}\`.`);

            interaction.reply({ embeds: [embed] });

            let apagar_mensagem = "nao" // sim ou nao

            if (apagar_mensagem === "sim") {
              setTimeout(() => {
                interaction.deleteReply()
              }, 5000)
            } else if (apagar_mensagem === "nao") {
              return;
            }
          }
        }
      }
    }catch (e) {
      console.error(e);

      let embed = new Discord.EmbedBuilder()
      .setColor('Random')
      .setDescription('Ocorreu um erro ao excluir as mensagens.');

      interaction.reply({ emdeds: [embed], ephemral: true });
    }
  },
};
