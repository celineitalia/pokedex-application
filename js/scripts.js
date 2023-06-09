//IIFE
let pokemonRepository = (function () {
  //pokemon array
  let pokemonList = [];
  //pokemon api url
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

  //add() function to add item to pokemon array
  function add(pokemon) {
    if (
      typeof pokemon === "object" &&
      "name" in pokemon &&
      "detailsUrl" in pokemon
    ) {
      pokemonList.push(pokemon);
    } else {
      console.log("That is not a Pokemon!");
    }
  }

  //getAll() function to get pokemon array
  function getAll() {
    return pokemonList;
  }

  //addListItem() function
  function addListItem(pokemon) {
    let element = document.querySelector(".list-group");
    let listItem = document.createElement("li");
    listItem.classList.add("list-group-item");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("btn-primary");
    button.setAttribute("data-target", "#exampleModal");
    button.setAttribute("data-toggle", "modal");
    listItem.appendChild(button);
    element.appendChild(listItem);
    button.addEventListener("click", function (event) {
      showDetails(pokemon);
    });
  }

  //loadList() function
  function loadList() {
    return fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          add(pokemon);
        });
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  //loadDetails() function
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  //name modalContainer object
  let modalContainer = document.querySelector("#exampleModal");

  //showDetails() function
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      let modalTitle = document.querySelector(".modal-title");
      modalTitle.innerText = pokemon.name;
      let imageContainer = document.querySelector(".pokemon-img");
      imageContainer.classList.add("image-container");
      let pokemonImage = document.querySelector("img");
      pokemonImage.src = pokemon.imageUrl;
      imageContainer.appendChild(pokemonImage);
      let modalText = document.querySelector(".pokemon-height");
      modalText.classList.add("modal-text");
      modalText.innerText = "Height: " + pokemon.height + "m";
      modalContainer.addEventListener("click", (e) => {
        let target = e.target;
        if (target === modalContainer) {
          hideModal();
        }
      });
      window.addEventListener("keydown", (e) => {
        if (
          e.key === "Escape" &&
          modalContainer.classList.contains("is-visible")
        ) {
          hideModal();
        }
      });
    });
  }

  //hideModal() function
  function hideModal() {
    let modalContainer = document.querySelector("#exampleModal");
    modalContainer.classList.remove("is-visible");
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    showDetails: showDetails,
  };
})();

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
