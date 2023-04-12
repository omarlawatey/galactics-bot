const slowMode = interaction => {
  const { options, channel } = interaction;

  const time = options.getNumber('time') || 0;
  if (time > 60) return interaction.reply({ content: 'Only 60seconds are allowed', ephemeral: true });

  channel
    .setRateLimitPerUser(time, 'reason')
    .then(() => interaction.reply({ content: `This channel's slow mode is set to ${time}`, ephemeral: true }));
};

export default slowMode;
