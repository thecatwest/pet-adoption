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
//dropdown js
const selectedAll = document.querySelectorAll(".selected");

selectedAll.forEach((selected)   => {
const optionsContainer = selected.previousElementSibling;
const searchBox = selected.nextElementSibling

const optionsList = optionsContainer.querySelectorAll(".option");

selected.addEventListener("click", () => {
 
  if(optionsContainer.classList.contains("active")) {
    optionsContainer.classList.remove("active");
  } else {
    let currentActive = document.querySelector(".options-container.active");

    if(currentActive) {
      currentActive.classList.remove("active");
    }

    optionsContainer.classList.add("active");
  }

  searchBox.value ="";
  filterList("");

  if(optionsContainer.classList.contains("active")) {
    searchBox.focus();
  }
});

optionsList.forEach(o => {
  o.addEventListener("click", () => {
    selected.innerHTML = o.querySelector("label").innerHTML;
    optionsContainer.classList.remove("active");
  });
});
});


//end of dropdown js