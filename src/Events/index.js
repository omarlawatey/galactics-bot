import {
  ready,
  messageCreate,
  interactionCreate,
  voiceStateUpdate,
  guildMemberUpdate,
  guildMemberAdd,
  guildCreate
} from './EventListeners';
import { tempChannels } from './TimedEventListeners';
import { MongoDB } from './FunctionsSetupsListeners';

const index = client => {
  // Action Listeners
  ready(client);
  messageCreate(client);
  interactionCreate(client);
  guildMemberUpdate(client);
  guildMemberAdd(client);
  voiceStateUpdate(client);
  guildCreate(client);

  // Functions Setups
  MongoDB();

  // Timed Actions
  tempChannels(client);
};

export default index;
