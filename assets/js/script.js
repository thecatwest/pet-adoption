$(document).ready(function () {
  // navbar clicks
  $(".navbar-burger").click(function () {
    $(".navbar-burger").toggleClass("is-active");
    $(".navbar-menu").toggleClass("is-active");
  });

  $(document).ready(function () {
    $("#submit").on("click", function () {
      var searchAnimalsUrl1 =
        "https://api.rescuegroups.org/v5/public/animals/search/available/haspic?include=locations,orgs";
      console.log($("#species").val());
      $.ajax({
        url: searchAnimalsUrl1,
        method: "GET",
        contentType: "application/json",
        headers: {
          Authorization: "2p3gpOLU",
        },
        data: JSON.stringify({
          filters: [
            {
              fieldName: "statuses.name",
              operation: "equals",
              criteria: "Available",
            },
            {
              fieldName: "animalSpecies",
              operation: "equals",
              criteria: $("#species").val(),
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
        }),
      }).then(function (responseAnimal) {
        console.log(responseAnimal);

        var orgSearchUrl =
          "https://api.rescuegroups.org/v5/public/orgs/search/";

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
              city: responseOrg.data[i].attributes.citystate,
              state: responseOrg.data[i].attributes.locationState,
            };
          }
          console.log("response data: ", responseOrg.data);

          // console.log("state:", state);
          $("animal-list")
            .html('<h3 class="title is-centered is-3">Results</h3>')
            .append('<div class="row">');

          for (var i = 0; i < responseOrg.data.length; i++) {
            organizations[responseOrg.data[i].id] = {};
            let column = $("<div>").addClass("column").attr("id", "animalCard");

            let card = $("<div>").addClass("card");

            let cardContent = $("<div>").addClass("card-content");

            let animalName = $("<h2>")
              .addClass("card-header title is-centered")
              .text("Name: " + responseAnimal.data[i].attributes.name);

            let breed = $("<p>")
              .addClass("card-content")
              .text(
                "Animal Breed: " + responseAnimal.data[i].attributes.breedString
              );

            let organizationName = $("<p>")
              .addClass("card-content")
              .text(
                "Organization/Rescue: " + responseOrg.data[i].attributes.name
              );

            let organizationUrl = $("<a>")
              .addClass("card-content")
              .text("Website: " + responseOrg.data[i].attributes.url)
              .attr("href", responseOrg.data[i].attributes.url);

            // console.log(city);
            let orgCity = $("<p>")
              .addClass("card-content")
              .text("Location: " + responseOrg.data[i].attributes.citystate);

            let distance = $("<p>")
              .addClass("card-content")
              .text("Zip Code: " + responseOrg.data[i].attributes.postalcode);

            // let orgState = $("<p>")
            //   .addClass("card-content")
            //   .text("State: " + responseOrg.data[i].state);

            let sex = $("<p>")
              .addClass("card-content")
              .text("Sex: " + responseAnimal.data[i].attributes.sex);

            let animalImg = $("<img>")
              .addClass("card-image is-square is-4by3")
              .attr(
                "src",
                responseAnimal.data[i].attributes.pictureThumbnailUrl
              );

            let animalBio = $("<p>")
              .addClass("card-content")
              .text(
                "Bio: " + responseAnimal.data[i].attributes.descriptionText
              );

            let saveButton = $("<button>")
              .addClass("button is-warning animal-button")
              .text("Save Animal");

            let savedPetsButton = $("<button>")
              .addClass("button is-warning is-light saved-pets-button")
              .text("View Saved Profiles")
              .attr("href", "https://thecatwest.github.io/pet-adoption/pets.html");

            // .data(responseAnimal.data[i].id);

            cardContent.append(
              animalName,
              breed,
              organizationName,
              organizationUrl,
              orgCity,
              sex,
              distance,
              animalImg,
              animalBio,
              saveButton,
              savedPetsButton
            );

            card.append(cardContent);
            column.append(card);
            $("#animal-list").append(column);

            // animal save button

            // set current button class
            // let currButtonClass = false;

            // on click
            $(".animal-button").on("click", function () {
              for (var i = 0; i < responseAnimal.data.length; i++) {
                $("<span></span>", {
                  class: "arr",
                  id: "saveButton_" + i,
                });

                // save object to localStorage
                var savePet = {
                  PetName: responseAnimal.data[i].attributes.name,
                  Photo: responseAnimal.data[i].attributes.pictureThumbnailUrl,
                  Organization: responseOrg.data[i].attributes.name,
                  Breed: responseAnimal.data[i].attributes.breedString,
                  Sex: responseAnimal.data[i].attributes.sex,
                  ZipCode: responseOrg.data[i].attributes.postalcode,
                  Bio: responseAnimal.data[i].attributes.descriptionText,
                };

                localStorage.setItem("savePet", JSON.stringify(savePet));

                // retrieve object from localStorage
                var retrievedPet = localStorage.getItem("savePet");

                console.log("retrievedPet: ", JSON.parse(retrievedPet));

                $(".retrieveProfile").on("click", function () {
                  for (var i = 0; i < responseAnimal.data.length; i++) {
                    $("<span></span>", {
                      class: "arr",
                      id: "retrieveProfile_" + i,
                    });

                    console.log(savePet);
                    console.log("save button clicked");
                  }
                });

                // add map api
                // var geocoder; //To use later
                // var map; //Your map
                // function initialize() {
                //   geocoder = new google.maps.Geocoder();
                //   //Default setup
                //   var latlng = new google.maps.LatLng(-34.397, 150.644);
                //   var myOptions = {
                //     zoom: 8,
                //     center: latlng,
                //     mapTypeId: google.maps.MapTypeId.ROADMAP
                //   }
                //   map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
                // }

                // //Call this wherever needed to actually handle the display
                // function codeAddress(zipCode) {
                //     geocoder.geocode( { 'address': zipCode}, function(results, status) {
                //       if (status == google.maps.GeocoderStatus.OK) {
                //         //Got result, center the map and put it out there
                //         map.setCenter(results[0].geometry.location);
                //         var marker = new google.maps.Marker({
                //             map: map,
                //             position: results[0].geometry.location
                //         });
                //       } else {
                //         alert("Geocode was not successful for the following reason: " + status);
                //       }
                //     });
                //   }

                //         organizationName = $("<p>").addClass("title is-2");
                //         let columnLeft = $("<div>")
                //           .addClass("column")
                //           .attr("id");
                //         let cardContentMap = $("<div>")
                //           .addClass("card-content")
                //           .attr("id");

                //         cardContentMap.append(organizationName, map);

                //         columnLeft.append(cardContentMap);
                //         $("#animalMap").append(column);
                //         let map;
                //       }
              }
            });
                  

                  // organization search for future
                  // $("#submit").on("click", function () {
                  //   var animalLocations = "https://api.rescuegroups.org/v5/public/orgs/search/";
                  //   $.ajax({
                  //     url: animalLocations,
                  //     method: "GET",
                  //     contentType: "application/json",
                  //     headers: {
                  //       Authorization: "2p3gpOLU",
                  //     },
                  //     data: JSON.stringify({
                  //       filters: [
                  //         {
                  //           fieldName: "statuses.name",
                  //           operation: "equals",
                  //           criteria: "Available",
                  //         },
                  //         {
                  //           fieldName: "animalSpecies",
                  //           operation: "equals",
                  //           criteria: $("#species").val(),
                  //         },
                  //         {
                  //           fieldName: "orgLocationDistance",
                  //           operation: "radius",
                  //           criteria: $("#distance option:selected").val(),
                  //         },
                  //         {
                  //           fieldName: "orgLocation",
                  //           operation: "equals",
                  //           criteria: $("#postal-code").val().trim(),
                  //         },
                  //       ],
                  //     }),
                  //   });
                  // });

                  
                  
                };
              });
            });
          });
        });
      });
       
  
