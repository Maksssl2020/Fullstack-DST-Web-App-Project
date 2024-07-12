const shuffleArray = (array) => {
  let newArray = array.slice();
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

class ColorManager {
  constructor(colors) {
    this.colors = colors;
    this.currentColors = shuffleArray(this.colors);
    this.index = 0;
  }

  getNextColor() {
    if (this.index >= this.currentColors.length) {
      this.currentColors = shuffleArray(this.colors);
      this.index = 0;
    }
    return this.currentColors[this.index++];
  }
}
