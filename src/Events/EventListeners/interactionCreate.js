import { GlobalVars } from '../../assets/GlobalVars';
import { commands } from '../../commands';

const interactionCreate = client => {
  client.on('interactionCreate', async interaction => {
    if (interaction.guild.id !== GlobalVars.serverId || !interaction.isCommand()) return;

    // Commands Functions
    commands(interaction);
  });
};

export default interactionCreate;
