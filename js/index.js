const resultadosBusqueda = document.getElementById('resultadosBusqueda');
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

