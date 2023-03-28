import { MessageAttachment } from 'discord.js';
import { GlobalVars } from '../assets/GlobalVars';
import { updateLastWelcomed, welcomeImage } from '../assets/helperFunctions';
import UserUpdate from '../DataBase/SchemasUpdaters/UserUpdate';

const Welcome = async member => {
  // Handle Bots joining
  if (member.user.bot)
    return GlobalVars.generalRoles.forEach(role => (role.name === 'bots' ? member.roles.add(role.id) : ''));

  // Get's the welcome channel obj
  const welcomeChannel = member.guild.channels.cache.get(GlobalVars.welcome.channelId);

  // Update user's data
  UserUpdate(member.guild, member, { type: '' });

  // Handles user's roles
  GlobalVars.generalRoles.forEach(role => (role.name === 'members' ? member.roles.add(role.id) : ''));

  // return if the user has already welcomed recently
  if (await updateLastWelcomed(member)) return;

  const welcomeImageRendered = await welcomeImage(
    member,
    'https://github.com/omarlawatey/galactics-bot/blob/main/Images/WelcomeV2.png?raw=true'
  );

  // https://github.com/omarlawatey/galactics-bot/blob/main/Images/WelcomeV2.png?raw=true
  welcomeChannel.send({ files: [new MessageAttachment(welcomeImageRendered, 'welcome-image.png')] }).then(msg => {
    msg.channel.send({ content: GlobalVars.welcome.welcomeDescription(member, member.guild.memberCount) });

    // TODO
    // author.send({ embeds: [new MessageEmbed().setColor('PURPLE').setDescription(GlobalVars.welcome.privateMessage)] });
  });
};

export default Welcome;
