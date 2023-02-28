const screen = document.querySelector('#movie-screen');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie-selection');
let ticketPrice = +movieSelect.value;

populateUI();

// Save selected movie index and price
function setMovieData(index, price) {
    localStorage.setItem('selected movie index', index);
    localStorage.setItem('selected movie price', price);
}

// Update total and count
function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));
    localStorage.setItem('selected seats', JSON.stringify(seatsIndex));
    count.innerText = selectedSeats.length;
    total.innerText = selectedSeats.length * ticketPrice;
}

// Get data from local storage and populate UI
function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem('selected seats')) || [];
    seats.forEach((seat, index) => {
        if (selectedSeats.indexOf(index) > -1) {
            seat.classList.add('selected');
        }
    });

    const movieIndex = +localStorage.getItem('selected movie index');
    if (movieIndex !== null) {
        movieSelect.selectedIndex = movieIndex;
    }

    ticketPrice = +localStorage.getItem('selected movie price') || ticketPrice;

    // Update count and total
    updateSelectedCount();
}

// Movie select event 
movieSelect.addEventListener('change', e => {
    ticketPrice = +e.target.value;
    setMovieData(e.target.selectedIndex, e.target.value);
    updateSelectedCount();
});

// Seat click event
screen.addEventListener('click', e => {
    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
        e.target.classList.toggle('selected');
        updateSelectedCount();
    }
});
