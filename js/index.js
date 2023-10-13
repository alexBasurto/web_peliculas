    //envío la info del formulario mediante submit y la recojo en la función movieInfo

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
    if (!movieTitle) {
      //Utilizo esto por si quiero decir que metan algo en el form, pero si le doy al refrescar tambien me sale, solucionar el problema
      /* alert('Ingresa un título de película'); */
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
      movieDetailsArticle.className = 'movie-details';

    // agrego detalles de la película al elemento article

    const imgElement = document.createElement('img');
    if(result.Poster === 'N/A'){
    imgElement.src = "../assets/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg";
    }else{
      imgElement.src = ` ${result.Poster}`;
    }
    movieDetailsArticle.appendChild(imgElement);

    const movieTitleElement = document.createElement('h2');
    movieTitleElement.className = 'movie-title-h2';
    movieTitleElement.textContent = result.Title;
    movieDetailsArticle.appendChild(movieTitleElement);

    const yearElement = document.createElement('p');
    yearElement.setAttribute("id","movie-year-p");
    yearElement.textContent = `Año: ${result.Year}`;
    movieDetailsArticle.appendChild(yearElement);

    const typeElement = document.createElement('p');
    typeElement.setAttribute("id","movie-type-p");
    typeElement.textContent = `Tipo: ${result.Type}`;
    movieDetailsArticle.appendChild(typeElement);

    // agrego el elemento article a la section movieDetailsContainer
    movieDetailsContainer.appendChild(movieDetailsArticle);
    }


    //declaro variable para el boton de refrescar
    const clearButton = document.getElementById('clear-elements');

    //función de refrescar
    clearButton.addEventListener("click", function(){
    // lista de todos los elementos con class movie-details
    const movieDetailsElements = document.querySelectorAll('.movie-details');

    // Itera sobre la lista y elimina cada elemento
    movieDetailsElements.forEach(function(element) {
      element.remove();
    });
});

async function getSingleFilm(imdbID) {
    /*
    encargados Alex y Olatz
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

async function createFilmFile(recogeReturnFngetSingleFilm) {
    /*
    encargados Olatz y Alex
    
    */
}

