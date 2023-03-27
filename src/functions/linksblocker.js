import { GlobalVars } from '../assets/GlobalVars';
import { urlFinder } from '../assets/helperFunctions';

const linkBlocker = async message => {
  const links = {
    discordInvites:
      /(https?:\/\/)?(www\.)?(discord\.(gg|io|me|li|club)|discordapp\.com\/invite|discord\.com\/invite)\/.+[a-z]/gi,
    urls: /(?:(?:https?|ftp):\/\/|\b(?:[a-z\d]+\.com))(?:(?:[^\s()<>]+|\((?:[^\s()<>]+|(?:\([^\s()<>]+\)))?\))+(?:\((?:[^\s()<>]+|(?:\(?:[^\s()<>]+\)))?\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))?/
  };

  if (
    !message?.content.includes('gif') &&
    urlFinder(message?.content.split('\\').join(''), links?.discordInvites) &&
    !message?.embeds?.map(i => i?.type)[0].includes('gif')
  ) {
    message
      ?.reply({
        content: 'Server invites is not allowed in chat',
        ephemeral: true
      })
      ?.then(msg => {
        message?.delete();
        setTimeout(() => {
          msg?.delete();
        }, 5000);
      });

    message.guild.channels.cache
      .get(GlobalVars.logsChannel)
      .send({ content: `<@${message.author.id}> sent ${message?.content} ` });

    return;
  }

  if (
    urlFinder(message?.content.split('\\').join(''), links?.urls) &&
    !message?.embeds?.map(i => i?.type)[0].includes('gif')
  ) {
    message
      ?.reply({
        content: 'Links is not allowed in chat',
        ephemeral: true
      })
      ?.then(msg => {
        message?.delete();
        setTimeout(() => {
          msg?.delete();
        }, 5000);
      });

    message.guild.channels.cache
      .get(GlobalVars.logsChannel)
      .send({ content: `<@${message.author.id}> sent ${message?.content}` });

    return;
  }
};

export default linkBlocker;
