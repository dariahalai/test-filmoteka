const KEY = '9068359f92c010fa6a3cf763f10a0606';
const ID = null;
const refs ={
    containerHome: document.querySelector('.home_container'),
    formSearch: document.querySelector('.header__form')
};
function fetchFilm(KEY,params){
    fetch(`https://api.themoviedb.org/3/${params}api_key=${KEY}`)
    .then(res => {return res.json()})
    .then(data => {
        markupFilms(data);
        console.log(data.results)
    })
};
const trendingParams = 'trending/movie/week?'
fetchFilm(KEY,trendingParams);

function markupFilms(data){
    const markup = data.results.map(({id,backdrop_path,original_title,genre_ids,vote_average,release_date}) => 
    `<div class="film-card" data-id=${id}>
    <img class="film-card__film-img" src="${backdrop_path}" alt="${original_title}" >
    <h1 class="film-card__film-name">${original_title}</h1>
    <p class="film-card__ganre">${genre_ids}</p>
    <p class="film-card__year">${release_date}</p>
    <p class="film-card__rating">${vote_average}</p>
    </div>
    `).join('')
    return refs.containerHome.innerHTML = markup;
};

refs.formSearch.addEventListener('submit', onSearchForm);
function onSearchForm(e){
e.preventDefault();
let name = e.currentTarget.elements.query.value;
console.log(name)
const searchParams = `search/movie?query=${name}&`;
fetchFilm(KEY,searchParams);
}

refs.containerHome.addEventListener('click',onClickCardFilm)
function onClickCardFilm(e){
    if(e.target.nodeName === 'DIV'){
    console.log(e.target.dataset.id)
    const aboutParams = `movie/${e.target.dataset.id}?`
    fetchFilm(KEY,aboutParams); 
    }

}
