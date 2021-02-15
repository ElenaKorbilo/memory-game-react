export const generateCards = (size) => {
  let cards = [];

  for (let i = 0; i < size; i += 2) {
      let index = Math.floor(Math.random() * Math.floor(18));

      cards.push({
        name: `image${index}`,
        pic: `/image${index}.png`,
        flipped: false
      });
      cards.push({
          name: `image${index}`,
          pic: `/image${index}.png`,
          flipped: false
      });
  }

  return shuffle(cards);
}

function shuffle(array) {
  let currentIndex = array.length, temp, randomIndex;

  while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temp = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temp;
  }

  return array;
}
