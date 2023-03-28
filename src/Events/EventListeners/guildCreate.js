import { GuildUpdate } from '../../DataBase/SchemasUpdaters';

const guildCreate = client => {
  client.on('guildCreate', guild => {
    GuildUpdate(guild, {
      type: ''
    });
  });
};

export default guildCreate;
