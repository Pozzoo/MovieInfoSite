let pageNum = 1;

const apiKey = config.API_KEY;
const movieSearchApi = "https://api.themoviedb.org/3/search/movie?query="
const apiLink = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc?api_key=";
const imgPath = "https://image.tmdb.org/t/p/w1280";
const searchApi = "https://api.themoviedb.org/3/search/movie?query=";

const main = document.getElementById("movieSection");
const form = document.getElementById("form");
const searchBox = document.getElementById("query")
const prevButton = document.getElementById("prevButton");
const nextButton = document.getElementById("nextButton");
const pageNumDisplay = document.getElementById("pageNumDisplay");



returnMovies(apiLink + apiKey + "&page=1");

prevButton.onclick = prevClick
nextButton.onclick = nextClick

function prevClick() {
    if (pageNum > 1) {
        pageNum--;
    }
    returnMovies(apiLink + pageNum);
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

function nextClick() {
    if (pageNum < 20) {
        pageNum++;
    };
    returnMovies(apiLink + apiKey + "&page=" + pageNum);    
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

function returnMovies(url) {
    pageNumDisplay.innerText = pageNum;
    let index = 0;  
    console.log("page: " + pageNum);
    console.log(url);
    main.innerHTML = "";
    fetch(url).then(res => res.json())
    .then(function(data) {
        data.results.forEach(element => {

            const movieId = document.createElement("p");
            movieId.setAttribute("class", "invisible");
            movieId.setAttribute("id", "index:"+index);
            
            const divCard = document.createElement("div");
            divCard.setAttribute("class", "card");
            divCard.setAttribute("onclick", "movieClick("+index+")")

            const image = document.createElement("img");
            image.setAttribute("class", "thumbnail");
            image.setAttribute("id", "image");

            const title = document.createElement("h3");
            title.setAttribute("class", "title");

            movieId.innerHTML = `${element.id}`;
            title.innerHTML = `${element.title}`;
            image.src = imgPath + element.poster_path;
            divCard.appendChild(movieId);
            divCard.appendChild(image);
            divCard.appendChild(title);

            main.appendChild(divCard);
            index++;
        });
    });

    form.addEventListener("submit", (e) =>{
        e.preventDefault();

        const searchItem = searchBox.value;

        if (searchItem) {
            main.innerHTML = "";
            console.log(searchItem);
            returnMovies(searchApi + searchItem + "?api_key=" + apiKey);
            search.value = "";
        } else {
            returnMovies(apiLink + "1");
        }
    });
}

function movieClick(movieIndex) {
    const movieId = document.getElementById("index:"+movieIndex).textContent;
    console.log(movieId);

    sessionStorage.setItem("movieId", movieId);

    window.location.href = "movieDetails.html";
}
