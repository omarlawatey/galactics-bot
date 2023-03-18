import { Permissions } from 'discord.js';
import DotEnv from 'dotenv';

DotEnv.config();

export const testMode = process.env.TESTMODE ? process.env.TESTMODE : false;

export const GlobalVars = !testMode
  ? {
      name: 'lo',
      prefix: 'gt!',
      serverId: '673700884617625621',
      generalRoles: [{ name: 'member', id: '977876896010338354' }],
      teamRole: '1083809101273911387',
      moderationChannel: '1080957608028028928',
      autoResponse: [
        {
          command: 'yt',
          response: `https://youtube.com/@galacticsyt`
        }
      ],
      commandsChannel: '1080952376669765652',
      welcome: {
        Id: '941665272811630632',
        autoRole: ['952242871854063669'],
        botsRole: ['941783311104245810'],
        welcomePrivateMessage: ``
      },
      rulesChannelId: '941633613538132008',
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
                id: '934920779013980220',
                allow: [Permissions.FLAGS.VIEW_CHANNEL]
              },
              {
                id: '977876896010338354',
                allow: [Permissions.FLAGS.VIEW_CHANNEL]
              },
              {
                id: '978048610195341332',
                allow: [Permissions.FLAGS.VIEW_CHANNEL]
              }
            ]
          }
        }
      ],
      logsChannelsId: '981359676560130079',
      liveStatus: {
        liveCategoryId: '952835995580129301',
        Roles: [
          { name: '『👥』members', id: '952242871854063669' },
          { name: '『🎮』streamers', id: '952245434703806484' },
          { name: '『🔮』boosters', id: '944987462084751391' }
        ],
        youtubeCounter: '<YOUTUBE CHANNEL ID>'
      },
      boostChannelId: '981359676560130079',
      linkBlockerChannels: [
        '941633472764715058',
        '941383631157461002',
        '950088308736807012',
        '950088308736807012',
        '941773618268995624',
        '986423629145333800'
      ]
    }
  : {
      prefix: 'gt!',
      serverId: '1086033687109455982',
      generalRoles: [{ name: 'members', id: '1084043764357677125' }],
      teamRole: '1086033687130411097',
      moderationChannel: '1084043764588351508',
      autoResponse: [
        {
          command: 'yt',
          response: `https://youtube.com/@galacticsyt`
        }
      ],
      commandsChannel: '950086892160946246',
      welcome: {
        Id: '941665272811630632',
        autoRole: ['952242871854063669'],
        botsRole: ['941783311104245810'],
        welcomePrivateMessage: ``
      },
      rulesChannelId: '941633613538132008',
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
      logsChannelsId: '981359676560130079',
      liveStatus: {
        liveCategoryId: '952835995580129301',
        Roles: [
          { name: '『👥』members', id: '952242871854063669' },
          { name: '『🎮』streamers', id: '952245434703806484' },
          { name: '『🔮』boosters', id: '944987462084751391' }
        ],
        youtubeCounter: '<YOUTUBE CHANNEL ID>'
      },
      boostChannelId: '981359676560130079',
      linkBlockerChannels: [
        '941633472764715058',
        '941383631157461002',
        '950088308736807012',
        '950088308736807012',
        '941773618268995624',
        '986423629145333800'
      ]

      // YouTubeApi: {
      //   newVideoNotifiactionChannelId: '949153973338775619',
      //   channelId: ['UCCLnQIRBkqnsRAqpp-6s91g', 'UCBazNt3il35vDU04U5Acm1w']
      // },
    };
