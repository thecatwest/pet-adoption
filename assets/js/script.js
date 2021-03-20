$(document).ready(function () {

  $("#submit").on("click", function () {
    var searchAnimalsUrl1 =
      "https://api.rescuegroups.org/v5/public/animals/search/available/haspic?include=locations,orgs";

    $.ajax({
      url: searchAnimalsUrl1,
      method: "GET",
      contentType: "application/json",
      headers: {
        Authorization: "2p3gpOLU",
      },
      data: JSON.stringify({
        data: {
          filters: [
            {
              fieldName: "statuses.name",
              operation: "equals",
              criteria: "Available",
            },
            {
              fieldName: "animalSpecies.singular",
              operation: "equals",
              criteria: $("#species option:selected"),
            },
            {
              fieldName: "species.singular",
              operation: "equals",
              criteria: $("#sex option:selected"),
            },
            {
              fieldName: "orgLocationDistance",
              operation: "radius",
              criteria: $("#distance option:selected").val(),
            },
            {
              fieldName: "orgLocation",
              operation: "equals",
              criteria: $("#postal-code").val().trim(),
            },
          ],
          // filterRadius: {
          //   miles: $("#distance option:selected").val(),
          //   postalcode: $("#postal-code").val().trim(),
          // },
        },
      }),
    }).then(function (responseAnimal) {
      console.log(responseAnimal);

      var orgSearchUrl = "https://api.rescuegroups.org/v5/public/orgs/search/";

      $.ajax({
        url: orgSearchUrl,
        method: "GET",
        contentType: "application/json",
        headers: {
          Authorization: "2p3gpOLU",
        },
        data: JSON.stringify({
          data: {
            filters: [],
            filterProcessing: "1",
            filterRadius: {
              miles: $("#distance option:selected").val(),
              postalcode: $("#postal-code").val().trim(),
            },
          },
        }),
      }).then(function (responseOrg) {
        var organizations = {};
        for (var i = 0; i < responseOrg.data.length; i++) {
          organizations[responseOrg.data[i].id] = {
            name: responseOrg.data[i].attributes.name,
            url: responseOrg.data[i].attributes.url,
          };
        }
          console.log(organizations);
          // console.log(searchAnimalsUrl);
        $("animal-list")
          .html('<h3 class="title is-centered is-3">Results</h3>')
          .append('<div class="row">');
    
        for (var i = 0; i < responseOrg.data.length; i++) {
          let column = $("<div>")
            .addClass("column is-8")
            .attr("id", "animalCard");
          let card = $("<div>").addClass("card");
          let cardContent = $("<div>").addClass("card-content");
          let name = $("<h2>")
            .addClass("card-header-title is-centered")
            .text(responseOrg.data[i].attributes.name);

            // console.log(name);

          let breed = $("<p>")
            .addClass("card-content")
            .text("Animal Breed: " + responseAnimal.data[i].attributes.breedString);
           

          let organizationName = $("<p>")
            .addClass("card-content")
            .text(
              "Organization/Rescue: " + 
              responseOrg.data[i].attributes.name
              );

              // console.log(organizationName);

          let organizationUrl = $("<a>")
            .addClass("card-content")
            .text(
              "Website: " +
                responseOrg.data[i].attributes.url)
            .attr(
              "href",
              responseOrg.data[i].attributes.url
            );

            // console.log(organizationUrl);

          let sex = $("<p>")
            .addClass("card-content")
            .text("Sex: " + responseAnimal.data[i].attributes.sex);

            // console.log(sex);
          let distance = $("<p>")
            .addClass("card-content")
            .text(
              "Distance: " +
                responseAnimal.data[i].attributes.distance +
                " miles away from " +
                responseAnimal.data[i].attributes.postalcode
            );
            console.log(distance);
          let animalImg = $("<img>")
            .addClass("card-image is-square")
            .attr("src", responseAnimal.data[i].attributes.pictureThumbnailUrl);

          // card.append(name);
          // column.append(card);
            cardContent.append(name,
              breed,
              organizationName,
              organizationUrl,
              sex,
              distance,
              animalImg);

              card.append(cardContent);
                column.append(card);
                

          $("#animal-list").append(column);
        }
      });
    });
  });
});

// var searchTerms = function () {
//   var searchTermSpecies = document.querySelector("#searchTermSpecies").value;
//   // create variable to hold value of species
//   var species = document.querySelector("#species").value;
//   fetch(
//     "https://test1-api.rescuegroups.org/v5/public/animals/species/search?=" +
//       searchTermSpecies +
//       "&fields[species]="
//   );
// };

var url = "https://test1-api.rescuegroups.org/v5/public/animals/species/";
$.ajax({
  url: url,
  method: "GET",
  contentType: "application/json",
  headers: {
    Authorization: "2p3gpOLU",
  },
  success: function (data) {
    console.log(data);
  },
  error: function (err) {
    console.log("error:" + err);
  },
});
