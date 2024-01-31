const allColors = [
  { avatar: 'red.500', bg: 'red.50', tag: 'red.300', scheme: 'red' },
  { avatar: 'orange.500', bg: 'orange.50', tag: 'orange.300', scheme: 'orange' },
  { avatar: 'yellow.500', bg: 'yellow.50', tag: 'yellow.300', scheme: 'yellow' },
  { avatar: 'green.500', bg: 'green.50', tag: 'green.300', scheme: 'green' },
  { avatar: 'teal.500', bg: 'teal.50', tag: 'teal.300', scheme: 'teal' },
  { avatar: 'blue.500', bg: 'blue.50', tag: 'blue.300', scheme: 'blue' },
  { avatar: 'cyan.500', bg: 'cyan.50', tag: 'cyan.300', scheme: 'cyan' },
  { avatar: 'purple.500', bg: 'purple.50', tag: 'purple.300', scheme: 'purple' },
  { avatar: 'pink.500', bg: 'pink.50', tag: 'pink.300', scheme: 'pink' }
]


// Esta función asigna un color único a cada índice y devuelve un array de colores
const randomColors = (numColors) => {
  const assignedColors = [];
  let availableColors = [...allColors];

  for (let i = 0; i < numColors; i++) {
    if (availableColors.length === 0) {
      availableColors = [...allColors];
    }

    const randomIndex = Math.floor(Math.random() * availableColors.length);
    assignedColors.push(availableColors[randomIndex]);
    availableColors.splice(randomIndex, 1); // Elimina el color seleccionado
  }

  return assignedColors;
};

export { randomColors };