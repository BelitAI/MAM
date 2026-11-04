import { Obra } from "../clases/Obra.js";
import { Coleccion } from "../clases/Coleccion.js";

//Recupero los datos guardados y reconstruyo los objetos Obra.
export function getFavoritesFromLocalStorage() {
    const favoritosGuardados = localStorage.getItem("favoritosMAM") || "[]";
    const datos = JSON.parse(favoritosGuardados);

    const favoritos = datos.map(function (dato) {
        return new Obra(dato);
    });

    return favoritos;
}

// Guardo los favoritos en el navegador.
function saveFavoritesToLocalStorage(favoritos) {
    localStorage.setItem("favoritosMAM", JSON.stringify(favoritos));
}

// Compruebo si una obra pertenece a la colección de favoritos.
export function isInFavorites(obra) {
    const coleccion = new Coleccion();

    coleccion.obras = getFavoritesFromLocalStorage();

    return coleccion.contieneObra(obra);
}

// Añado o elimino la obra utilizando la colección.
export function toggleFavorite(obra) {
    const coleccion = new Coleccion();

    coleccion.obras = getFavoritesFromLocalStorage();

    let esFavorito = false;

    if (coleccion.contieneObra(obra)) {
        coleccion.quitarObra(obra);
    } else {
        coleccion.agregarObra(obra);
        esFavorito = true;
    }

    saveFavoritesToLocalStorage(coleccion.obras);

    return esFavorito;
}