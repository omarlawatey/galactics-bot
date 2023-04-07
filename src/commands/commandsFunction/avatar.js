import { MessageEmbed } from 'discord.js';

const avatar = interaction => {
  const { commandName, options } = interaction;

  if (commandName === 'avatar') {
    const user = options.getUser('user') || 0;
    const server = options.getString('server') || 0;

    const getAvatarEmbed = (user, type = 'user') =>
      new MessageEmbed()
        .setColor(0x0f0229)
        .setTitle(type === 'user' ? user.username : user.name)
        .setDescription(
          `[Avatar Link](${
            type === 'user'
              ? user.avatarURL({ dynamic: true, size: 2048 })
              : user.iconURL({ dynamic: true, size: 2048 })
          })`
        )
        .setImage(
          type === 'user' ? user.avatarURL({ dynamic: true, size: 2048 }) : user.iconURL({ dynamic: true, size: 2048 })
        );

    if (!server && !user) return interaction.reply({ embeds: [getAvatarEmbed(interaction.user)], ephemeral: true });
    if (server) return interaction.reply({ embeds: [getAvatarEmbed(interaction.guild, 'server')], ephemeral: true });
    if (user) return interaction.reply({ embeds: [getAvatarEmbed(user)], ephemeral: true });
  }
};

export default avatar;
