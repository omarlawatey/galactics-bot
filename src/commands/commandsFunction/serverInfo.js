import { MessageEmbed } from 'discord.js';
import { GlobalVars } from '../../assets/GlobalVars';

const serverInfo = async interaction => {
  const { commandName } = interaction;

  if (commandName === 'server-info') {
    const members = interaction.guild.members.cache.map(i => i);
    const channels = interaction.guild.channels.cache.map(i => i);

    const serverInfoEmbed = new MessageEmbed()
      .setAuthor({
        name: interaction.guild.name,
        iconURL: interaction.guild.iconURL({ dynamic: true, size: 2048 })
      })
      .addFields(
        {
          name: '🆔 Server ID:',
          value: interaction.guild.id,
          inline: true
        },
        {
          name: '📆 Created On:',
          value: `**<t:${parseInt(interaction.guild.createdAt / 1000, 10)}:R>**`,
          inline: true
        },
        {
          name: '👑 Founded by:',
          value: `<@${(await interaction.guild.fetchOwner()).user.id}>`,
          inline: true
        },
        {
          name: `👥 Members (${members.length}):`,
          value: `${
            members.filter(member => member.roles.cache.some(({ id }) => id === GlobalVars.generalRoles[0].id)).length
          } Member | ${
            members.filter(member => member.roles.cache.some(({ id }) => id === GlobalVars.generalRoles[1].id)).length
          } Bots`,
          inline: true
        },
        {
          name: `💬 Channels (${channels.length}):`,
          value: `${channels.filter(i => i.type === 'GUILD_TEXT').length} Text | ${
            channels.filter(i => i.type === 'GUILD_VOICE').length
          } Voice`,
          inline: true
        },
        {
          name: '✨ Boosts:',
          value: `${interaction.guild.premiumSubscriptionCount}`,
          inline: true
        }
      )
      .setColor('#1f0557')
      .setThumbnail(interaction.guild.iconURL({ dynamic: true, size: 2048 }));

    return interaction.reply({ embeds: [serverInfoEmbed], ephemeral: false });
  }
};

export default serverInfo;
