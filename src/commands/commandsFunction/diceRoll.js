const diceRoll = interaction => {
  const { commandName, options } = interaction;

  if (commandName === 'roll-dice') {
    const maxNumber = options.getNumber('max-number') || 0;

    if (maxNumber > 1000) return interaction.reply({ content: "Can't roll more than 1000 numbers", ephemeral: true });

    return interaction.reply({
      content: `${Math.floor(Math.random() * (maxNumber ? maxNumber : 6))}`,
      ephemeral: true
    });
  }
};

export default diceRoll;
