import { welcome } from '../../functions';
import { GlobalVars } from '../../assets/GlobalVars';

const guildMemberAdd = client => {
  client.on('guildMemberAdd', member => {
    // If User is a bot
    if (member.user.bot) {
      // autoRole
      member.roles.add(GlobalVars.botsRole);

      return;
    }

    // Welcome new members
    welcome(member.guild.channels.cache.get(GlobalVars.welcomeChannel), member);
    member.roles.add(GlobalVars.membersRole);
  });
};

export default guildMemberAdd;
