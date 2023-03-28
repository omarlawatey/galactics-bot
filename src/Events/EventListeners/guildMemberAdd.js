import { welcome } from '../../functions';

const guildMemberAdd = client => {
  client.on('guildMemberAdd', member => {
    // Welcome new members
    welcome(member);
  });
};

export default guildMemberAdd;
