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
        '1083807856157003816',
        '1083771976155406537',
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
          tempCategoryId: '1042920270903648326',
          restrictedChannels: ['1042921652406722640', '1086414865108848690'],
          editChannelId: {
            id: '1042921652406722640',
            baseRoles: [
              {
                id: '673700884617625621',
                deny: [Permissions.FLAGS.VIEW_CHANNEL]
              },
              {
                id: '977876896010338354',
                allow: [Permissions.FLAGS.VIEW_CHANNEL]
              },
              {
                id: '978048610195341332',
                allow: [Permissions.FLAGS.VIEW_CHANNEL]
              },
              {
                id: '934920779013980220',
                allow: [Permissions.FLAGS.VIEW_CHANNEL]
              }
            ]
          }
        }
      ],
      liveStatusCategoryId: '978334872772947968'
    }
  : // Testing Server
    {
      prefix: 'gt!',
      serverId: '1086033687109455982',
      generalRoles: [{ name: 'members', id: '1084043764357677125' }],
      tempChannels: [
        {
          tempCategoryId: '1086033689420513480',
          restrictedChannels: ['1086033689420513481', '1086033689420513482'],
          editChannelId: {
            id: '1086033689420513481',
            baseRoles: [
              {
                id: '1086033687109455982',
                deny: [Permissions.FLAGS.VIEW_CHANNEL]
              },
              {
                id: '1086033687109455989',
                allow: [Permissions.FLAGS.VIEW_CHANNEL]
              }
            ]
          }
        }
      ],
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
      ]

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
