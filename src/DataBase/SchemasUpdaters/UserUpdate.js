import UserSchema from '../Schemas/UserSchema';

const UserUpdate = async (
  guild,
  user,
  data = {
    type: 'create'
  }
) => {
  const { type } = data;

  let userOldData = await UserSchema.findOne({
    guildId: guild.id,
    userId: user?.id
  });

  if (type === 'create' || userOldData === null) {
    await UserSchema.create({
      guildId: guild.id,
      userId: user?.id
    });
  }

  return await UserSchema.findOne({
    guildId: guild.id,
    userId: user?.id
  });
};

export default UserUpdate;
