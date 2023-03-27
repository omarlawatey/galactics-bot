import { GlobalVars } from '../assets/GlobalVars';
import { difference } from '../assets/helperFunctions';

const recording = (oldState, newState, guild) => {
  if (newState?.channel?.id === GlobalVars.youTube.recordingChannelId) {
    const member = guild.members.cache.get(newState.member.id);

    if (member.roles.cache.filter(role => GlobalVars.youTube.membersRoles.includes(role.id)).map(i => i).length)
      member.roles.add(GlobalVars.youTube.recordingMod);

    newState.member.roles.add(GlobalVars.youTube.recordingRole);
  }

  if (oldState?.channel?.id === GlobalVars.youTube.recordingChannelId) {
    oldState.member.roles.remove(GlobalVars.youTube.recordingRole);
    oldState.member.roles.remove(GlobalVars.youTube.recordingMod);
  }
};

export default recording;
