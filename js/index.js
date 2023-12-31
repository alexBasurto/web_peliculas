//const resultadosBusqueda = document.getElementById('resultadosBusqueda');
const fichaPelicula = document.getElementById('fichaPelicula');
const movieDetailsContainer = document.getElementById('movie-details-container');

document.getElementById('movie-search-form').addEventListener('submit', async function getFilmsFromApi(movieInfo) {
  //prevent default para no generar un article cada vez que submit
  movieInfo.preventDefault();

  //variables para el nombre,año y tipo de la pelicula
  const movieTitle = document.getElementById('movie-title').value;
  const movieYear = document.getElementById('movie-year').value;
  const movieType = document.getElementById('movie-type').value;
  //variable para la apikey
  const apiKey = 'ddcc8d85';

    document.getElementById('movie-search-form').reset();
    movieDetailsContainer.innerHTML = '';
    
  
    //alerta si no meten ningún título
    if (movieTitle === "") {
      //Utilizo esto por si quiero decir que metan algo en el form, pero si le doy al refrescar tambien me sale, solucionar el problema
      alert('Insert movie title');
      return;
    }
  
    //variable con la url y entrada de las variables de nombre y apikey en forma de template string
    const apiUrl = `https://www.omdbapi.com/?s=${movieTitle}&y=${movieYear}&type=${movieType}&apikey=${apiKey}`;
  
    // try & catch
    try {
      //variable con la respuesta que recojo con un fetch  
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('Error al obtener información de la película desde la API');
      }
      
      //recojo la respuesta y mediante json los formateo para javascript
      const data = await response.json();
  
      if (data.Error) {
        throw new Error(data.Error);
      }
    
    // creo article para mostrar resultados

    //recojo los datos que recibo en array y los separo
    const results = data['Search'];
    /* console.log(results); */

    results.map((result) => {
      renderMovie(result);
    })

  } catch (error) {
    console.error('Error:', error);
  }
});


//función de pintar en HTML
function renderMovie(result){
    const movieDetailsArticle = document.createElement('article');
    movieDetailsContainer.className = 'clBusqueda';
    movieDetailsArticle.className = 'movie-details';

  // agrego detalles de la película al elemento article

  const imgElement = document.createElement('img');
  imgElement.className = 'movie-image';
  if(result.Poster === 'N/A'){
  imgElement.src = "../assets/placeholder-vertical.jpg";
  }else{
    imgElement.src = ` ${result.Poster}`;
  }
  movieDetailsArticle.appendChild(imgElement);

  const movieTitleElement = document.createElement('h2');
  movieTitleElement.className = 'movie-title-h2';
  movieTitleElement.textContent = result.Title;
  movieDetailsArticle.appendChild(movieTitleElement);

  const yearElement = document.createElement('p');
  yearElement.setAttribute("id", "movie-year-p");
  yearElement.textContent = `Year: ${result.Year}`;
  movieDetailsArticle.appendChild(yearElement);

  const typeElement = document.createElement('p');
  typeElement.setAttribute("id", "movie-type-p");
  typeElement.textContent = `Type: ${result.Type}`;
  movieDetailsArticle.appendChild(typeElement);

  //favs (ALEX)
  const favElement = document.createElement('img');
  if (isThisFilmFav(result.imdbID)) {
    favElement.setAttribute("src", "../assets/star_fav.png");
  } else {
    favElement.setAttribute("src", "../assets/star.png");
  }
  favElement.className = 'favorite';
  favElement.addEventListener('click', () => {
    const currentSrc = favElement.getAttribute('src');
    if (currentSrc === '../assets/star_fav.png') {
      favElement.setAttribute("src", "../assets/star.png");
    } else if (currentSrc === '../assets/star.png') {
      favElement.setAttribute("src", "../assets/star_fav.png");
    }

    addOrRemoveFavs(result.imdbID);
});
  movieDetailsArticle.appendChild(favElement);


  // agrego el elemento article a la section movieDetailsContainer
  movieDetailsContainer.appendChild(movieDetailsArticle);



  //click en la imágen y pinto con la función getSingleFilm que recoge con el imdbId toda al info de la película
  imgElement.addEventListener('click', function() {

    //el IMDb ID de la película
    const imdbID = result.imdbID; 
    //llamo a la función getSingleFilm para obtener los detalles de la película
    getSingleFilm(imdbID);
    });
  }

  //declaro variable para el boton de refrescar
  const clearButton = document.getElementById('clear-elements');

  //función de refrescar
  clearButton.addEventListener("click", function(event){
  //si hago click en este boton no le llega info al formulario de que se ha hecho click
  //event.stopPropagation();
  // lista de todos los elementos con class movie-details
  const movieDetailsElements = document.querySelectorAll('.movie-details');

  // Itera sobre la lista y elimina cada elemento
  movieDetailsElements.forEach(function (element) {
    element.remove();
  });
});

function createResultsTable(result) {
  movieDetailsArticle = document.createElement('article');
  movieDetailsArticle.className = 'movie-details';

  // agrego img,title, type y año al elemento article

  const imgElement = document.createElement('img');
  imgElement.className = 'movie-img';
  if(result.Poster === 'N/A'){
  imgElement.src = "../assets/placeholder-vertical.jpg";
  }else{
    imgElement.src = ` ${result.Poster}`;
  }
  movieDetailsArticle.appendChild(imgElement);

  const movieTitleElement = document.createElement('h2');
  movieTitleElement.className = 'movie-title-h2';
  movieTitleElement.textContent = result.Title;
  movieDetailsArticle.appendChild(movieTitleElement);

  const yearElement = document.createElement('p');
  yearElement.setAttribute("id", "movie-year-p");
  yearElement.textContent = `Año: ${result.Year}`;
  movieDetailsArticle.appendChild(yearElement);

  const typeElement = document.createElement('p');
  typeElement.setAttribute("id", "movie-type-p");
  typeElement.textContent = `Tipo: ${result.Type}`;
  movieDetailsArticle.appendChild(typeElement);

  // agrego el elemento article a la section movieDetailsContainer
  movieDetailsContainer.appendChild(movieDetailsArticle);
}

async function getSingleFilm(imdbID) {
  const urlStart = 'http://www.omdbapi.com/';
  const filmId = '?i=' + imdbID;
  const apiKey = '&apikey=66dfa7cd';
  const urlFilm = urlStart + filmId + apiKey;

  try {
    const response = await fetch(urlFilm);
    if (!response.ok) {
      throw new Error("Fallo en la llamada.");
    }
    const film = await response.json();
    console.log(film);
    createFilmFile(film); /*recibidos datos de la API,
      llamamos a la fn que crea el DOM*/
  } catch (e) {
    console.log(e);
    alert('Error llamando a la API.');
    return null;
  }

  /*
  encargados Alex y Olatz
  getSingleFilm('tt0167261'); pruebas
  Cada tarjeta tendrá un addEventLIstener que activará esta función, recogiendo el ID de IMDB de la película o serie.
  con ese Id construimos la URL de la API de esa peli concreta, p.e.:
  http://www.omdbapi.com/?i=tt0167261&apikey=66dfa7cd separamos por partes:

  http://www.omdbapi.com/     inicio URL
  ?i=tt0167261                i = id de IMDB
  &apikey=66dfa7cd            apiKey

  llamamos a la URL y recogemos los datos, guardandolos en una variable.
  devolvemos esa variable (return) para probar, un console.log
  otra función recogerá esa variable para construir el DOM.
  */
}

async function createFilmFile(filmData) {
    /*
    encargados Olatz y Alex    
    */
    //1º vaciar .innerHTML=""
    //2º sacar la info
    //
    movieDetailsContainer.innerHTML = "";

    //Creo clase para la sección
    //const movieSection = document.createElement("section");
    //movieSection.className = 'movieSection';


    movieDetailsContainer.className = 'clFicha';

    //Meto la nueva sección en la que ya existía
    //movieDetailsContainer.appendChild(movieSection);

    //Titulo
    
    // const title = filmData.Title;
    // console.log(title);
    const tituloElem = document.createElement("h1");
    tituloElem.className = "title-style";
    tituloElem.innerHTML = filmData.Title.toUpperCase();
    movieDetailsContainer.appendChild(tituloElem);
    
    //Creo ARTICULO PRINCIPAL, contendrá articulo de texto y otro de imagen en FLEXBOX

    const articlePrincipal = document.createElement("article");
    articlePrincipal.className = "article-principal";
    movieDetailsContainer.appendChild(articlePrincipal);

    //Creo ARTICULO de texto dentro de la sección y del ARTICULO PRINCIPAL     
    const articleText = document.createElement('article');
    articleText.className = 'article-text';
    articlePrincipal.appendChild(articleText);

    //Año
    //const year = filmData.Year;
    // console.log(year);
    const yearElem = document.createElement("p");
    const textY = document.createTextNode("Year:  ");
    textY.className = 'title-style';
    yearElem.appendChild(textY);
    yearElem.innerHTML += filmData.Year;
    articleText.appendChild(yearElem);
    


    //Runtime
    const runElem = document.createElement("p");
    const textRunE = document.createTextNode("Runtime:  ");

    runElem.appendChild(textRunE);
    runElem.innerHTML += filmData.Runtime;
    articleText.appendChild(runElem);


    //Rated
    const ratedElem = document.createElement("p");
    const textRatedE = document.createTextNode("Certification: ");
    ratedElem.appendChild(textRatedE);
    const certificationElem = document.createElement("p");
    const certification = document.createTextNode(filmData.Rated);
    certificationElem.appendChild(certification);
    ratedElem.appendChild(certificationElem)
    articleText.appendChild(ratedElem);
    //Estilos de certification (rated)
    const certficationsColors = {
      'R': '#D30000',
      'PG-13': '#A0A500',
      'G': '#199500',
      'PG': '#199500',
      'N/A': '#737373',
      'Not Rated': '#737373',
    };
    const certificationBGColors = {
      'R': '#FF7474',
      'PG-13': '#F7FC5A',
      'G': '#8BFF74',
      'PG': '#8BFF74',
      'N/A': '#BFBFBF',
      'Not Rated': '#BFBFBF',
    };
    if (filmData.Rated === 'R' || filmData.Rated === 'PG-13' || filmData.Rated === 'PG' || filmData.Rated === 'G' || filmData.Rated === 'N/A' || filmData.Rated === 'Not Rated') {
      certificationElem.style.color = certficationsColors[filmData.Rated];
      certificationElem.style.backgroundColor = certificationBGColors[filmData.Rated];
      certificationElem.style.display = 'inline';
      certificationElem.style.borderRadius = '25px';
    }

    //Country
    
    const countryElem = document.createElement("p");
    const textC = document.createTextNode("Country:  ")
    countryElem.appendChild(textC);
    countryElem.innerHTML += filmData.Country;
    articleText.appendChild(countryElem);
    

    //Direction
    
    const direElem = document.createElement("p");
    const textDir = document.createTextNode("Direction:  ");
    direElem.appendChild(textDir);
    direElem.innerHTML += filmData.Director;
    articleText.appendChild(direElem);


    //Writer
     
    const writerElem = document.createElement("p");
    const textW = document.createTextNode("Writer:  ");
    writerElem.appendChild(textW);
    writerElem.innerHTML += filmData.Writer;
    articleText.appendChild(writerElem);
  
    
    //Cast
    
    const castElem = document.createElement("p");
    const textAct = document.createTextNode("Cast:  ")
    castElem.appendChild(textAct);
    castElem.innerHTML += filmData.Actors;
    articleText.appendChild(castElem);


    //Type
    
    const typElem = document.createElement("p");
    const textoTyp = document.createTextNode("Type: ")
    typElem.appendChild(textoTyp);
    typElem.innerHTML += filmData.Type;
    articleText.appendChild(typElem);
    
    //Boxoffice
    
    const boxOffice = document.createElement("p");
    const textBox = document.createTextNode("BoxOffice: ")
    boxOffice.appendChild(textBox);
    boxOffice.innerHTML += filmData.BoxOffice;
    articleText.appendChild(boxOffice);
    
    //Genre
    const generElem = document.createElement("p");
    const textGen = document.createTextNode("Genre:  ");
    
    generElem.appendChild(textGen);
    generElem.innerHTML += filmData.Genre;
    articleText.appendChild(generElem);
    
    
    //Premios
    
    const awardsElem = document.createElement("p");
    const textAward = document.createTextNode("Awards:  ")
    awardsElem.appendChild(textAward);
    awardsElem.innerHTML += filmData.Awards;   
    articleText.appendChild(awardsElem);
    //articleMoreInfo.appendChild(punto);
    
    //Language
    
    const languaElem = document.createElement("p");
    const textLangua = document.createTextNode("Language: ");
    languaElem.appendChild(textLangua);
    languaElem.innerHTML += filmData.Language;
    articleText.appendChild(languaElem);
    
    //Imagen
    //const mainContainer = document.getElementById("main-container");
    
    const imagenElem = document.createElement("img");
    if(filmData.Poster !== 'N/A'){
    imagenElem.src = filmData.Poster;
    } else{
      imagenElem.src = "../assets/placeholder-vertical.jpg";
    }
    
    const articleImage = document.createElement("article");
    articleImage.className = 'article-image';
    articlePrincipal.appendChild(articleImage);
    articleImage.appendChild(imagenElem);
    
    //Create article with moreinfo
    
    
    const articleMoreInfo = document.createElement("article");
    articleMoreInfo.className = 'article-more-info';
    movieDetailsContainer.appendChild(articleMoreInfo);
    
    
    
    //Plot
    
    const plotElem = document.createElement("p");
    const textPlot = document.createTextNode('Plot: ');
    plotElem.appendChild(textPlot);
    plotElem.innerHTML += filmData.Plot;
    articleMoreInfo.appendChild(plotElem);
    

    //Creo un articulo articleRatings dentro de MoreInfo para que contenga 2 articulos: Rating1 y Rating2 para ponerlos en flexbox

    const articleRatings = document.createElement("article");
    articleRatings.className = 'article-ratings';

    //Ratings
    const ratings = filmData.Ratings;   //Asigno una variable a la info de la pagina
    
    const textRatings = document.createTextNode("Ratings:  "); 
    const ratingElem = document.createElement("p");  //Creo elemento para el texto q traje
    



    articleMoreInfo.appendChild(articleRatings);


    const articleRating1 = document.createElement("article");
    articleRating1.className = "article-rating1";

    
    ratingElem.appendChild(textRatings);
    
    for(let i = 0; i < ratings.length; i++)
    {
      const RatingObj = ratings[i];
      
      
      ratingElem.innerHTML += `<br> ${RatingObj.Source}: ${RatingObj.Value} `;
      
      articleRating1.appendChild(ratingElem); 
      
    }  

    articleRatings.appendChild(articleRating1);




    //Creacion article rating2

    const articleRating2 = document.createElement("article");
    articleRating2.className = 'article-rating2';
    articleRatings.appendChild(articleRating2);
    //

    
    //IMDB Rating
    const imdbRatElem = document.createElement("p");
    const textImdbR = document.createTextNode("IMDB Rating: ")
    imdbRatElem.appendChild(textImdbR);
    imdbRatElem.innerHTML += filmData.imdbRating;
    articleRating2.appendChild(imdbRatElem);




    //imdbVotes

    const imdbVotElem = document.createElement("p");
    const textV = document.createTextNode("IMDB Votes: ");
    imdbVotElem.appendChild(textV);
    imdbVotElem.innerHTML += filmData.imdbVotes;
    articleRating2.appendChild(imdbVotElem)

  //favs (código de ALEX)
  const favElement = document.createElement('img');
  if (isThisFilmFav(filmData.imdbID)) {
    favElement.setAttribute("src", "../assets/star_fav.png");
  } else {
    favElement.setAttribute("src", "../assets/star.png");
  }
  favElement.className = 'favorite';

  favElement.addEventListener('click', () => {
    const currentSrc = favElement.getAttribute('src');
    if (currentSrc === '../assets/star_fav.png') {
      favElement.setAttribute("src", "../assets/star.png");
    } else if (currentSrc === '../assets/star.png') {
      favElement.setAttribute("src", "../assets/star_fav.png");
    }

    addOrRemoveFavs(filmData.imdbID);
});

  movieDetailsContainer.appendChild(favElement);

}


//función para añadir o quitar películas de favoritos en localStorage
function addOrRemoveFavs(imdbID) {

  if (localStorage.getItem(imdbID) === null) {
    localStorage.setItem(imdbID, 'favoritos');
  } else {
    localStorage.removeItem(imdbID);
  }
  //pruebas: addOrRemoveFavs('tt0167261');
}

//función para comprobar si es fav o no
function isThisFilmFav(imdbID) {
  if (localStorage.getItem(imdbID) === null) {
    return false;
  } else {
    return true;
  }
}