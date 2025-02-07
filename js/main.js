"use strict";

/* Búsqueda de la serie en el servidor
Cuando la usuaria haga click en buscar:
    Se recoge el dato del casillero
    Se construye la url
    Se hace la petición al servidor
    Por cada serie contenida en el resultado
        Pinto la serie en la página

1- Selecciono los elementos HTML (input de búsqueda,botón de buscar y sección para pintar las series seleccionadas)
2- Escucho el click del botón
3- Recojo el valor del input
4- Petición al servidor con la nueva url
5- Por cada serie contenida en el resultado de la url
    Pinto la serie en el html

*/


const inputText = document.querySelector(".js-input");
const buttonSearch = document.querySelector(".js-button");
const contentSearch = document.querySelector(".js-content");
const favouritesSection = document.querySelector(".js-favourites-content");
const buttonLog = document.querySelector(".js-log-button");
let seriesList = [];
let favouritesSeriesList = [];

function handleButton(ev) {
    ev.preventDefault();
    const inputSearch = inputText.value;
    fetch(`https://api.jikan.moe/v4/anime?q=${inputSearch}`)
        .then((response) => response.json())
        .then(info => {

            seriesList = info.data;
            for (const serie of seriesList) {
                contentSearch.innerHTML += `<div class="js-series-DOM" id=${serie.mal_id}><h3>${serie.title}</h3><img class="image-1 js-images " src="${serie.images.jpg.small_image_url}" alt="Portada de la serie"><p>${serie.type}</p></div>`;


            }
            const allSeriesDOM = document.querySelectorAll(".js-series-DOM");
            for (const serieDOM of allSeriesDOM) {
                serieDOM.addEventListener("click", handleAddFavourite);
            }
            const allImages = document.querySelectorAll(".js-images");
            for (const image of allImages) {
                if (image.src.includes("https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png")) {
                    image.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQppJKxBxJI-9UWLe2VVmzuBd24zsq4_ihxZw&s"
                }
            }
        }
        )
}

function handleAddFavourite(event) {

    const idSerieClicked = event.currentTarget.id;
    const serieSelected = seriesList.find((favourite) => {
        return favourite.mal_id === parseInt(idSerieClicked);
    })
    favouritesSeriesList.push(serieSelected);
    favouritesSection.innerHTML = "";
    for (const favSerie of favouritesSeriesList) {
        favouritesSection.innerHTML += `<div><h3>${favSerie.title}</h3><img class="image-1 js-images " src="${favSerie.images.jpg.small_image_url}" alt="Portada de la serie">
        </div>
     `
    }
}
function handleButtonLog() {
    for (const favSerie of favouritesSeriesList) {
        console.log(favSerie.title);
    }


}

buttonLog.addEventListener("click", handleButtonLog);

/*Guardar series favoritas
- Guardar series favoritas en localStorage
- Si cuando recargo la página, tengo una lista de favoritas en localStorage
    la muestro

*/
localStorage.setItem("favouritesList", JSON.stringify(favouritesSeriesList));
const favouritesStorage = JSON.parse(localStorage.getItem("favouritesList"));
if (favouritesSeriesList !== null) {
    favouritesStorage === favouritesSeriesList;

}

buttonSearch.addEventListener("click", handleButton);

