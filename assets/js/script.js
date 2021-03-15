var petNameEl = document.querySelector("#pet-name");
var petContainerEl = document.querySelectorAll("#pets-container");

fetch("https://test1-api.rescuegroups.org/v5/public/animals/", {
  headers: {
    "Content-Type": "application/vnd.api+json",
    Authorization: "2p3gpOLU",
  },
}).then(function (response) {
  response.text().then((data) => {
    console.log(JSON.parse(data));
  });
});

fetch("https://test1-api.rescuegroups.org/v5/public/animals/species/24", {
  headers: {
    "Content-Type": "application/vnd.api+json",
    Authorization: "2p3gpOLU",
  },
}).then(function (response) {
  response.text().then((data) => {
    console.log(JSON.parse(data));
  });
});

var getSpecies = {
  
}

