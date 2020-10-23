
let genero = "";
let anyo = "";
let url = "";
let resultado = "";
let urlR = "";
let movieId = "";



let genres = {
    28: "Action",
    12: "Adventure",
    16: "Animation",
    35: "Comedy",
    80: "Crime",
    99: "Documentary",
    18: "Drama",
    10751: "Family",
    14: "Fantasy",
    36: "History",
    27: "Horror",
    10402: "Music",
    9648: "Mystery",
    10749: "Romance",
    878: "Science Fiction",
    10770: "TV Movie",
    53: "Thriller",
    10752: "War",
    37: "Western",
};


function buscar() {
    genero = document.getElementById("select").value;
    anyo = document.getElementById("anyo").value;
    url = `https://api.themoviedb.org/3/discover/movie?api_key=0290be8e446a07e54be253a2214b0b3f&sort_by=popularity.desc&page=1&primary_release_year=${anyo}&with_genres=${genero}`
    fetch(url).then(function cogerRes(res) {
        return res.json();
    }).then(function cogerDatos(data) {
        if (!data.results) {
            document.getElementById("div1").innerHTML = "<p>Error en la búsqueda</p>"
        }
        for (let i = 0; i < data.results.length; i++) {
            let anyoEstreno = data.results[i].release_date.substring(0, 4);
            let generos = "";
            for (let j = 0; j < data.results[i].genre_ids.length; ++j) {
                let id = data.results[i].genre_ids[j];
                generos += `${genres[id]} `;
            }
            resultado += `
     <div id="${data.results[i].id}">

        <div id="container">
       
        <div>
           <img id="img" src="https://image.tmdb.org/t/p/w600_and_h900_bestv2${data.results[i].poster_path}"/>
        </div>
     
        <div id="divv">
                 <div id="divs">
                        <h4 id="text">Original title: <p id="titleMovie">${data.results[i].original_title}</p></h1>
                        <h4 id="text">Title: <p id="titleMovie">${data.results[i].title} </p></h4>
                        <h4 id="text">Genre: <p id="titleMovie"> ${generos}</p></h4>
                        <h4 id="text">Year of release: <p id="titleMovie">${anyoEstreno}</p></h4>
                </div>
            
        <div id="divs">
                <div id="divv">
                    <p id="text">Overview:<h4 id="titleMovie"> ${data.results[i].overview}</h4></p>
                 </div>
               <div id="divs">  <button onclick="guardar(${data.results[i].id})" id="btn"><img src="popcorn.png" /> Like </button></div>
         </div>
        
          

       </div>

    </div>
        
        <hr>
        `
        }
        document.getElementById("div1").innerHTML = resultado;
    })
};
let meGusta = [];
function guardar(id) {
    meGusta.push(document.getElementById(id).innerHTML)
    localStorage.setItem("favorita", JSON.stringify(meGusta))

}

