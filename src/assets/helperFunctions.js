import { Permissions } from 'discord.js';
import youtube from '../apis/youtube';

export const urlFinder = (url, regex) => regex.test(url.toLowerCase());

export const difference = (arr1, arr2) => arr1.filter(x => !arr2.includes(x));

export const createChannel = (newState, activityName, tempChannel) =>
  newState.guild?.channels
    .create(activityName, {
      type: 'GUILD_VOICE',
      parent: newState?.channel?.parent?.id
    })
    .then(vc => {
      newState.member.voice.setChannel(vc);
      vc.permissionOverwrites.set([
        ...tempChannel.editChannelId.baseRoles,
        {
          id: newState.member.id,
          allow: [Permissions.FLAGS.CONNECT]
        }
      ]);
    });

export const channelArranger = (arr, guild, categoryId, restrictedChannels) => {
  const uniqueValues = [...new Set(findDuplicates(arr))];

  const filterdChannels = uniqueValues.map(item =>
    guild?.channels.cache
      .filter(
        channel =>
          channel.name.includes(item) && channel?.parent?.id === categoryId && !restrictedChannels.includes(channel?.id)
      )
      .map(i => i)
  );

  filterdChannels.forEach((tempChannels, tempsIndex) => {
    tempChannels.forEach((tempChannel, tempIndex) => {
      try {
        tempChannel ? tempChannel.setName(`${uniqueValues[tempsIndex]}${tempIndex === 0 ? '' : ` ${tempIndex}`}`) : '';
      } catch (err) {
        console.log('channel rearanger ' + err);
      }
    });
  });
};

export const userActivitey = newState => {
  const activities = newState?.member?.presence?.activities;
  if (!activities || activities?.length === 0 || (activities?.[0]?.name === 'Custom Status' && !activities?.[1]?.name))
    return `⌬｜Talking`;
  // ${fontGenerator(selectServer(newState.guild.id), )};
  else {
    const activityName = activities?.[0]?.name === 'Custom Status' ? activities?.[1]?.name : activities?.[0]?.name;

    return `⌬｜${activityName}`;
    // fontGenerator(selectServer(newState.guild.id));
  }
};

export const findDuplicates = arr => {
  return arr.map(name =>
    Number(name.split('')[name.split('').length - 1]) ? name.split('').slice(0, -1).join('').trim() : name
  );
};

export const getCounter = async (guild, type, value) => {
  switch (type) {
    case 'role':
      const role = await guild.roles.cache.get(value);
      return role.members.map(i => i).length;
    case 'yt':
      const ytChannel = await youtube(value);
      return ytChannel.subscriberCount;

    case 'twitch':
    // TODO

    default:
      return 'NOT FOUND';
  }
};
