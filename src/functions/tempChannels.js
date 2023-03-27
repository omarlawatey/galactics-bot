import { tempChannelsdb } from '../apis';
import { createChannel, userActivity } from '../assets/helperFunctions';

const tempChannels = async (oldState, newState, guild, tempChannel) => {
  let activity = await userActivity(newState?.member);
  const editVc = await guild.channels.cache.get(tempChannel.editVc);
  let tempChannelVc = await guild.channels.cache.get(tempChannel.vcGenerator);

  if (newState?.channel?.parentId === tempChannel.categoryId) {
    editVc.permissionOverwrites.edit(newState?.member?.id, {
      VIEW_CHANNEL: true,
      SEND_MESSAGES: true
    });

    if (newState?.channel?.id !== tempChannel.vcGenerator)
      newState?.channel.permissionOverwrites.edit(newState?.member?.id, {
        SEND_MESSAGES: true,
        READ_MESSAGE_HISTORY: true
      });
  }

  if (newState?.channel?.id === tempChannel.vcGenerator)
    createChannel(newState, activity, tempChannel).then(() =>
      tempChannelVc.permissionOverwrites
        .edit(newState?.member?.id, { CONNECT: false, SEND_MESSAGES: false, READ_MESSAGE_HISTORY: false })
        .then(_ => setTimeout(() => tempChannelVc.permissionOverwrites.delete(newState?.member?.id), 3000))
    );

  if (oldState?.channel?.parentId === tempChannel.categoryId) {
    if (newState?.channel?.parentId !== tempChannel.categoryId) {
      editVc.permissionOverwrites.delete(oldState?.member?.id);

      // oldState?.channel?.permissionOverwrites.delete(oldState?.member?.id);
    }

    if (tempChannelVc.id !== oldState?.channel?.id && oldState?.channel?.members.size === 0) {
      const oldDbVc = await (await tempChannelsdb.get(`?channelId=${oldState?.channel?.id}`)).data[0];

      oldState.channel.delete().then(_ => tempChannelsdb.delete(`/${oldDbVc.id}`));
    }
  }
};

export default tempChannels;
