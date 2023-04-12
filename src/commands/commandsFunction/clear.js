const clear = interaction => {
  const { member, channel, options } = interaction;

  const amount = options.getNumber('amount') || 0;

  if (amount > 100)
    return interaction.reply({ content: "Can't clear more than 100 messages at a time", ephemeral: true });

  if (member.permissions.has('ADMINISTRATOR')) {
    channel.bulkDelete(amount).then(() =>
      interaction.reply({
        content: `Deleting ${amount} messages`,
        ephemeral: true
      })
    );
  }
};

export default clear;
