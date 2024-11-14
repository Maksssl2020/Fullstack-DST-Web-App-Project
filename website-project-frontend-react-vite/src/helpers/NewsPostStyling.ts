let usedIndexes = [];

export const getHeightForPost = (index) => {
  let moduloResult = (index % 15) + 1;

  if ([1, 6].includes(moduloResult)) {
    return "600px";
  } else if ([2, 7].includes(moduloResult)) {
    return "650px";
  } else if ([3, 8].includes(moduloResult)) {
    return "700px";
  } else if ([4, 9].includes(moduloResult)) {
    return "750px";
  } else if ([5, 10].includes(moduloResult)) {
    return "800px";
  } else {
    return "850px";
  }
};

const backgroundColors = [
  "bg-custom-blue-400",
  "bg-custom-blue-100",
  "bg-custom-blue-300",
  "bg-custom-pink-300",
  "bg-custom-orange-300",
  "bg-custom-yellow-100",
];

const drawIndex = () => {
  return Math.floor(Math.random() * backgroundColors.length);
};

export const getRandomBackgroundColor = () => {
  let index;
  do {
    if (usedIndexes.length === 6) {
      usedIndexes = [];
    }
    index = drawIndex();
  } while (usedIndexes.includes(index));
  usedIndexes.push(index);

  return backgroundColors[index];
};
