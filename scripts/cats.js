const url = "https://api.thecatapi.com/v1/images/search?limit=10";

fetch(url)
  .then(response => response.json())
  .then(function(cats) {
    const catContainer = document.getElementById("gallery");

    cats.forEach(cat => {
      const img = document.createElement("img");
      img.src = cat.url;
      img.alt = "A cute cat";
      catContainer.appendChild(img);
    });
  })
  .catch(error => console.error('Error:', error));