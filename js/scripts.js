//pokemon type array
let typeArray = ["bug", "fire", "flying", "grass", "water"];

//IIFE
let pokemonRepository = (function () {
  //pokemon array
  let pokemonList = [
    { name: "Bulbasaur", height: 28, type: typeArray[3] },
    { name: "Charmander", height: 24, type: typeArray[1] },
    { name: "Squirtle", height: 20, type: typeArray[4] },
    { name: "Caterpie", height: 12, type: typeArray[0] },
    { name: "Weedle", height: 12, type: typeArray[0] },
    { name: "Pidgey", height: 12, type: typeArray[2] },
  ];

  //getAll() function to get pokemon array
  function getAll() {
    return pokemonList;
  }

  //add() function to add item to pokemon array
  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  //addListItem() function
  function addListItem(pokemon) {
    let element = document.querySelector(".pokemon-list");
    let listItem = document.createElement("li");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("button-class");
    listItem.appendChild(button);
    element.appendChild(listItem);
    button.addEventListener("click", function () {
      showDetails(pokemon);
    });
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
  };

  function showDetails(pokemon) {
    console.log(pokemon);
  }
})();

//forEach() loop to iterate through pokemon array
pokemonRepository.getAll().forEach(function (pokemon) {
  pokemonRepository.addListItem(pokemon);
});
