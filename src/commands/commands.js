import { liveStatus, clear, slowMode, avatar, diceRoll, user, serverInfo } from './commandsFunction';

const commands = interaction => {
  liveStatus(interaction);
  clear(interaction);
  slowMode(interaction);
  avatar(interaction);
  diceRoll(interaction);
  user(interaction);
  serverInfo(interaction);
};

export default commands;
