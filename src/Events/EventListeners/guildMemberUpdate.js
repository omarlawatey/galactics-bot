import { roleWatcher } from '../../functions';

const guildMemberUpdate = client => {
  client.on('guildMemberUpdate', async (oldState, newState) => {
    const activeMember = oldState || newState;

    // Role Watcher Function
    roleWatcher(activeMember, oldState, newState);

    // If User is a bot
    if (newState.user.bot) return;

    // Boost Detection Function
    // Welcome Message
    // if (oldState.pending && !newState.pending) {
    //   const welcomeChannel = activeMember.guild.channels.cache.get(server.welcome.Id);
    //   Welcome(server, welcomeChannel, activeMember);
    // }
  });
};

export default guildMemberUpdate;
