import { GlobalVars } from '../../assets/GlobalVars';
import { linksBlocker, tempChannelsCommands } from '../../functions';

const messageCreate = client => {
  client.on('messageCreate', message => {
    if (message.author.bot) return;

    linksBlocker(message);

    GlobalVars.tempChannels.forEach(tempChannel => {
      if (message?.channel?.parent?.id === tempChannel.tempCategoryId) {
        const { id, baseRoles } = tempChannel.editChannelId;
        if (message.channel?.parent?.id !== tempChannel.tempCategoryId) return;
        if (message.author.bot || message.channel.id !== id) return;

        const guild = client.guilds.cache.get(GlobalVars.serverId);
        const user = guild.members.cache.get(message.author.id);

        tempChannelsCommands(user, message, id, baseRoles, tempChannel);
      }
    });
  });
};

export default messageCreate;
