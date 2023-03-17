import { GlobalVars } from '../../assets/GlobalVars';
import { tempChannels } from '../../functions';

const voiceStateUpdate = client => {
  client.on('voiceStateUpdate', async (oldState, newState) => {
    if (oldState.id === client.user.id) {
      if (oldState.channel && !newState.channel) {
        const queue = await client.player.getQueue(oldState.guild.id || newState.guild.id);

        if (queue) {
          queue?.lastSongMessage?.reactions?.removeAll();
          queue.isPlaying = false;
        }

        queue?.clear();
      }
    }

    // If User is a bot
    if (newState.member.user.bot) return;

    // Server Selection
    const guild = client.guilds.cache.get(newState.guild.id || oldState.guild.id);

    if (!guild) return;

    GlobalVars.tempChannels.forEach(tempChannel => {
      if (
        oldState?.channel?.parent?.id === tempChannel.tempCategoryId ||
        newState?.channel?.parent?.id === tempChannel.tempCategoryId
      )
        tempChannels(oldState, newState, guild, tempChannel, tempChannel.restrictedChannels);
    });
  });
};

export default voiceStateUpdate;
