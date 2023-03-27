import { liveStatus, clear } from './commandsFunction';

const commands = interaction => {
  liveStatus(interaction);
  clear(interaction);
};

export default commands;
