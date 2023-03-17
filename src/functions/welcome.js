// import { MessageAttachment } from 'discord.js';
// import { GuildData, privateMessageServerData, UserData, welcomeImage } from '../assets/subFunctions';
// import { UserSchema } from '../DataBase';

const Welcome = (welcomeChannel, member) => {
  welcomeChannel.send(`Welcome <@${member.id}>`);
};

export default Welcome;
