// Make form submit handler for pet search
//     if else statement
// var getPetProfiles
//     fetch apiUrlPet
//     if else statement
//     catch any errors with .catch(function(error) {alert})

// var displayProfiles = function (profiles, searchTerms)
//     if statement with return to check if api returned any profiles

//     profileSearchTerms.textContent = searchTerms;
//     loop over profiles
//     for statement
//         format repo name
//         var profileName = profiles[i].pet.name + "/" + profiles[i].name

//         create span element to hold pet name
//         var petNameEl = document.createElement("span");
//         petNameEl.textContent =

fetch("https://test1-api.rescuegroups.org/v5/2p3gpOLU")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
  });

var getPetProfiles = function() {
    console.log("function was called");
};

getPetProfiles();
