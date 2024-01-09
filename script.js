let pageNum = 1;

const apiKey = "&api_key=062ce77bc25b8f2288fac988199ab904";
const movieSearchApi = "https://api.themoviedb.org/3/search/movie?query="
const apiLink = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=062ce77bc25b8f2288fac988199ab904&page=";
const imgPath = "https://image.tmdb.org/t/p/w1280";
const searchApi = "https://api.themoviedb.org/3/search/movie?query=";

const main = document.getElementById("movieSection");
const form = document.getElementById("form");
const searchBox = document.getElementById("query")
const prevButton = document.getElementById("prevButton");
const nextButton = document.getElementById("nextButton");
const pageNumDisplay = document.getElementById("pageNumDisplay");



returnMovies(apiLink  + "1");

prevButton.onclick = prevClick
nextButton.onclick = nextClick

function prevClick() {
if (pageNum > 1) {
    pageNum--;
}
    returnMovies(apiLink + pageNum);
}

function nextClick() {
    if (pageNum < 20) {
        pageNum++;
    }
        returnMovies(apiLink + pageNum);
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

            const divRow = document.createElement("div");
            divRow.setAttribute("class", "row");

            const divColumn = document.createElement("div");
            divColumn.setAttribute("class", "column");

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
            divColumn.appendChild(divCard);
            divRow.appendChild(divColumn);

            main.appendChild(divRow);
            index++;
        });
    });

    form.addEventListener("submit", (e) =>{
        e.preventDefault();

        const searchItem = searchBox.value;

        if (searchItem) {
            main.innerHTML = "";
            console.log(searchItem);
            returnMovies(searchApi + searchItem + apiKey);
            search.value = "";
        } else {
            returnMovies(apiLink + "1");
        }
    })
}

function movieClick(movieIndex) {
    const movieId = document.getElementById("index:"+movieIndex).textContent;
    console.log(movieId);

    sessionStorage.setItem("movieId", movieId);

    window.location.href = "movieDetails.html"
}




