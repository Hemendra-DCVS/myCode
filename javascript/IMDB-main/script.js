// API URLs
const searchAPIUrl = "http://www.omdbapi.com/?s=";
const detailsAPIUrl = "http://www.omdbapi.com/?i=";
const apiKey = "c05bfc1b";

// Getting the DOM Elements
const movieSearchBox = document.getElementById('movie-search-box');
const searchList = document.getElementById('search-list');
const searchBtn = document.getElementById('search-btn');
const movieDetailsModal = document.getElementById('movieDetailsModal');
const movieDetailsModalBody = document.getElementById('movieDetailsModalBody');
const favouriteModal = document.getElementById('favouriteModal');
const favouriteModalBody = document.getElementById('favouriteModalBody');

//favouritesMovies array stores the list of favourite items
let favouriteMovies = [];

// Support function to fetch API data
async function fetchAPI(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("API request error:", error);
    return null;
  }
}

// Loading the movies from API URL
async function loadMovies(searchTerm) {
  const data = await fetchAPI(`${searchAPIUrl}${searchTerm}&apikey=${apiKey}`);
  if (data && data.Response === "True") {
    displayMovieList(data.Search);
  }
}

// Display movie search results
function displayMovieList(movies) {
  searchList.innerHTML = "";
  movies.forEach(movie => {
    const movieItem = document.createElement('div');
    movieItem.classList.add('card', 'mb-3');
    const moviePoster = movie.Poster !== "N/A"
  ? `<img src="${movie.Poster}" class="card-img" alt="${movie.Title} Poster">`
  : '<i class="fas fa-image fa-5x"></i>';

movieItem.innerHTML = `
  <div class="row no-gutters">
    <div class="col-md-4">
      ${moviePoster}
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">${movie.Title}</h5>
        <p class="card-text">${movie.Year}</p>
        <button class="btn btn-outline-primary" onclick="addToFavourites('${movie.imdbID}')"><i class="fa-solid fa-heart fa-fade"></i></button>
        <button class="btn btn-link" data-toggle="modal" data-target="#movieDetailsModal" onclick="loadMovieDetails('${movie.imdbID}')">More Details</button>
      </div>
    </div>
  </div>
`
  searchList.appendChild(movieItem);
  });
}

// Load movie details and display
async function loadMovieDetails(movieID) {
  const response = await fetch(`${detailsAPIUrl}${movieID}&apikey=${apiKey}`);
  const movieDetails = await response.json();
  let posterContent = "";
  if (movieDetails.Poster !== "N/A") {
    posterContent = `<img src="${movieDetails.Poster}" class="img-fluid mb-3" alt="${movieDetails.Title} Poster">`;
  } else {
    posterContent = '<div class="text-center mb-3"><i class="fas fa-film fa-5x"></i></div>';
  }
  
  movieDetailsModalBody.innerHTML = `
    ${posterContent}
    <h5>${movieDetails.Title}</h5>
    <p><strong>Year:</strong> ${movieDetails.Year}</p>
    <p><strong>Rating:</strong> ${movieDetails.imdbRating}</p>
    <p><strong>Country:</strong> ${movieDetails.Country}</p>
    <p><strong>Cast:</strong> ${movieDetails.Actors}</p>
    <p><strong>Plot:</strong> ${movieDetails.Plot}</p>
    
  `
  $('#movieDetailsModal').modal('show');
}

// Add movie to favourites list
function addToFavourites(movieID) {
  if (favouriteMovies.includes(movieID)) {
    // Display a notification for "Movie already exists"
    showNotification('Movie exists in favorites!', 'exists');
  } else {
    // Add the movie to favourites
    favouriteMovies.push(movieID);
    updateFavouritesModal();
    // Display a notification for "Movie added to favorites"
    showNotification('Movie added to favorites!', 'added');
  }
}

// Update favourites modal content
function updateFavouritesModal() {
  const favoriteMoviesSection = document.getElementById('favorite-movies-section');
  favoriteMoviesSection.innerHTML = " ";
  if (favouriteMovies.length === 0) {
    favoriteMoviesSection.innerHTML = "<p>No favourite movies added yet.</p>";
  } else {
    favouriteMovies.forEach(async (movieID) => {
      const response = await fetch(`${detailsAPIUrl}${movieID}&apikey=${apiKey}`);
      const movieDetails = await response.json();
      const favoriteMovieItem = document.createElement('div');
      favoriteMovieItem.classList.add('card', 'mb-3');
      favoriteMovieItem.innerHTML = `
        <div class="row no-gutters">
          <div class="col-md-4">
            ${movieDetails.Poster !== "N/A" ? `<img src="${movieDetails.Poster}" class="card-img" alt="${movieDetails.Title} Poster">` : '<i class="fas fa-image fa-5x"></i>'}
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">${movieDetails.Title}</h5>
              <p><strong>Year:</strong> ${movieDetails.Year}</p>
              <p><strong>Plot:</strong> ${movieDetails.Plot}</p>
              <button class="btn btn-danger" onclick="removeFromFavourites('${movieID}')">Remove from Favourites</button>
            </div>
          </div>
        </div>
      `;
      favoriteMoviesSection.appendChild(favoriteMovieItem);
    });
  }
}

// Remove movie from favourites list
function removeFromFavourites(movieID) {
  favouriteMovies = favouriteMovies.filter(id => id !== movieID);
  showNotification('Movie removed from favorites!', 'removed');
  updateFavouritesModal();
}

// Function to show a notification
function showNotification(message, className) {
  const notification = document.createElement('div');
  notification.classList.add('notification', className);
  notification.innerHTML = `<i class="fa-solid fa-bell fa-shake"></i> ${message}`;
  document.body.appendChild(notification);
  setTimeout(() => {
    notification.classList.add('hidden');
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 500); // Remove the notification element after the transition
  }, 1000); // Show the notification for certain period (Milliseconds)
}

// Passing search term to loadMovies function after removing spaces
movieSearchBox.addEventListener('keyup', () => {
  const searchTerm = movieSearchBox.value.trim();
  if (searchTerm.length > 0) {
    loadMovies(searchTerm);
  } else {
    // Clear search results when search term is empty
    searchList.innerHTML = "";
  }
});

// Load favourite movies when the page is loaded
document.addEventListener('DOMContentLoaded', () => {
  const savedFavourites = localStorage.getItem('favouriteMovies');
  if (savedFavourites) {
    favouriteMovies = JSON.parse(savedFavourites);
    updateFavouritesModal();
  }
});

// Save favourite movies to local storage
window.addEventListener('beforeunload', () => {
  localStorage.setItem('favouriteMovies', JSON.stringify(favouriteMovies));
});
``

// Show/hide the "Back to Top" button based on scroll position
window.addEventListener('scroll', () => {
  const backToTopButton = document.querySelector('.back-to-top');
  if (window.scrollY > 400) {
    backToTopButton.style.display = 'block';
  } else {
    backToTopButton.style.display = 'none';
  }
});