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
    enlace.target = "_blank"; // Abro el enlace en una nueva pestaña para no perder la galería,
    //he preferido hacerlo así porque al salir se suele cerrar la pestaña y no se puede volver 
    //a la galería, así que de esta manera tenemos la galería disponible.

    tarjeta.appendChild(imagen);
    tarjeta.appendChild(titulo);
    tarjeta.appendChild(artista);
    tarjeta.appendChild(enlace);

    galeria.appendChild(tarjeta);

}