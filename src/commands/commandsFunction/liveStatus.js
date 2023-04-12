import { liveStatusdb } from '../../apis';
import youtube from '../../apis/youtube';
import { GlobalVars } from '../../assets/GlobalVars';

const liveStatus = async interaction => {
  const { options, guild } = interaction;
  const ephemeral = true;

  const type = options.getString('type') || 0;
  const value = options.getString('value') || 0;
  const checkDuplicates = await (await liveStatusdb.get(`?type=${type}&value=${value}`)).data;

  if (checkDuplicates.length > 0) {
    return interaction.reply({ content: 'This id value is already added', ephemeral });
  }

  switch (type) {
    case 'role':
      const role = await guild.roles.cache.get(value);
      if (!role) return interaction.reply({ content: "Invalid role's Id", ephemeral });

      await guild.channels
        .create(`⌬｜${role.name.toLowerCase()}: ${role.members.map(i => i.name).length}`, {
          type: 'GUILD_VOICE',
          parent: GlobalVars.liveStatusCategoryId
        })
        .then(({ id: channelId }) =>
          liveStatusdb.post('/', {
            type,
            value,
            channelId
          })
        );

      return interaction.reply({ content: `<@&${value}> added to server's live status`, ephemeral });

    case 'yt':
      const ytChannel = await youtube(value);
      if (!ytChannel) return interaction.reply({ content: 'Invalid youtube channel Id', ephemeral });

      await guild.channels
        .create(`⌬｜${ytChannel.author.toLowerCase()}: ${ytChannel.subscriberCount}`, {
          type: 'GUILD_VOICE',
          parent: GlobalVars.liveStatusCategoryId
        })
        .then(({ id: channelId }) =>
          liveStatusdb.post('/', {
            type,
            value,
            channelId
          })
        );

      return interaction.reply({ content: `${ytChannel.author} added to server's live status`, ephemeral });

    case 'twitch':
    // TODO

    default:
      return interaction.reply({ content: 'Invalid type', ephemeral });
  }
};

export default liveStatus;
