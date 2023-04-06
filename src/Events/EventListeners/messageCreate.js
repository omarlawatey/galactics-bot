import { GlobalVars } from '../../assets/GlobalVars';
import { linksBlocker, tempChannelsCommands } from '../../functions';

const messageCreate = client => {
  client.on('messageCreate', message => {
    if (message.author.bot) return;

    // if (message.channel.id === '1091378896634642493') {
    //   message.guild.channels.cache.get('1086033689143676981').send({ ...message });
    // }

    // linksBlocker(message);

    GlobalVars.tempChannels.forEach(async tempChannel => {
      const guild = await client.guilds.cache.get(GlobalVars.serverId);
      const user = await guild.members.cache.get(message.author.id);

      if (message.channel?.parentId !== tempChannel.categoryId || message.channel.id !== tempChannel.editVc) return;
      if (!user.voice.channel) return setTimeout(() => message.delete(), 500);

      tempChannelsCommands(user, message);
    });
  });
};

export default messageCreate;
