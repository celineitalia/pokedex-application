let typeArray = ["bug", "fire", "flying", "grass", "water"];

let pokemonRepository = (function () {
  let pokemonList = [
    { name: "Bulbasaur", height: 28, type: typeArray[3] },
    { name: "Charmander", height: 24, type: typeArray[1] },
    { name: "Squirtle", height: 20, type: typeArray[4] },
    { name: "Caterpie", height: 12, type: typeArray[0] },
    { name: "Weedle", height: 12, type: typeArray[0] },
    { name: "Pidgey", height: 12, type: typeArray[2] },
  ];

  return {
    add: function (pokemon) {
      pokemonList.push(pokemon);
    },
    getAll: function () {
      return pokemonList;
    },
  };
})();

pokemonRepository.getAll().forEach(function (pokemon) {
  let element = document.querySelector(".pokemon-list");
  let listItem = document.createElement("li");
  let button = document.createElement("button");
  button.innerText = pokemon.name;
  button.classList.add("button-class");
  listItem.appendChild(button);
  element.appendChild(listItem);
});
