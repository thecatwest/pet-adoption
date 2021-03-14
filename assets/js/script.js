fetch("https://test1-api.rescuegroups.org/v5/public/animals/breeds/526", {
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
