import { MessageEmbed } from 'discord.js';

const avatar = interaction => {
  const { user, guild, options } = interaction;

  const mentionedUser = options.getUser('user') || 0;
  const server = options.getString('server') || 0;

  const getAvatarEmbed = (user, type = 'user') =>
    new MessageEmbed()
      .setColor(0x0f0229)
      .setTitle(type === 'user' ? user.username : user.name)
      .setDescription(
        `[Avatar Link](${
          type === 'user' ? user.avatarURL({ dynamic: true, size: 2048 }) : user.iconURL({ dynamic: true, size: 2048 })
        })`
      )
      .setImage(
        type === 'user' ? user.avatarURL({ dynamic: true, size: 2048 }) : user.iconURL({ dynamic: true, size: 2048 })
      );

  if (!server && !mentionedUser) return interaction.reply({ embeds: [getAvatarEmbed(user)], ephemeral: true });
  if (server) return interaction.reply({ embeds: [getAvatarEmbed(guild, 'server')], ephemeral: true });
  if (user) return interaction.reply({ embeds: [getAvatarEmbed(mentionedUser)], ephemeral: true });
};

export default avatar;
