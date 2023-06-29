let pokemonRepository = (function () {
  let e = [];
  function t(t) {
    "object" == typeof t && "name" in t && "detailsUrl" in t
      ? e.push(t)
      : console.log("That is not a Pokemon!");
  }
  function n() {
    return e;
  }
  let i = document.querySelector("#exampleModal");
  function o(e) {
    var t;
    fetch((t = e).detailsUrl)
      .then(function (e) {
        return e.json();
      })
      .then(function (e) {
        (t.imageUrl = e.sprites.front_default),
          (t.height = e.height),
          (t.types = e.types);
      })
      .catch(function (e) {
        console.error(e);
      })
      .then(function () {
        document.querySelector(".modal-title").innerText = e.name;
        let t = document.querySelector(".pokemon-img");
        t.classList.add("image-container");
        let n = document.querySelector("img");
        (n.src = e.imageUrl), t.appendChild(n);
        let o = document.querySelector(".pokemon-height");
        o.classList.add("modal-text"),
          (o.innerText = "Height: " + e.height + "m"),
          i.addEventListener("click", (e) => {
            e.target === i && r();
          }),
          window.addEventListener("keydown", (e) => {
            "Escape" === e.key && i.classList.contains("is-visible") && r();
          });
      });
  }
  function r() {
    document.querySelector("#exampleModal").classList.remove("is-visible");
  }
  return {
    add: t,
    getAll: n,
    addListItem: function e(t) {
      let n = document.querySelector(".list-group"),
        i = document.createElement("li");
      i.classList.add("list-group-item");
      let r = document.createElement("button");
      (r.innerText = t.name),
        r.classList.add("btn-primary"),
        r.setAttribute("data-target", "#exampleModal"),
        r.setAttribute("data-toggle", "modal"),
        i.appendChild(r),
        n.appendChild(i),
        r.addEventListener("click", function (e) {
          o(t);
        });
    },
    loadList: function e() {
      return fetch("https://pokeapi.co/api/v2/pokemon/?limit=150")
        .then(function (e) {
          return e.json();
        })
        .then(function (e) {
          e.results.forEach(function (e) {
            t({ name: e.name, detailsUrl: e.url });
          });
        })
        .catch(function (e) {
          console.error(e);
        });
    },
    showDetails: o,
  };
})();
pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (e) {
    pokemonRepository.addListItem(e);
  });
});
