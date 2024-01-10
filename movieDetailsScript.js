const apiKey = config.API_KEY;
const movieSearchApi = "https://api.themoviedb.org/3/movie/"
const imgPath = "https://image.tmdb.org/t/p/w1280";

const movieImg = document.getElementById("movieImg")
const movieTitle = document.getElementById("movieTitle");
const movieOverview = document.getElementById("movieOverview");
const siteTitle = document.getElementById("siteTitle");
const divGenres = document.getElementById("genres");

const movieId = sessionStorage.getItem("movieId");
console.log(movieId)

movieSearch(movieSearchApi + movieId + "?api_key=" + apiKey)

function movieSearch(url) {

    console.log(url)
    fetch(url).then(res => res.json())
    .then(function(data) {
            data.genres.forEach(element => {
            const genreText = document.createElement("p");
            genreText.setAttribute("id", "genreText");

            divGenres.appendChild(genreText);

            genreText.innerText = `${element.name}`;
        });
        
        movieImg.src = imgPath + data.poster_path;
        siteTitle.innerText = `${data.original_title}` + " Info";
        movieTitle.innerText = `${data.original_title}`;
        movieOverview.innerText = `${data.overview}`
    })
}