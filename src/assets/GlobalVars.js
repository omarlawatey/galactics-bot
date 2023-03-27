import { Permissions } from 'discord.js';
import DotEnv from 'dotenv';

DotEnv.config();

export const testMode = process.env.TESTMODE ? process.env.TESTMODE : false;

export const GlobalVars = !testMode
  ? // Real Server
    {
      prefix: 'gt!',
      serverId: '673700884617625621',
      generalRoles: [{ name: 'member', id: '977876896010338354' }],
      roleSpreaders: [
        '1083771433953542208',
        '1083771976155406537',
        '1083807856157003816',
        '1083772395090874439',
        '1083773117773656074',
        '1083773120487362751',
        '1083773587460202577',
        '1083772546375233607',
        '1083774617392521256',
        '978052706222620782',
        '1001622113603571732',
        '978049246269943918',
        '978049299428548608',
        '978049586293796914'
      ],
      tempChannels: [
        {
          categoryId: '1042920270903648326',
          editVc: '1042921652406722640',
          vcGenerator: '1086414865108848690'
        }
      ],
      liveStatusCategoryId: '978334872772947968',
      youTube: {
        recordingChannelId: '1085996315470737459',
        membersRoles: ['1083772544877862972', '1083772542747168829'],
        recordingRole: '1089735583716343949',
        recordingMod: '1089735737450172497'
      }
    }
  : // Testing Server
    {
      prefix: 'gt!',
      serverId: '1086033687109455982',
      generalRoles: [{ name: 'members', id: '1086033687109455989' }],
      liveStatusCategoryId: '1086033688871063667',
      roleSpreaders: [
        '1086033687201726635',
        '1086033687184937048',
        '1086033687184937045',
        '1086033687184937045',
        '1086033687168176157',
        '1086033687168176154',
        '1086033687168176152',
        '1086033687168176149',
        '1086033687147200639',
        '1086033687147200635',
        '1086033687130411096',
        '1086033687130411094',
        '1086033687130411089',
        '1086033687109455991'
      ],
      tempChannels: [
        {
          categoryId: '1086033689420513480',
          editVc: '1086936466288021544',
          vcGenerator: '1086936495232913479'
        }
      ],
      youTube: {
        recordingChannelId: '1086033688871063666',
        membersRoles: ['1086033687168176156', '1086033687168176155'],
        recordingRole: '1089721694723264512',
        recordingMod: '1089727009376190595'
      }

      // logsChannelsId: '981359676560130079',
      // teamRole: '1086033687130411097',
      // moderationChannel: '1084043764588351508',
      // autoResponse: [
      //   {
      //     command: 'yt',
      //     response: `https://youtube.com/@galacticsyt`
      //   }
      // ],
      // commandsChannel: '950086892160946246',
      // welcome: {
      //   Id: '941665272811630632',
      //   autoRole: ['952242871854063669'],
      //   botsRole: ['941783311104245810'],
      //   welcomePrivateMessage: ``
      // },
      // rulesChannelId: '941633613538132008',

      // boostChannelId: '981359676560130079',
      // linkBlockerChannels: [
      //   '941633472764715058',
      //   '941383631157461002',
      //   '950088308736807012',
      //   '950088308736807012',
      //   '941773618268995624',
      //   '986423629145333800'
      // ]
    };
