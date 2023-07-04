const jsonData = require('./exportedVariables.json');

export const parseJson= () => {
 

// Initialize empty lists for numbers and colors
const numberList = [];
const colorList = [];

// Loop through the data and extract numbers and colors
for (const item of jsonData) {
  const body = item.body;
  
  // Extract numbers
  const numbers = body.Spacing;
  for (const size in numbers) {
    if (numbers[size].$type === 'number') {
      numberList.push({
        name: size,
        value: numbers[size].$value
      });
    }
  }
  
  // Extract colors
  const colors = body.Colour;
  for (const group in colors) {
    const shades = colors[group];
    for (const shade in shades) {
      if (shades[shade].$type === 'color') {
        colorList.push({
          name: `${group}-${shade}`,
          value: shades[shade].$value
        });
      }
    }
  }
}

// Convert numberList to object
const spacing = numberList.reduce((acc, { name, value }) => {
  acc[name] = value;
  return acc;
}, {});

// Convert colorList to object
const colors = colorList.reduce((acc, { name, value }) => {
  acc[name] = value;
  return acc;
}, {});



return { colors, spacing };
};


