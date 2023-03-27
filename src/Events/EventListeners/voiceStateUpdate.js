import { GlobalVars } from '../../assets/GlobalVars';
import { recording, tempChannels } from '../../functions';

const voiceStateUpdate = client => {
  client.on('voiceStateUpdate', async (oldState, newState) => {
    // if (oldState.id === client.user.id) {
    //   if (oldState.channel && !newState.channel) {
    //     const queue = await client.player.getQueue(oldState.guild.id || newState.guild.id);

    //     if (queue) {
    //       queue?.lastSongMessage?.reactions?.removeAll();
    //       queue.isPlaying = false;
    //     }

    //     queue?.clear();
    //   }
    // }

    // If User is a bot
    if (newState.member.user.bot) return;

    // Server Selection
    const guild = client.guilds.cache.get(newState.guild.id || oldState.guild.id);

    if (!guild) return;

    GlobalVars.tempChannels.forEach(tempChannel => {
      if (
        oldState?.channel?.parent?.id === tempChannel.categoryId ||
        newState?.channel?.parent?.id === tempChannel.categoryId
      )
        tempChannels(oldState, newState, guild, tempChannel);
    });

    recording(oldState, newState, guild);
  });
};

export default voiceStateUpdate;
