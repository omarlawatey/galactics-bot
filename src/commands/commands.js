import { liveStatus, clear, slowMode, avatar, diceRoll, user } from './commandsFunction';

const commands = interaction => {
  liveStatus(interaction);
  clear(interaction);
  slowMode(interaction);
  avatar(interaction);
  diceRoll(interaction);
  user(interaction);
};

export default commands;
