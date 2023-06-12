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
    let element = document.querySelector(".pokemon-list");
    let listItem = document.createElement("li");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("button-class");
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
  let modalContainer = document.querySelector("#modal-container");

  //showDetails() function
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      let modalContainer = document.querySelector("#modal-container");
      modalContainer.innerHTML = "";
      modalContainer.classList.add("is-visible");
      let modal = document.createElement("div");
      modal.classList.add("modal");
      let modalCloseButton = document.createElement("button");
      modalCloseButton.innerHTML = "Close";
      modalCloseButton.classList.add("modal-close");
      modalCloseButton.addEventListener("click", hideModal);
      let modalTitle = document.createElement("h1");
      modalTitle.classList.add("modal-title");
      modalTitle.innerText = pokemon.name;
      let imageContainer = document.createElement("div");
      imageContainer.classList.add("image-container");
      let pokemonImage = document.createElement("img");
      pokemonImage.src = pokemon.imageUrl;
      imageContainer.appendChild(pokemonImage);
      let modalText = document.createElement("p");
      modalText.classList.add("modal-text");
      modalText.innerText = "Height: " + pokemon.height;
      modal.appendChild(modalCloseButton);
      modal.appendChild(modalTitle);
      modal.appendChild(modalText);
      modal.appendChild(imageContainer);
      modalContainer.appendChild(modal);
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
    let modalContainer = document.querySelector("#modal-container");
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
