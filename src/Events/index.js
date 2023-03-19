import { ready, messageCreate, interactionCreate, voiceStateUpdate, guildMemberUpdate } from './EventListeners';
import { tempChannels } from './TimedEventListeners';

const index = client => {
  // Action Listeners
  ready(client);
  messageCreate(client);
  interactionCreate(client);
  guildMemberUpdate(client);
  // guildMemberAdd(client);
  voiceStateUpdate(client);

  // Functions Setups
  // MongoDB();

  // Timed Actions
  tempChannels(client);
};

export default index;
