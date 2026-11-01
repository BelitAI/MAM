import { obtenerObras } from "./api.js";
import { mostrarObra } from "./obras.js";

let pagina = 1;
const cantidad = 12;
let totalObras = 0;
let artistaBuscado = "";

function calcularOffset(pagina, cantidad) {
    return (pagina - 1) * cantidad;
}

async function cargarPagina(pagina, cantidad) {
    const offset = calcularOffset(pagina, cantidad);
    const resultado = await obtenerObras(cantidad, offset, artistaBuscado);
    const obras = resultado.obras;
    if (resultado.total !== null) {
        totalObras = resultado.total;
    }

    const totalPaginas = Math.ceil(totalObras / cantidad);

    const galeria = document.getElementById("galeria");
    galeria.innerHTML = "";

    obras.forEach(function (obra) {
        mostrarObra(obra);
    });
    botonAnterior.disabled = pagina === 1;
    botonSiguiente.disabled = pagina >= totalPaginas;
}

const botonSiguiente = document.getElementById("siguiente");
const botonAnterior = document.getElementById("anterior");

botonSiguiente.addEventListener("click", function () {
    pagina++;
    cargarPagina(pagina, cantidad);
});

botonAnterior.addEventListener("click", function () {
    if (pagina > 1) {
        pagina--;
        cargarPagina(pagina, cantidad);
    }
});
const formulario = document.getElementById("formulario-filtros");

formulario.addEventListener("submit", function (event) {
    event.preventDefault();

    const datos = new FormData(formulario);
    artistaBuscado = datos.get("artista").trim();
    pagina = 1;

    cargarPagina(pagina, cantidad);
});

cargarPagina(pagina, cantidad);