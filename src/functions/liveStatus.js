import ms from 'ms';
import { liveStatusdb } from '../apis';
import { GlobalVars } from '../assets/GlobalVars';
import { getCounter } from '../assets/helperFunctions';

const liveStatus = async guild => {
  setInterval(async () => {
    const liveStatusCategory = await guild.channels.cache.get(GlobalVars.liveStatusCategoryId);
    if (!liveStatusCategory) return;

    const dbLiveStatus = await (await liveStatusdb.get('/')).data;

    const activeLiveStatus = dbLiveStatus.filter(dbItem =>
      liveStatusCategory.children.map(({ name, id }) => ({ name, id })).some(channel => channel.id === dbItem.channelId)
    );

    activeLiveStatus.forEach(async ({ channelId, type, value }) => {
      const channel = await guild.channels.cache.get(channelId);
      const channelNameSeparated = channel.name.split(' ');

      await channel?.setName(
        `${
          channelNameSeparated.length === 1
            ? channelNameSeparated.join('') + ':'
            : channelNameSeparated.slice(0, channelNameSeparated.length - 1).join(' ')
        } ${await getCounter(guild, type, value)}`
      );
    });

    const inActiveLiveStatus = dbLiveStatus.filter(
      dbItem =>
        !liveStatusCategory.children
          .map(({ name, id }) => ({ name, id }))
          .some(channel => channel.id === dbItem.channelId)
    );

    inActiveLiveStatus.forEach(({ id }) => {
      liveStatusdb.delete(`/${id}`);
    });
  }, ms('10s'));
};

export default liveStatus;
