import { GlobalVars } from '../assets/GlobalVars';
import { difference } from '../assets/helperFunctions';

const roleWatcher = async (activeMember, oldState, newState) => {
  let oldDifference = oldState.roles.cache.map(i => i.id);
  let newDifference = newState.roles.cache.map(i => i.id);

  if (difference(oldDifference, newDifference).length > 0 || difference(newDifference, oldDifference).length > 0) {
    const roleSpreadersIndexes = GlobalVars.roleSpreaders.map(roleId => activeMember?.guild.roles.cache.get(roleId));

    const rolesAdded = difference(oldDifference, newDifference);
    if (rolesAdded.length) {
      rolesAdded.forEach(async changedRole => {
        const addedRole = activeMember.guild.roles.cache.get(changedRole);

        for (let i = 0; i < roleSpreadersIndexes.length; i++) {
          if (
            roleSpreadersIndexes[i]?.rawPosition < addedRole?.rawPosition &&
            addedRole?.rawPosition <= roleSpreadersIndexes[i - 1]?.rawPosition
          ) {
            if (
              (await activeMember.roles.cache
                .map(i => i)
                .filter(
                  role =>
                    roleSpreadersIndexes[i]?.rawPosition < role?.rawPosition &&
                    role?.rawPosition < roleSpreadersIndexes[i - 1]?.rawPosition
                ).length) >= 2
            )
              break;

            activeMember.roles.remove(roleSpreadersIndexes[i - 1]);
          }
        }
      });
    }

    const rolesRemoved = difference(newDifference, oldDifference);
    if (rolesRemoved.length) {
      rolesRemoved.forEach(async changedRole => {
        const removedRole = activeMember.guild.roles.cache.get(changedRole);

        for (let i = 0; i < roleSpreadersIndexes.length; i++) {
          if (
            roleSpreadersIndexes[i]?.rawPosition < removedRole?.rawPosition &&
            removedRole?.rawPosition <= roleSpreadersIndexes[i - 1]?.rawPosition
          ) {
            activeMember.roles.add(roleSpreadersIndexes[i - 1]);
          }
        }
      });
    }
  }
};

export default roleWatcher;
