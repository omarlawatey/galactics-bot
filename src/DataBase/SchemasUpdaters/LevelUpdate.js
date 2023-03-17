import LevelSchema from '../Schemas/LevelSchema';

const LevelUpdate = async (
  guild,
  user,
  data = {
    type: 'create',
    xp: 0,
    level: 1
  }
) => {
  const { type, xp, level } = data;

  let userOldData = await LevelSchema.findOne({
    guildId: guild.id,
    userId: user?.id
  });

  if (type === 'create' || userOldData === null) {
    await LevelSchema.create({
      guildId: guild.id,
      userId: user?.id,
      xp: 0,
      level: 1
    });

    userOldData = await LevelSchema.findOne({
      guildId: guild.id,
      userId: user?.id
    });
  }

  if (type === 'levelUp') {
    await LevelSchema.updateOne(
      { guildId: guild.id, userId: user?.id },
      {
        $set: {
          xp,
          level
        }
      }
    ).then(_ => {});
  }

  return await LevelSchema.findOne({
    guildId: guild.id,
    userId: user?.id
  });
};

export default LevelUpdate;
