fetch("https://api.thecatapi.com/v1/images/search?limit=10")
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
  
  fetch("https://api.thecatapi.com/v1/images/search?limit=10")
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
  
fetch("https://catfact.ninja/fact")
  .then(response => response.json())
  .then(data => {
    const catFactContainer = document.getElementById("cat-fact-box");
    const catFact = document.createElement("p");
    catFact.innerHTML = data.fact;
    catFactContainer.appendChild(catFact);
  });