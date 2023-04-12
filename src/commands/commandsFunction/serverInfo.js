import { MessageEmbed } from 'discord.js';
import { GlobalVars } from '../../assets/GlobalVars';

const serverInfo = async interaction => {
  const { guild } = interaction;

  const members = guild.members.cache.map(i => i);
  const channels = guild.channels.cache.map(i => i);

  const serverInfoEmbed = new MessageEmbed()
    .setAuthor({
      name: guild.name,
      iconURL: guild.iconURL({ dynamic: true, size: 2048 })
    })
    .addFields(
      {
        name: '🆔 Server ID:',
        value: guild.id,
        inline: true
      },
      {
        name: '📆 Created On:',
        value: `**<t:${parseInt(guild.createdAt / 1000, 10)}:R>**`,
        inline: true
      },
      {
        name: '👑 Founded by:',
        value: `<@${(await guild.fetchOwner()).user.id}>`,
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
        value: `${guild.premiumSubscriptionCount}`,
        inline: true
      }
    )
    .setColor('#1f0557')
    .setThumbnail(guild.iconURL({ dynamic: true, size: 2048 }));

  return interaction.reply({ embeds: [serverInfoEmbed], ephemeral: false });
};

export default serverInfo;
