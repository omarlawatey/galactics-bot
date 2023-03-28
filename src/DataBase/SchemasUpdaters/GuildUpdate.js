import GuildSchema from '../Schemas/GuildSchema';

const GuildUpdate = async (
  guild,
  data = {
    type: 'create'
  }
) => {
  const { type } = data;

  let guildOldData = await GuildSchema.findOne({
    guildId: guild.id
  });

  if (type === 'create' || guildOldData === null) {
    await GuildSchema.create({
      guildId: guild.id
    });
  }
  return await GuildSchema.findOne({ guildId: guild.id });
};

export default GuildUpdate;
