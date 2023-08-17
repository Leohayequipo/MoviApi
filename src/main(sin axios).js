
async function getTrendingMoviesPreview(){
    const res = await fetch("https://api.themoviedb.org/3/trending/movie/day?api_key=" + API_KEY +"&language=es");
    const data = await res.json();
    const movies = data.results;
    movies.forEach(movie => {
        //me posiciono en el contenedor 
        const trendingPrevieMoviesContainer = document.querySelector
        ('#trendingPreview .trendingPreview-movieList');
      
        //creo un div
        const movieContainer = document.createElement('div');
        //le agrego la class movie-container
              movieContainer.classList.add('movie-container');

        //creo un elemento img     
        const movieImg = document.createElement('img');
            //agrego clase
            movieImg.classList.add('movie-img');
            //modifico atributos
            movieImg.setAttribute('alt',movie.title);
            movieImg.setAttribute(
                'src',
                'https://image.tmdb.org/t/p/w300'+movie.poster_path,
            );
            //busco la class movie-container y agrego etiqueta img, con sus atributos
            movieContainer.appendChild(movieImg);
       
            //agrego el contenedor que tiene la class movi-container y la agrego al div
            trendingPrevieMoviesContainer.appendChild(movieContainer);
    });

}

//categorias
async function getCategoriesPreview(){
    const res = await fetch("https://api.themoviedb.org/3/genre/movie/list?api_key=" + API_KEY +"&language=es");
    const data = await res.json();
    const genres = data.genres;
   
    genres.forEach(genre => {
        const categoriesPreviewContainer = document.querySelector
        ('#categoriesPreview .categoriesPreview-list');
        const categoriesContainer = document.createElement('div');
              categoriesContainer.classList.add('category-container');
        const categoriesName = document.createElement('h3');
            categoriesName.classList.add('category-title');
            categoriesName.setAttribute('id','id'+genre.id);
            categoriesName.innerHTML=genre.name;


// <h3 id="id28" class="category-title">Romance</h3>
    categoriesContainer.appendChild(categoriesName);
      
    categoriesPreviewContainer.appendChild(categoriesContainer);
    });

}


getTrendingMoviesPreview();
getCategoriesPreview();