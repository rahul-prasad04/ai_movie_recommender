function recommend() {
    const genre = document.getElementById("genre").value;
    const search = document.getElementById("search").value.trim();
    const results = document.getElementById("results");
    const loader = document.getElementById("loader");

    results.innerHTML = "";
    loader.classList.remove("hidden");

    const query = search !== "" ? search : genre;

    fetch(`https://www.omdbapi.com/?s=${query}&apikey=189417c7`)
        .then(res => res.json())
        .then(data => {
            loader.classList.add("hidden");

            if (data.Search) {
                let movies = data.Search;

                while (movies.length < 14) {
                    movies = movies.concat(data.Search);
                }

                movies.slice(0, 14).forEach(movie => {
                    const image = movie.Poster !== "N/A"
                        ? movie.Poster
                        : "https://via.placeholder.com/200x300";

                    results.innerHTML += `
            <div class="card">
              <img src="${image}">
              <h4>${movie.Title}</h4>
              <p>${movie.Year}</p>
            </div>
          `;
                });
            } else {
                results.innerHTML = "<p>No movies found</p>";
            }
        })
        .catch(() => {
            loader.classList.add("hidden");
            results.innerHTML = "<p>Error loading movies</p>";
        });
}

function toggleTheme() {
    document.body.classList.toggle("dark");
}

function openAbout() {
    document.getElementById("aboutModal").classList.remove("hidden");
}

function closeAbout() {
    document.getElementById("aboutModal").classList.add("hidden");
}