import { ready, messageCreate, interactionCreate, guildMemberAdd, voiceStateUpdate } from './EventListeners';
import { MongoDB } from './FunctionsSetupsListeners';
import { tempChannels } from './TimedEventListeners';

const index = client => {
  // Action Listeners
  ready(client);
  messageCreate(client);
  // interactionCreate(client);
  // guildMemberAdd(client);
  voiceStateUpdate(client);

  // Functions Setups
  // MongoDB();

  // Timed Actions
  tempChannels(client);
};

export default index;
