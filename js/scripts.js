let typeArray = ["fire", "grass", "water"];

let pokemonList = [
  { name: "Bulbasaur", height: 28, type: typeArray[1] },
  { name: "Charmander", height: 24, type: typeArray[0] },
  { name: "Squirtle", height: 20, type: typeArray[2] },
];

// 'for' loop that iterates over each Pokemon in 'pokemonList' array
for (let i = 0; i < pokemonList.length; i++) {
  // conditional that highlights tall Pokemon
  if (pokemonList[i].height >= 24) {
    document.write(
      pokemonList[i].name +
        " (height: " +
        pokemonList[i].height +
        " inches)" +
        " - Wow, that's a tall Pokemon!" +
        "<br>"
    );
  } else {
    document.write(
      pokemonList[i].name +
        " (height: " +
        pokemonList[i].height +
        " inches)" +
        "<br>"
    );
  }
}
