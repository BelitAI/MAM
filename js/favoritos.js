import { getFavoritesFromLocalStorage } from "./localStorage.js";
import { mostrarObra } from "./obras.js";

function cargarFavoritos() {
    const obras = getFavoritesFromLocalStorage();

    const galeria = document.getElementById("galeria");
    galeria.replaceChildren();

    obras.forEach(function (obra) {
        const tarjeta = mostrarObra(obra, function (obra, esFavorito) {
            if (!esFavorito) {
                tarjeta.remove();
            }
        });
    });
}

cargarFavoritos();