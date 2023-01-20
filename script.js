


// To ensure Cypress tests work as expeded, add any code/functions that you would like to run on page load inside this function
const BASE_URL = "https://resource-ghibli-api.onrender.com/films/"
const people_URL = "https://resource-ghibli-api.onrender.com/people/"
const selectMovie = document.querySelector("#movie-menu");
console.log(selectMovie)
const movieInfo = document.querySelector("#display-info");
console.log(movieInfo)
const submitMovieReview = document.querySelector("section form")
console.log(submitMovieReview)
const addMovieReview = document.querySelector("#review ul")
console.log("addMovieReview")
const resetMovieReviews = document.querySelector("#reviews button")
console.log("resetMovieReviews")
const addPeople = document.querySelector("#show-people")
const ol = document.createElement("ol")
addPeople.before(ol)

selectMovie.addEventListener("submit", getCurrentApi); 

function getCurrentApi(event) {
    event.preventDefault();
    form.reset()

}
function run() {

    //Add code you want to run on page load here
    fetch(`${BASE_URL}`)
        .then((response) => response.json())
        .then((json) => {
            console.log(json)
        })
        .catch((error) => {
            // call createErrorMessage function with error
            console.log(error)
            createErrorMessage(error)
            //create a section element with the class of error
            getUserData()
            function createErrorMessage() {
            }
        })
    function getUserData(response) {
        response.forEach(films => {
            const option = document.createElement("option");
            option.setAttribute("value", films.title)
            option.innerText = films.title
            selectMovie.append(option)
            })
            selectMovie.addEventListener("change", (event => {
                event.preventDefault()

                response.forEach(films => {
                    if (selectMovie.value === films.title) {
                        movieInfo.innerHTML = ""
                        const movieTitles = document.createElement("h3")
                        const movieYear = document.createElement("p")
                        const movieDescription = document.querySelector("p")
                        movieTitles.innerText = films.title
                        movieTitles.append(movieTitles)

                        movieYear.innerText = films.release_date
                        movieInfo.append(movieYear)

                        movieDescription.innerText = films.movieDescription
                        movieInfo.append(description)
                    }
                })

                submitMovieReview.addEventListener("submit", (event) => {
                    event.preventDefault()
                    if (selectMovie.value === "") {
                        alert("No review found, select film")
                    } else {
                        const userReview = document.querySelector("form input[type='text']")
                        review = document.createElement("li")
                        review.innerHTML = `<strong> ${movieSelect.value}:</strong> ${userReview.value}`
                        addMovieReview.append(review)
                        userReview.value = ""
                    }
                })
                resetMovieReviews.addEventListener("click", (event) => {
                    event.preventDefault()
                    addMovieReview.innerHTML = ""
                })
                addPeople.addEventListener("click", (event) => {
                    event.preventDefault()
                    ol.innerHTML = ""
                    fetch(`${people_URL}`)
                        .then((response) => response.json())
                        .then((response) => {
                            for (let films of response) {
                                if (selectMovie.value === films.title) {
                                    console.log(films.id)
                                    for (let people of response) {
                                        filmId = people.flims[0].split("/")
                                        if (films.id === filmId[filmId.length - 1]) {
                                            const li = document.createElement("li")
                                            ol.append(li)
                                            li.innerText = people.name

                                        }
                                    }
                                }
                            }

                        })
                })
            }))


        }

    }

// This function will "pause" the functionality expected on load long enough to allow Cypress to fully load
// So that testing can work as expected for now
// A non-hacky solution is being researched

setTimeout(run, 1000);
