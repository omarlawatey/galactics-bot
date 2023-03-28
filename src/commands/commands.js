import { liveStatus, clear, slowMode, avatar, diceRoll } from './commandsFunction';

const commands = interaction => {
  liveStatus(interaction);
  clear(interaction);
  slowMode(interaction);
  avatar(interaction);
  diceRoll(interaction);
};

export default commands;
