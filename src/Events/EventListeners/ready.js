import DiscordJS from 'discord.js';

import { GlobalVars, testMode } from '../../assets/GlobalVars';
import { commandsCreate } from '../../commands';

const ready = client => {
  client.on('ready', async () => {
    let guild = await client.guilds.cache.get(GlobalVars.guildId);
    let commands = guild?.commands;

    // Command Creation
    commandsCreate(commands, DiscordJS);

    console.log(`Test Mode is set to ${testMode}`);
    console.log(`Logged in as ${client.user.tag}`);
    console.log('The Bot Is Ready');
  });
};

export default ready;
