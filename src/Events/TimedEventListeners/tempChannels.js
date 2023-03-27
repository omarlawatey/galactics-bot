import ms from 'ms';
import { tempChannelsdb } from '../../apis';
import { GlobalVars } from '../../assets/GlobalVars';
import { channelArranger } from '../../assets/helperFunctions';

const tempChannels = client => {
  const server = GlobalVars;

  setTimeout(async () => {
    const guild = client.guilds.cache.get(server.serverId);
    server.tempChannels.forEach(async tempChannelInfo => {
      const tempChannelsCategory = await guild?.channels?.cache?.get(tempChannelInfo.categoryId);
      if (!tempChannelsCategory) return;
      const tempChannelsChildren = await tempChannelsCategory.children.map(i => i);

      tempChannelsChildren.forEach(async channel => {
        if (tempChannelInfo.editVc === channel.id || tempChannelInfo.vcGenerator === channel.id) return;
        const dbChannel = await (await tempChannelsdb.get(`?channelId=${channel.id}`)).data;
        if (channel?.members?.size === 0 && dbChannel.length)
          return channel?.delete().then(_ => tempChannelsdb.delete(`/${dbChannel[0].id}`));
      });
    });
  }, ms('3s'));

  setInterval(() => {
    const guild = client.guilds.cache.get(server.serverId);

    server.tempChannels.forEach(async tempChannelInfo => {
      const tempChannelsCategory = await guild?.channels?.cache?.get(tempChannelInfo.categoryId);
      if (!tempChannelsCategory) return;
      const tempChannelsChildren = await tempChannelsCategory.children.map(i => i);

      tempChannelsChildren.forEach(async channel => {
        if (tempChannelInfo.editVc === channel.id || tempChannelInfo.vcGenerator === channel.id) return;
        if (channel.members.size !== 0) return;

        setTimeout(async () => {
          const dbChannel = await (await tempChannelsdb.get(`?channelId=${channel.id}`)).data;
          if (channel?.members?.size !== 0 || dbChannel.length) return;
          channel?.delete();
        }, ms('4s'));
      });

      channelArranger(
        tempChannelsChildren
          .filter(channel => !(tempChannelInfo.editVc === channel.id || tempChannelInfo.vcGenerator === channel.id))
          .map(({ name }) => name),
        guild,
        tempChannelInfo.categoryId,
        [tempChannelInfo.editVc, tempChannelInfo.vcGenerator]
      );

      (await guild.channels.cache.get(tempChannelInfo.vcGenerator).members.map(i => i)).forEach(member =>
        member.voice.setChannel(null)
      );
    });
  }, ms('6s'));
};

export default tempChannels;
