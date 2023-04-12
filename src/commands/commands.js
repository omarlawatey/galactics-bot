import { liveStatus, clear, slowMode, avatar, diceRoll, user, serverInfo } from './commandsFunction';

const commands = interaction => {
  switch (interaction.commandName) {
    case 'live-status':
      liveStatus(interaction);
      break;

    case 'clear':
      clear(interaction);
      break;

    case 'slow-mode':
      slowMode(interaction);
      break;

    case 'avatar':
      avatar(interaction);
      break;

    case 'roll-dice':
      diceRoll(interaction);
      break;

    case 'user':
      user(interaction);
      break;

    case 'server-info':
      serverInfo(interaction);
      break;
  }
};

export default commands;
