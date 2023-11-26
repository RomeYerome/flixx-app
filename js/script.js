// SETTING UP A PAGE ROUTER IN VANILLA JS
const global = {
    currentPage: window.location.pathname,
}



// HANDLES
const popularMoviesDiv = document.querySelector('#popular-movies');
const popularShowsDiv = document.querySelector('#popular-shows');


// EVENTS
document.querySelector('nav').addEventListener('click', highlightActiveLink);
document.addEventListener('DOMContentLoaded', init);





// FUNCTIONS

// Get 20 most Popular Movies
async function getPopularShows() {
    const { results } = await fetchAPIData('tv/popular');


    for (const show of results) {
        // create card div
        const div = document.createElement('div');
        div.classList.add('card');  // add class card to div
        const a = document.createElement('a');  // create anchor tag
        a.setAttribute('href', `tv-details.html?id=${show.id}`);    // set href attribute
        const img = document.createElement('img');  // create img tag
        const imgSrc = `${show.poster_path}` ? `https://image.tmdb.org/t/p/w500/${show.poster_path}` : `/images/no-image.jpg`    // set src attribute
        img.setAttribute('src', `${imgSrc}`);   // set src attribute 
        img.setAttribute('alt', show.name);   // set alt attribute
        img.classList.add('card-img-top');  // add class card-img-top to img
        a.appendChild(img); // append img to anchor tag

        const divCardBody = document.createElement('div');  // create div for card body
        divCardBody.classList.add('card-body'); // add class card-body to div
        const h5 = document.createElement('h5');    // create h5 tag
        h5.classList.add('card-title'); // add class card-title to h5 
        const h5Text = document.createTextNode(show.name);    // create text node
        h5.appendChild(h5Text); // append text node to h5
        const p = document.createElement('p');  // create p tag
        p.classList.add('card-text');   // add class card-text to p
        const small = document.createElement('small');  // create small tag
        small.classList.add('text-muted');  // add class text-muted to small
        const smallText = document.createTextNode(`Aired: ${show.first_air_date}`);    // create text node
        small.appendChild(smallText);   // append text node to small   
        p.appendChild(small);       // append small to p
        divCardBody.appendChild(h5);    // append h5 to div
        divCardBody.appendChild(p);    // append p to div

        div.appendChild(a); // append anchor tag to div
        div.appendChild(divCardBody);   // append divCardBody to div

        popularShowsDiv.appendChild(div);  // append div to popularMoviesDiv

    }

}

async function getPopularMovies() {
    const { results } = await fetchAPIData('movie/popular');

    for (const movie of results) {
        // create card div
        const div = document.createElement('div');
        div.classList.add('card');  // add class card to div
        const a = document.createElement('a');  // create anchor tag
        a.setAttribute('href', `movie-details.html?id=${movie.id}`);    // set href attribute
        const img = document.createElement('img');  // create img tag
        const imgSrc = `${movie.poster_path}` ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : `/images/no-image.jpg`    // set src attribute
        img.setAttribute('src', `${imgSrc}`);   // set src attribute 
        img.setAttribute('alt', movie.title);   // set alt attribute
        img.classList.add('card-img-top');  // add class card-img-top to img
        a.appendChild(img); // append img to anchor tag

        const divCardBody = document.createElement('div');  // create div for card body
        divCardBody.classList.add('card-body'); // add class card-body to div
        const h5 = document.createElement('h5');    // create h5 tag
        h5.classList.add('card-title'); // add class card-title to h5 
        const h5Text = document.createTextNode(movie.title);    // create text node
        h5.appendChild(h5Text); // append text node to h5
        const p = document.createElement('p');  // create p tag
        p.classList.add('card-text');   // add class card-text to p
        const small = document.createElement('small');  // create small tag
        small.classList.add('text-muted');  // add class text-muted to small
        const smallText = document.createTextNode(`Release: ${movie.release_date}`);    // create text node
        small.appendChild(smallText);   // append text node to small   
        p.appendChild(small);       // append small to p
        divCardBody.appendChild(h5);    // append h5 to div
        divCardBody.appendChild(p);    // append p to div

        div.appendChild(a); // append anchor tag to div
        div.appendChild(divCardBody);   // append divCardBody to div

        popularMoviesDiv.appendChild(div);  // append div to popularMoviesDiv

    }

}

// Display Movie Details
async function getMovieDetails() {
    const movieId = window.location.search.slice(4);
    console.log(movieId);

    const result = await fetchAPIData(`movie/${movieId}`);
    console.log(result);

    const { title, poster_path, overview, release_date, vote_average, genres, homepage, production_companies, budget, revenue, runtime, status } = result;

    // create outer div
    const div = document.createElement('div');
    div.classList.add('details-top');  // add class details-top to div

    // create first child div
    const div1 = document.createElement('div');  // create div
    const img = document.createElement('img');  // create img tag
    const imgSrc = `${poster_path}` ? `https://image.tmdb.org/t/p/w500/${poster_path}` : `/images/no-image.jpg`    // set src attribute
    img.setAttribute('src', `${imgSrc}`);   // set src attribute
    img.setAttribute('alt', title);   // set alt attribute
    img.classList.add('card-img-top');  // add class card-img-top to img
    div1.appendChild(img); // append img to div1
    div.appendChild(div1);  // append div1 to div


    // create second child div
    const div2 = document.createElement('div');  // create div

    const h2 = document.createElement('h2');    // create h2 tag
    const h2Text = document.createTextNode(title);    // create text node
    h2.appendChild(h2Text); // append text node to h2

    const p1 = document.createElement('p');  // create p tag
    const i = document.createElement('i');  // create i tag
    i.classList.add('fas', 'fa-star', 'text-primary');  // add class fas, fa-star, text-primary to i
    const p1Text = document.createTextNode(` ${vote_average.toFixed()} / 10`);    // create text node
    p1.appendChild(i);  // append i to p1
    p1.appendChild(p1Text); // append text node to p1

    const p2 = document.createElement('p');  // create p tag
    p2.classList.add('text-muted');  // add class text-muted to p2
    const p2Text = document.createTextNode(`Release Date: ${release_date}`);    // create text node
    p2.appendChild(p2Text); // append text node to p2

    const p3 = document.createElement('p');  // create p tag
    const p3Text = document.createTextNode(overview);    // create text node
    p3.appendChild(p3Text); // append text node to p3

    const h5 = document.createElement('h5');    // create h5 tag
    const h5Text = document.createTextNode('Genres');    // create text node
    h5.appendChild(h5Text); // append text node to h5

    const ul = document.createElement('ul');    // create ul tag
    ul.classList.add('list-group'); // add class list-group to ul
    for (const genre of genres) {   // loop through genres
        const li = document.createElement('li');    // create li tag
        const liText = document.createTextNode(genre.name);    // create text node
        li.appendChild(liText); // append text node to li
        ul.appendChild(li); // append li to ul
    }

    const a = document.createElement('a');  // create a tag
    a.setAttribute('href', `${homepage}`);    // set href attribute
    a.setAttribute('target', '_blank');    // set target attribute
    a.classList.add('btn'); // add class btn to a
    const aText = document.createTextNode('Visit Movie Homepage');    // create text node
    a.appendChild(aText); // append text node to a

    div2.appendChild(h2);   // append h2 to div2
    div2.appendChild(p1);   // append p1 to div2
    div2.appendChild(p2);   // append p2 to div2
    div2.appendChild(p3);   // append p3 to div2
    div2.appendChild(h5);   // append h5 to div2
    div2.appendChild(ul);   // append ul to div2
    div2.appendChild(a);   // append a to div2
    div.appendChild(div2);  // append div2 to div

    // create third child div
    const div3 = document.createElement('div');  // create div
    div3.classList.add('details-bottom');  // add class details-bottom to div3
    const h22 = document.createElement('h2');    // create h2 tag
    const h22Text = document.createTextNode('Movie Info');    // create text node
    h22.appendChild(h22Text); // append text node to h22

    const ul2 = document.createElement('ul');    // create ul tag

    const li31 = document.createElement('li');    // create li tag
    const span31 = document.createElement('span');    // create span tag
    span31.classList.add('text-secondary');    // add class text-secondary to span31
    const span31Text = document.createTextNode('Budget: ');    // create text node
    const li31Text = document.createTextNode(budget.toLocaleString());    // create text node
    span31.appendChild(span31Text); // append text node to span31
    li31.appendChild(span31); // append text node to li31
    li31.appendChild(li31Text); // append text node to li31

    const li32 = document.createElement('li');    // create li tag
    const span32 = document.createElement('span');    // create span tag
    span32.classList.add('text-secondary');    // add class text-secondary to span31
    const span32Text = document.createTextNode('Revenue: ');    // create text node
    const li32Text = document.createTextNode(revenue.toLocaleString());    // create text node
    span32.appendChild(span32Text); // append text node to span31
    li32.appendChild(span32); // append text node to li31
    li32.appendChild(li32Text); // append text node to li32

    const li33 = document.createElement('li');    // create li tag
    const span33 = document.createElement('span');    // create span tag
    span33.classList.add('text-secondary');    // add class text-secondary to span31
    const span33Text = document.createTextNode('Runtime: ');    // create text node
    const li33Text = document.createTextNode(`${runtime} minutes`);    // create text node
    span33.appendChild(span33Text); // append text node to span31
    li33.appendChild(span33); // append text node to li31
    li33.appendChild(li33Text); // append text node to li33

    const li34 = document.createElement('li');    // create li tag
    const span34 = document.createElement('span');    // create span tag
    span34.classList.add('text-secondary');    // add class text-secondary to span31
    const span34Text = document.createTextNode('Status: ');    // create text node
    const li34Text = document.createTextNode(status);    // create text node
    span34.appendChild(span34Text); // append text node to span31
    li34.appendChild(span34); // append text node to li31
    li34.appendChild(li34Text); // append text node to li34

    ul2.appendChild(li31);  // append li31 to ul2
    ul2.appendChild(li32);  // append li32 to ul2
    ul2.appendChild(li33);  // append li33 to ul2
    ul2.appendChild(li34);  // append li34 to ul2

    const h42 = document.createElement('h4');    // create h4 tag
    const h42Text = document.createTextNode('Production Companies');    // create text node
    h42.appendChild(h42Text); // append text node to h42

    const div32 = document.createElement('div');  // create div
    div32.classList.add('list-group');  // add class list-group to div32
    const div32Text = document.createTextNode(production_companies.map(company => company.name).join(', '));    // create text node
    div32.appendChild(div32Text); // append text node to div32

    div3.appendChild(h22);  // append h22 to div3
    div3.appendChild(ul2);  // append ul2 to div3
    div3.appendChild(h42);  // append h42 to div3
    div3.appendChild(div32);  // append div32 to div3


    document.querySelector('#movie-details').appendChild(div);  // append div to movie-details
    document.querySelector('#movie-details').appendChild(div3);  // append div to movie-details



    
}


// UTILITIES

// Show spinner
function showSpinner() {
    document.querySelector('.spinner').classList.add('show');
}
function hideSpinner() {
    document.querySelector('.spinner').classList.remove('show');
}

// Highlight Current Page
function highlightActiveLink() {
    // select all nav links
    const navLinks = document.querySelectorAll('.nav-link');

    // loop through links
    navLinks.forEach(link => {
        // get the href attribute
        const href = link.getAttribute('href');
        // compare to current page
        href === global.currentPage ? link.classList.add('active') : link.classList.remove('active');
        // if match, add active class
        console.log(href, global.currentPage);
    })


}

// Init App
function init() {
    switch (global.currentPage) {
        case '/':
        case '/index.html':
            getPopularMovies();
            break;
        case '/shows.html':
            getPopularShows();
            break;
        case '/movie-details.html':
            getMovieDetails();
            break;
        case '/tv-details.html':
            console.log('Show Details');
            break;
        case '/search.html':
            console.log('Search');
            break;
    }

    highlightActiveLink();
}


// Fetch Data from TMDB API
async function fetchAPIData(endpoint) {
    const API_KEY = 'a396d66e455942863830bc4917af4415';
    const API_URL = `https://api.themoviedb.org/3/`;

    showSpinner();
    const response = await fetch(`${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`);

    hideSpinner();
    if (!response.ok)
        throw new Error(`An error has occured: ${response.status}`);
    else
        return await response.json();

}




// a396d66e455942863830bc4917af4415