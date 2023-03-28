import { GlobalVars } from '../assets/GlobalVars';

const tempChannelsCommands = async (user, message) => {
  const messageContent = message.content.toLowerCase().split(' ');
  const users = [...message.mentions.users.map(i => i), ...message.mentions.roles.map(i => i)];

  switch (messageContent[0]) {
    case 'lock':
      if (users.length) {
        users.forEach(item =>
          user.voice.channel.permissionOverwrites.edit(item.id, {
            CONNECT: false
          })
        );
        break;
      }

      const vcPermissionsL = [
        ...GlobalVars.generalRoles.map(({ id }) => ({
          id,
          CONNECT: false
        })),
        ...user.voice.channel.members.map(({ id }) => ({
          id,
          CONNECT: true
        }))
      ];

      vcPermissionsL.forEach(({ id, CONNECT }) => user.voice.channel.permissionOverwrites.edit(id, { CONNECT }));
      break;

    case 'unlock':
      if (users.length) {
        users.forEach(item =>
          user.voice.channel.permissionOverwrites.edit(item.id, {
            CONNECT: true
          })
        );
        break;
      }

      let vcPermissionsU = [
        ...GlobalVars.generalRoles.map(({ id }) => ({
          id,
          CONNECT: true
        })),
        ...user.voice.channel.members.map(({ id }) => ({
          id,
          CONNECT: true
        }))
      ];

      vcPermissionsU.forEach(({ id, CONNECT }) => user.voice.channel.permissionOverwrites.edit(id, { CONNECT }));
      break;

    case 'hide':
      if (users.length) {
        users.forEach(item =>
          user.voice.channel.permissionOverwrites.edit(item.id, {
            VIEW_CHANNEL: false
          })
        );
        break;
      }

      let vcPermissionsH = [
        ...GlobalVars.generalRoles.map(({ id }) => ({
          id,
          VIEW_CHANNEL: false
        })),
        ...user.voice.channel.members.map(({ id }) => ({
          id,
          VIEW_CHANNEL: true
        }))
      ];

      vcPermissionsH.forEach(({ id, VIEW_CHANNEL }) =>
        user.voice.channel.permissionOverwrites.edit(id, { VIEW_CHANNEL })
      );
      break;

    case 'show':
      if (users.length) {
        users.forEach(item =>
          user.voice.channel.permissionOverwrites.edit(item.id, {
            VIEW_CHANNEL: true
          })
        );
        break;
      }

      let vcPermissionsS = [
        ...GlobalVars.generalRoles.map(({ id }) => ({
          id,
          VIEW_CHANNEL: true
        })),
        ...user.voice.channel.members.map(({ id }) => ({
          id,
          VIEW_CHANNEL: true
        }))
      ];

      vcPermissionsS.forEach(({ id, VIEW_CHANNEL }) =>
        user.voice.channel.permissionOverwrites.edit(id, { VIEW_CHANNEL })
      );
      break;

    case 'reset':
      user.voice.channel.lockPermissions();
      user.voice.channel.members
        .map(i => i)
        .forEach(({ id }) =>
          user.voice.channel.permissionOverwrites.edit(id, {
            VIEW_CHANNEL: true,
            CONNECT: true,
            SEND_MESSAGES: true,
            READ_MESSAGE_HISTORY: true
          })
        );

      break;

    default:
      message
        .reply({
          content: `${message.author} Unknown Command. Please use one of the commands above`,
          ephemeral: true
        })
        .then(msg => setTimeout(() => msg.delete(), 3500));

      break;
  }

  setTimeout(() => message.delete(), 500);
};

export default tempChannelsCommands;
