'use strict';

/**
 * Calls the dog api to randomly get a set number
 * of images
 */
function getImg(inputValue) {
  let dogImageUrl = `https://dog.ceo/api/breeds/image/random/${inputValue}`;

  fetch(dogImageUrl)
    .then(response => response.json())
    .then(responseJson => imgResults(responseJson))
    .catch(error => alert('Your request could not be completed. Try Again.'));
}

/* place image in div
 */
function imgResults(responseJson) {
  console.log(responseJson);
  let arrayOfImg = responseJson.message;
  let display = getImgs(arrayOfImg); 
  //replace the existing image with the new one
  $('.imageReturn-img').html(display);
}

/* prepare and return img elements */
function getImgs(arrayOfImg){
    let valueToReturn = ''; 
    for (let i = 0; i < arrayOfImg.length; i++){
      valueToReturn += `<img src="${arrayOfImg[i]}" class="imageReturn-img">`;
    } 
    return valueToReturn;
}

function checkSubmit() {
  $('form').submit(event => {
    event.preventDefault();
    let inputValue = $('.quantity').val();
    getImg(inputValue); 
  });
}

$(function() {

  checkSubmit();
});

$(document).ready(function () {
  // navbar clicks
  $(".navbar-burger").click(function () {
    $(".navbar-burger").toggleClass("is-active");
    $(".navbar-menu").toggleClass("is-active");
  });

  // retrieve object from localStorage
  var retrievedPet = localStorage.getItem("savePet");

  console.log("retrievedPet: ", JSON.parse(retrievedPet));

  $(document).ready(function () {
    $("#retrieve-button").on("click", function () {
      var searchAnimalsUrl1 =
        "https://api.rescuegroups.org/v5/public/animals/search/available/haspic?include=locations,orgs";
      JSON.parse(localStorage.getItem("retrievedPet"));
      console.log("Load Button Clicked");
      $.ajax({
        url: searchAnimalsUrl1,
        method: "GET",
        contentType: "application/json",
        headers: {
          Authorization: "2p3gpOLU",
        },
        data: JSON.stringify({
          filters: [],
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
                postalcode: $("#postal-code").val(),
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
              animalBio
            );

            card.append(cardContent);
            column.append(card);
            $("#animal-list").append(column);
          }
        });
      });
    });
  });
});
