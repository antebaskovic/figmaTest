import json from "./exported.json";

export const parseConfig = () => {
  let colorList = [];
  let spacingList = [];
  const tokensData = [];
  const restData = [];


  json.forEach((item) => {
    if (item.fileName.startsWith("Tokens")) {
      tokensData.push(item);
    } else {
      restData.push(item);
    }
  });

  tokensData.forEach((item) => {
    const body = item.body;


    Object.keys(body).forEach((key) => {
      const value = body[key];

      let val = value.$value;
      let placeholderValue 

      console.log(val,'===============================');
      
      if (typeof val === "string") {
         placeholderValue = val.substring(1, val.length - 1);
      }
      else {
        val = val.toString();

        placeholderValue = val.substring(1, val.length - 1);
      }
      const restDataItem = restData.find((item) => item.body.hasOwnProperty(placeholderValue));
      const realValue = restDataItem ? restDataItem.body[placeholderValue].$value : null;
      if (value.$type === "color") {
        colorList.push({ key, value: realValue });
      } else if (value.$type === "number") {
        console.log(realValue,'sadasdasdasdasasadkjfhgytdsdtfgyhuijokpl[');
        spacingList.push({ key, value: realValue });
      }
    });
  });

  console.log("Color List:", colorList);
  console.log("Number List:", spacingList);

  const colors = colorList.reduce((acc, { key, value }) => {
    acc[key] = value;
    return acc;
  }, {});

  const spacing = spacingList.reduce((acc, { key, value }) => {
    acc[key] = value;
    return acc;
  }, {});
  

  return { colors, spacing };
};
