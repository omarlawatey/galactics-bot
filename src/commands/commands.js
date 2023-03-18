import { liveStatus } from './commandsFunction/index.js';

const commands = interaction => {
  liveStatus(interaction);
};

export default commands;
