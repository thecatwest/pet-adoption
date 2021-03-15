var petNameEl = document.querySelector("#pet-name");
var petContainerEl = document.querySelectorAll("#pets-container");

// const apiCallPets = () => fetch(
//   "https://test1-api.rescuegroups.org/v5/public/animals/", {
//   headers: {
//     "Content-Type": "application/vnd.api+json",
//     Authorization: "2p3gpOLU",
//   },
// }).then(res => {
//   if (res.ok) {
//     return res.text().then((data) => {
//       console.log(JSON.parse(data));
//     }})
  // throw new Error(res)
// .catch(console.err)

const apiUrlPets =(searchTerm)=>{
fetch("https://test1-api.rescuegroups.org/v5/public/animals/species/", {
  headers: {
    "Content-Type": "application/vnd.api+json",
    "Authorization": "2p3gpOLU",
  },
}).then(function (response) {
  return response.text().then((data) => {
    console.log(JSON.parse(data));
  });
})};

var searchTerms = function() {
  var searchTermSpecies = document.querySelector('#searchTermSpecies').value;
  // create variable to hold value of species
  var species = document.querySelector('#species').value;
  fetch(
    'https://test1-api.rescuegroups.org/v5/public/animals/species/search?=' +
    searchTermSpecies +
    '&fields[species]='
  )
}

var url = 'https://test1-api.rescuegroups.org/v5/public/animals/species/'
$.ajax({
  url: url,
  method: 'GET',
  dataType: 'JSON',
  data: {
    'api-key': '2p3gpOLU'
  },
  success: function(data) {
    console.log(data);
  },
  error: function(err) {
    console.log('error:' + err);
  }
});