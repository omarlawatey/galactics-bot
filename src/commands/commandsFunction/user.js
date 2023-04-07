import { MessageEmbed } from 'discord.js';

const user = interaction => {
  const { commandName, options } = interaction;

  if (commandName === 'user') {
    const user = options.getUser('user') || 0;

    const getUserEmbed = user => {
      user = interaction.guild.members.cache.get(user.id);

      return new MessageEmbed()
        .addFields(
          {
            name: 'Joined Discord:',
            value: `**<t:${parseInt(user.user.createdTimestamp / 1000, 10)}:R>**`,
            inline: true
          },
          {
            name: 'Joined Server:',
            value: `**<t:${parseInt(user.joinedTimestamp / 1000, 10)}:R>**`,
            inline: true
          }
        )
        .setThumbnail(user.user.avatarURL({ dynamic: true, size: 2048 }))
        .setColor('#1f0557')
        .setFooter({
          text: user.user.tag,
          iconURL: user.user.avatarURL({ dynamic: true, size: 2048 })
        });
    };

    if (!user) return interaction.reply({ embeds: [getUserEmbed(interaction.user)], ephemeral: false });
    if (user) return interaction.reply({ embeds: [getUserEmbed(user)], ephemeral: false });
  }
};

export default user;
