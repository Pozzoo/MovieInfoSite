const apiKey = config.API_KEY;
const movieSearchApi = "https://api.themoviedb.org/3/movie/";
const imgPath = "https://image.tmdb.org/t/p/w1280";
const reviewsApiKey = "http://localhost:8000/api/v1/reviews";

const movieImg = document.getElementById("movieImg")
const movieTitle = document.getElementById("movieTitle");
const movieTagline = document.getElementById("movieTagline")
const movieVote = document.getElementById("movieVote")
const movieOverview = document.getElementById("movieOverview");
const siteTitle = document.getElementById("siteTitle");
const divGenres = document.getElementById("genres");
const movieReleaseDate = document.getElementById("movieReleaseDate");
const movieRuntime = document.getElementById("movieRuntime");
const movieBudget = document.getElementById("movieBudget");
const movieRevenue = document.getElementById("movieRevenue");

const movieId = sessionStorage.getItem("movieId");
var genresDisp = " ";
console.log(movieId);

movieSearch(movieSearchApi + movieId + "?api_key=" + apiKey);

returnReviews(reviewsApiKey + "/movie/" + movieId)

function movieSearch(url) {

    //console.log(url)
    fetch(url).then(res => res.json())
    .then(function(data) {
            data.genres.forEach(element => {
            genresDisp = genresDisp +  `${element.name}` + ", ";
        });
        
        movieImg.src = imgPath + data.poster_path;
        siteTitle.innerText = `${data.original_title}` + " Info";
        movieTitle.innerText = `${data.original_title}`;
        movieTagline.innerText = `${data.tagline}`;
        movieVote.innerText += Number(`${data.vote_average}`).toFixed(2);
        movieOverview.innerText = `${data.overview}`;
        genreText.innerText = " " + genresDisp;
        movieReleaseDate.innerText += `${data.release_date}`;
        movieRuntime.innerText += `${data.runtime}` + "min";
        movieBudget.innerText += `${data.budget}`;
        movieRevenue.innerText += `${data.revenue}`;
    })
}

// function returnReviews(reviewsURL) {
//     console.log(reviewsURL)
//     fetch(reviewsURL).then(res => res.json())
//     .then(function(data) {
//         data.forEach(review => {
//             const div_card = document.createElement("div");
//             div_card.innerHTML = `
//             <div cass="card" id="${review._id}">
//             <p><strong> Review: </strong>${review.review}</p>
//             <p><strong> Review: </strong>${review.user}</p>`

//             main.appendChild(div_card)
//         });
//     });
// }