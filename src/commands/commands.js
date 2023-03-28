import { liveStatus, clear, slowMode } from './commandsFunction';

const commands = interaction => {
  liveStatus(interaction);
  clear(interaction);
  slowMode(interaction);
};

export default commands;
