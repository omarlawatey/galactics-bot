// import { calculateLevelMaxXp, CheckSentenceIndex } from '../assets/helperFunctions';
// import { LevelUpdate } from '../DataBase/SchemasUpdaters';

// const LevelSystem = async ({ content, author, guild }) => {
//   const user = await LevelUpdate(guild, author, { type: '' });

//   const LevelMaxXp = calculateLevelMaxXp(user.level);
//   let messageTotalXp = CheckSentenceIndex(content) <= 0 ? 1 : CheckSentenceIndex(content);

//   if (user.xp + messageTotalXp >= LevelMaxXp) {
//     await LevelUpdate(guild, author, {
//       type: 'levelUp',
//       level: user.level + 1,
//       xp: user.xp + messageTotalXp - LevelMaxXp
//     });
//     return;
//   }

//   await LevelUpdate(guild, author, {
//     type: 'levelUp',
//     level: user.level,
//     xp: user.xp + messageTotalXp
//   });
// };

// export default LevelSystem;
