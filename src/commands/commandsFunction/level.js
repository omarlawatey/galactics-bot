import { LevelUpdate } from '../../DataBase/SchemasUpdaters';

const level = async interaction => {
  const { commandName } = interaction;

  if (commandName === 'level') {
    let user = await LevelUpdate(interaction.guild, interaction.user, { type: '' });

    await interaction.reply({
      content: `Your Xp: ${user.xp}
Your level: ${user.level}`,
      ephemeral: true
    });
  }
};

export default level;
