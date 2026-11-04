// Recupero las obras que tengo guardadas en favoritos.
export function getFavoritesFromLocalStorage() {
    const favoritosGuardados = localStorage.getItem("favoritosMAM") || "[]";
    const favoritos = JSON.parse(favoritosGuardados);

    return favoritos;
}

// Guardo los favoritos en el navegador.
function saveFavoritesToLocalStorage(favoritos) {
    localStorage.setItem("favoritosMAM", JSON.stringify(favoritos));
}

// Compruebo si una obra ya está en favoritos.
export function isInFavorites(obra) {
    const favoritos = getFavoritesFromLocalStorage();

    const encontrada = favoritos.find(function (favorito) {
        return favorito.id === obra.id;
    });

    return encontrada !== undefined;
}

// Añado o elimino una obra de favoritos.
export function toggleFavorite(obra) {
    const favoritos = getFavoritesFromLocalStorage();

    const indice = favoritos.findIndex(function (favorito) {
        return favorito.id === obra.id;
    });

    let esFavorito = false;

    if (indice === -1) {
        favoritos.push(obra);
        esFavorito = true;
    } else {
        favoritos.splice(indice, 1);
    }

    saveFavoritesToLocalStorage(favoritos);

    return esFavorito;
}