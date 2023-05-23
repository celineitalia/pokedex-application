let typeArray = ["bug", "fire", "flying", "grass", "water"];

let pokemonList = [
  { name: "Bulbasaur", height: 28, type: typeArray[3] },
  { name: "Charmander", height: 24, type: typeArray[1] },
  { name: "Squirtle", height: 20, type: typeArray[4] },
  { name: "Caterpie", height: 12, type: typeArray[0] },
  { name: "Weedle", height: 12, type: typeArray[0] },
  { name: "Pidgey", height: 12, type: typeArray[2] },
];

pokemonList.forEach(function (pokemon) {
  document.write(
    "<p>" +
      pokemon.name +
      " (height: " +
      pokemon.height +
      " inches, type: " +
      pokemon.type +
      ")" +
      "</p>"
  );
});
