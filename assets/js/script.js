$(document).ready(function() {
  // listen for click events on navbar
  $(".navbar-burger").click(function() {
    $(".navbar-burger").toggleClass("is-active");
    $(".navbar-menu").toggleClass("is-active");
  });

  $("#submit").on("click", function() {

    var searchAnimalsUrl = 
      "https://api.rescuegroups.org/v5/public/animals/search/available/haspic?include=locations,orgs";

    $.ajax({
      url: searchAnimalsUrl,
      method: "GET",
      contentType: "application/json",
      headers: {
        Authorization: "2p3gpOLU"
      },
      data: JSON.stringify({
        data: {
          filters: [
            {
              fieldName: "statuses.name",
              operation: "equals",
              criteria: "Available"
            },
            {
              fieldName: "species.singular",
              operation: "equals",
              criteria: $("#species option:selected")
            },
          ],
          filterRadius: {
            miles: $("#distance option:selected").val(),
            postalcode: $("#zipCode").val().trim(),
          },
        },
      }),
    }).then(function(result) {
      console.log(result);

      var orgSearchUrl = "https://api.rescuegroups.org/v5/public/orgs/search/";

      $.ajax({
        url: orgSearchUrl,
        method: "GET",
        contentType: "application/json",
        headers: {
          Authorization: "2p3gpOLU"
        },
        data: JSON.stringify({
          data: {
            filters: [],
            filterProcessing: "1",
            filterRadius: {
              miles: $("#distance option:selected").val(),
              postalcode: $("#zipCode").val().trim()
            }
          }
        })
      }).then(function(response) {
        var organizations = {};
        for (var i = 0; i < response.data.length; i++) {
          organizations[response.data[i].id] = {
            name: response.data[i].attributes.name,
            url: response.data[i].attributes.url
          };
        }

        $("animal-results").html('<h4 class="has-text-centered is-side-3">Results</h4>')
          .append('<div class="row">');
        
        for (var i = 0; i < result.data.length; i++) {
          const column = $("<div>").addClass("column-is-4").attr("id", "animalCard");
          const title = $("<h2>").addClass("card-title has-text-weight-bold is-size-5").text(result.data[i].attributes.name);
          const card = $("<div>").addClass("card has-background-light");
          const breed = $("<p>").addClass("card-text").text(`Animal Breed: ${result.data[i].attributes.breedString}`);
          const sex = $("<p>").addClass("card-text").text(`Sex: ${result.data[i].attributes.sex}`);
          const distance = $("<p>").addClass("card-text").text(`Distance: ${result.data[i].attributes.distance} miles`);
          const organizationName = $("<p>").addClass("card-text").text(`Organization/Rescue: ${organizations[result.data[i].relationships.organizations.data[0].id].name}`);
          const organizationUrl = $("<a>").addClass("card-text").text(organizations[result.data[i].relationships.organizations.data[0].id].url).attr("href", organizations[result.data[i].relationships.organizations.data[0].id].url);
          const animalImg = $("<img>").addClass("image is-128x128").attr("src", result.data[i].attributes.pictureThumbnailUrl);
          const body = $("<div>").addClass("card-body");

          col.append(card.append(body.append(title, animalImg, breed, sex, distance, organizationName, organizationUrl)));

          $("#animal-results .row").append(col);
        }
      });
    });
  });
});

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
