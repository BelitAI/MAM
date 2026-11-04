import { isInFavorites, toggleFavorite } from "./localStorage.js";

export function mostrarObra(obra) {

    const galeria = document.getElementById("galeria");

    const tarjeta = document.createElement("article");
    tarjeta.classList.add("tarjeta-obra");

    const imagen = document.createElement("img");
    imagen.src = obra.image;
    imagen.alt = obra.name;

    const titulo = document.createElement("h3");
    titulo.textContent = obra.name;

    const artista = document.createElement("p");
    artista.textContent = obra.artist;

    const enlace = document.createElement("a");
    enlace.href = obra.animation_url;
    enlace.textContent = "Ver obra generativa";
    enlace.target = "_blank";
    enlace.rel = "noopener noreferrer";

    // Abro la obra en una pestaña nueva para no perder la galería.

    // Creo el botón de favoritos con mis propios iconos.
    const botonFavorito = document.createElement("button");
    botonFavorito.classList.add("boton-favorito");
    botonFavorito.type = "button";

    const iconoFavorito = document.createElement("img");
    iconoFavorito.alt = "";

    // Compruebo si la obra ya está guardada.
    const esFavorito = isInFavorites(obra);

    if (esFavorito) {
        iconoFavorito.src = "./assets/img/Heart_favo.png";
        botonFavorito.setAttribute("aria-label", "Quitar de favoritos");
    } else {
        iconoFavorito.src = "./assets/img/Heart_nofavo.png";
        botonFavorito.setAttribute("aria-label", "Añadir a favoritos");
    }

    // Al hacer clic, guardo o elimino la obra.
    botonFavorito.addEventListener("click", function () {

        const esFavorito = toggleFavorite(obra);

        if (esFavorito) {
            iconoFavorito.src = "./assets/img/Heart_favo.png";
            botonFavorito.setAttribute("aria-label", "Quitar de favoritos");
        } else {
            iconoFavorito.src = "./assets/img/Heart_nofavo.png";
            botonFavorito.setAttribute("aria-label", "Añadir a favoritos");
        }

    });

    botonFavorito.appendChild(iconoFavorito);

    tarjeta.appendChild(imagen);
    tarjeta.appendChild(titulo);
    tarjeta.appendChild(artista);
    tarjeta.appendChild(enlace);
    tarjeta.appendChild(botonFavorito);

    galeria.appendChild(tarjeta);
}