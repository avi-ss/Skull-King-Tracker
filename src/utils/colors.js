const allColors = ["red.500", "orange.500", "yellow.500", "green.500", "teal.500", "blue.500", "cyan.500", "purple.500", "pink.500"];

// Esta función asigna un color único a cada índice y devuelve un array de colores
const assignColors = (numColors) => {
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

export { assignColors };