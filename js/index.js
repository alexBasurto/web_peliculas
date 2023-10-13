const movieDetailsContainer = document.getElementById('movie-details-container');
const fichaPelicula = document.getElementById('fichaPelicula');

async function getFilmsFromApi(title, year, type) {
    /*
    encargado David.
    Esta función recogerá los datos del formulario enviados por el usuario.
    Con esos datos, construirá la URL de consulta de la API,
    ejemplo:
    http://www.omdbapi.com/?s=the_lord_of_the_rings&y=2002&type=movie&apikey=66dfa7cd
    si separamos por partes se nos queda:

    http://www.omdbapi.com/?
    s=the_lord_of_the_rings
    &y=2002
    &type=movie
    &apikey=66dfa7cd
    podemos prescindir de plot ya que no afecta a los resultados.

    una vez construida la URL,llamamos a la URL y guardamos el resultado en una variable y la devolvemos (return).
    será otra función la que se encargue de dibujar en pantalla (es decir, de hacer el DOM)
    */
}

async function createResultsTable(recogeReturnFngetFilmsFromApi) {
    /*
    encargado David.




    */
}

async function getSingleFilm(imdbID) {
<<<<<<< Updated upstream
=======
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
        return film;
    } catch(e) {
        console.log(e);
        alert('Error llamando a la API.');
        return null;
    }
>>>>>>> Stashed changes
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

    //    resultadosBusqueda.innerHTML = filmData.Title ;    
    //  resultadosBusqueda.innerHTML = filmData.Year;
    //resultadosBusqueda.innerHTML = filmData.Rated;

    //Titulo

    // const title = filmData.Title;
    // console.log(title);
    const tituloElem = document.createElement("h2");
    tituloElem.innerHTML = filmData.Title.toUpperCase();
    movieDetailsContainer.appendChild(tituloElem);
    
    //Año
    //const year = filmData.Year;
    // console.log(year);
    const yearElem = document.createElement("h3");
    const textY = document.createTextNode("Year: ");
    yearElem.appendChild(textY);
    yearElem.innerHTML += filmData.Year;
    movieDetailsContainer.appendChild(yearElem);
    
    //Imagen
    const imagenElem = document.createElement("img");
    imagenElem.src = filmData.Poster;
    movieDetailsContainer.appendChild(imagenElem);

    //Ratings
    const ratings = filmData.Ratings;   //Asigno una variable a la info de la pagina
    const textRatings = document.createTextNode("Ratings: "); 
    const ratingElem = document.createElement("p");  //Creo elemento para el texto q traje
    
    ratingElem.appendChild(textRatings);
    
    for(let i = 0; i < ratings.length; i++)
    {
        const RatingObj = ratings[i];
        ratingElem.innerHTML += `<br> ${RatingObj.Source}: ${RatingObj.Value} `;
        movieDetailsContainer.appendChild(ratingElem).style.color="red"; 
    }
   

    //Genre
    const generElem = document.createElement("h5");
    const textGen = document.createTextNode("Genre: ");
    generElem.appendChild(textGen);
    generElem.innerHTML += filmData.Genre;
    movieDetailsContainer.appendChild(generElem);
    
    //Director

    const direElem = document.createElement("h5");
    const textDir = document.createTextNode("Director: ");
    direElem.appendChild(textDir);
    direElem.innerHTML += filmData.Director;
    movieDetailsContainer.appendChild(direElem);
     
    //Writer
     
    const writerElem = document.createElement("h5");
    const textW = document.createTextNode("Writer: ");
    writerElem.appendChild(textW);
    writerElem.innerHTML += filmData.Writer;
    movieDetailsContainer.appendChild(writerElem);
     
    //Actores
     
    const actorsElem = document.createElement("h5");
    const textAct = document.createTextNode("Actors: ")
    actorsElem.appendChild(textAct);
    actorsElem.innerHTML += filmData.Actors;
    movieDetailsContainer.appendChild(actorsElem);
     
     //Plot
     
     const plotElem = document.createElement("p");
     const textPlot = document.createTextNode("Plot: ");
     plotElem.appendChild(textPlot);
     plotElem.innerHTML += filmData.Plot;
     movieDetailsContainer.appendChild(plotElem);

    //Premios

    const awardsElem = document.createElement("p");
    const textAward = document.createTextNode("Awards: ")
    awardsElem.appendChild(textAward);
    awardsElem.innerHTML += filmData.Awards;
    movieDetailsContainer.appendChild(awardsElem);    
        
    //Boxoffice

    const boxOffice = document.createElement("p");
    const textBox = document.createTextNode("BoxOffice: ")
    boxOffice.appendChild(textBox);
    boxOffice.innerHTML += filmData.BoxOffice;
    movieDetailsContainer.appendChild(boxOffice);

    //Pais

    const paisElem = document.createElement("p");
    const textC = document.createTextNode("Country: ")
    paisElem.appendChild(textC);
    paisElem.innerHTML += filmData.Country;
    movieDetailsContainer.appendChild(paisElem);

    //Idioma

    const languaElem = document.createElement("p");
    const textLangua = document.createTextNode("Language: ");
    languaElem.appendChild(textLangua);
    languaElem.innerHTML += filmData.Language;
    movieDetailsContainer.appendChild(languaElem);

    //Runtime
    const runElem = document.createElement("p");
    const textRunE = document.createTextNode("Runtime: ")
    runElem.appendChild(textRunE);
    runElem.innerHTML += filmData.Runtime;
    movieDetailsContainer.appendChild(runElem);

    //Type

    const typElem = document.createElement("p");
    const textoTyp = document.createTextNode("Type: ")
    typElem.appendChild(textoTyp);
    typElem.innerHTML += filmData.Type;
    movieDetailsContainer.appendChild(typElem);


    //IMDB Rating

    const imdbRatElem = document.createElement("p");
    const textImdbR = document.createTextNode("IMDB Rating: ")
    imdbRatElem.appendChild(textImdbR);
    imdbRatElem.innerHTML += filmData.imdbRating;
    movieDetailsContainer.appendChild(imdbRatElem);

    //imdbVotes

    const imdbVotElem = document.createElement("p");
    const textV = document.createTextNode("IMDB Votes: ");
    imdbVotElem.appendChild(textV);
    imdbVotElem.innerHTML += filmData.imdbVotes;
    movieDetailsContainer.appendChild(imdbVotElem);
        
}
