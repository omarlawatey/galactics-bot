import Canvas from '@napi-rs/canvas';
import Jimp from 'jimp';
import { lastWelcomeddb, tempChannelsdb } from '../apis';
import youtube from '../apis/youtube';

export const urlFinder = (url, regex) => regex.test(url.toLowerCase());

export const difference = (arr1, arr2) => arr1.filter(x => !arr2.includes(x));

export const createChannel = (newState, activityName) =>
  newState.guild?.channels
    .create(activityName, {
      type: 'GUILD_VOICE',
      parent: newState?.channel?.parent?.id
    })
    .then(vc => {
      tempChannelsdb.post('/', {
        channelId: vc.id,
        creator: newState.member.id
      });
      vc.lockPermissions();
      newState.member.voice.setChannel(vc);
    });

export const channelArranger = (arr, guild, categoryId, restrictedChannels) => {
  const uniqueValues = [...new Set(findDuplicates(arr))];

  const filteredChannels = uniqueValues.map(item =>
    guild?.channels.cache
      .filter(
        channel =>
          channel.name.includes(item) && channel?.parent?.id === categoryId && !restrictedChannels.includes(channel?.id)
      )
      .map(i => i)
  );

  filteredChannels.forEach((tempChannels, tempsIndex) =>
    tempChannels.forEach((tempChannel, tempIndex) =>
      tempChannel ? tempChannel.setName(`${uniqueValues[tempsIndex]}${tempIndex === 0 ? '' : ` ${tempIndex}`}`) : ''
    )
  );
};

export const userActivity = async member => {
  const activities = await member?.presence?.activities;
  if (!activities || (activities?.length === 1 && activities?.[0]?.id === 'custom')) return `⌬｜talking`;

  if (activities.length)
    return `⌬｜${
      activities?.[0]?.id === 'custom' ? activities?.[1].name.toLowerCase() : activities?.[0].name.toLowerCase()
    }`;
  return `⌬｜talking`;
};

export const findDuplicates = arr =>
  arr.map(name =>
    Number(name.split('')[name.split('').length - 1]) ? name.split('').slice(0, -1).join('').trim() : name
  );

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

export const updateLastWelcomed = async user => {
  const oldData = await (await lastWelcomeddb.get('/')).data;
  const welcomedList = await oldData.map(({ userId }) => userId);

  if (welcomedList.includes(user.id)) return true;

  if (welcomedList.length >= 3) await lastWelcomeddb.delete(`/${oldData[0].id}`);

  await lastWelcomeddb.post('/', { userId: user.id });

  return false;
};

export const welcomeImage = async (member, link) => {
  const canvas = Canvas.createCanvas(500, 190);
  const ctx = canvas.getContext('2d');
  const fixedbkg = await Canvas.loadImage(link);

  ctx.drawImage(fixedbkg, 0, 0, 500, 190);

  let image = await Jimp.read(
    member.user.displayAvatarURL({
      format: 'jpg',
      dynamic: true
    })
  );

  image.resize(512, 512);
  image.circle();
  let raw = await image.getBufferAsync('image/png');

  const avatar = await Canvas.loadImage(raw);
  // Draw a shape onto the main canvas
  ctx.drawImage(avatar, 197, 33, 106, 106);

  return canvas.encode('png');
};
