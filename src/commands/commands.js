import { liveStatus, clear, slowMode, avatar } from './commandsFunction';

const commands = interaction => {
  liveStatus(interaction);
  clear(interaction);
  slowMode(interaction);
  avatar(interaction);
};

export default commands;
