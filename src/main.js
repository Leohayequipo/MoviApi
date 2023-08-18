
const api = axios.create({
    baseURL:"https://api.themoviedb.org/3/",
    headers:{
        'Content-Type' : 'Application/json;charset=utf-8',
    },
    params : {
        'api_key' : API_KEY
    },
});

function createMovie(movies,container){
    container.innerHTML="";
    movies.forEach(movie => {
        const movieContainer = document.createElement('div');
              movieContainer.classList.add('movie-container');
              movieContainer.addEventListener('click',()=>{
                location.hash='#movie='+movie.id;
              });
        const movieImg = document.createElement('img');
            movieImg.classList.add('movie-img');
            movieImg.setAttribute('alt',movie.title);
            movieImg.setAttribute(
                'src',
                'https://image.tmdb.org/t/p/w300'+movie.poster_path,
            );
            movieContainer.appendChild(movieImg);
            container.appendChild(movieContainer);
        });        
};
function createCategories(categories,container){
    container.innerHTML="";
    categories.forEach(genre => {
        const categoriesContainer = document.createElement('div');
              categoriesContainer.classList.add('category-container');
        const categoriesName = document.createElement('h3');
            categoriesName.classList.add('category-title');
            categoriesName.setAttribute('id','id'+genre.id);
            categoriesName.addEventListener('click',()=>{
                location.hash="#category="+genre.id+'-'+genre.name;
            });
            categoriesName.innerHTML=genre.name;
        categoriesContainer.appendChild(categoriesName);
        container.appendChild(categoriesContainer);
    });
}

async function getTrendingMoviesPreview(){
    const {data} = await api('trending/movie/day?&language=es');
    const movies = data.results;
    createMovie(movies,trendingPrevieMoviesContainer);
}


//categorias
async function getCategoriesPreview(){
    const res = await fetch("https://api.themoviedb.org/3/genre/movie/list?api_key=" + API_KEY +"&language=es");
    const data = await res.json();
    const genres = data.genres;
    createCategories(genres,categoriesPreviewList);
}
async function getMoviesByCategory(id_genres){
    const {data} = await api('discover/movie',{
        params: {
            'with_genres' : id_genres,
        }
    });
    const movies = data.results;
    createMovie(movies,genericSection);
}

async function getMoviesBySearch(searchValue){
    const {data} = await api('search/movie',{
        params: {
            'query' : searchValue,
        }
    });
    const movies = data.results;
    createMovie(movies,genericSection);
}

async function getTrendingMovies(){
    const {data} = await api('trending/movie/day?&language=es');
    const movies = data.results;
    createMovie(movies,genericSection);
}
async function getMovieById(id){
    const {data:movie} = await api('movie/'+id);
    const movieImgUrl="https://image.tmdb.org/t/p/w500"+movie.poster_path;
  

    headerSection.style.background = `
           linear-gradient(180deg, rgba(0, 0, 0, 0.35) 19.27%, rgba(0, 0, 0, 0) 29.17%),
            url(${movieImgUrl})
            `;
    movieDetailTitle.textContent=movie.title; 
    movieDetailDescription.textContent=movie.overview; 
    movieDetailScore.textContent=movie.vote_average; 
    createCategories(movie.genres,movieDetailCategoriesList);
    getRelatedMoviesId(id);
}

async function getRelatedMoviesId(id){
    const {data} = await api('movie/'+id+'/recommendations');
    const relatedMovies = data.results;
    createMovie(relatedMovies,relatedMoviesContainer);

}

