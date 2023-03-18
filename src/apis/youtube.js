import ytch from 'yt-channel-info';

const youtube = async channelId => {
  let channel = 0;
  const payload = {
    channelId: channelId,
    channelIdType: 0
  };

  await ytch
    .getChannelInfo(payload)
    .then(async response => {
      if (!response.alertMessage) channel = await response;
    })
    .catch(err => (channel = 0));

  return channel;
};

export default youtube;
