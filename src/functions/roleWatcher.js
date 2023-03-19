import { GlobalVars } from '../assets/GlobalVars';
import { difference } from '../assets/helperFunctions';

const roleWatcher = async (activeMember, oldState, newState) => {
  let oldDifference = oldState.roles.cache.map(i => i.id);
  let newDifference = newState.roles.cache.map(i => i.id);

  const changedRole = difference(oldDifference, newDifference).length
    ? activeMember.guild.roles.cache.get(difference(oldDifference, newDifference)[0])
    : activeMember.guild.roles.cache.get(difference(newDifference, oldDifference)[0]);

  if (difference(oldDifference, newDifference).length > 0 || difference(newDifference, oldDifference).length > 0) {
    const roleSpreadersIndexes = GlobalVars.roleSpreaders.map(roleId => activeMember?.guild.roles.cache.get(roleId));

    if (difference(oldDifference, newDifference).length) {
      for (let i = 0; i < roleSpreadersIndexes.length; i++) {
        if (
          roleSpreadersIndexes[i]?.rawPosition < changedRole?.rawPosition &&
          changedRole?.rawPosition <= roleSpreadersIndexes[i - 1]?.rawPosition
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
            return;

          activeMember.roles.remove(roleSpreadersIndexes[i - 1]);
        }
      }
    }

    if (difference(newDifference, oldDifference).length) {
      for (let i = 0; i < roleSpreadersIndexes.length; i++) {
        if (
          roleSpreadersIndexes[i]?.rawPosition < changedRole?.rawPosition &&
          changedRole?.rawPosition <= roleSpreadersIndexes[i - 1]?.rawPosition
        ) {
          activeMember.roles.add(roleSpreadersIndexes[i - 1]);
        }
      }
    }

    activeMember.roles.cache.filter(role => role.rawPosition);
  }
};

export default roleWatcher;
