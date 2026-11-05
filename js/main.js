import { obtenerObras } from "./api.js";
import { mostrarObra } from "./obras.js";

let pagina = 1;
const cantidad = 12;
let totalObras = 0;
let artistaBuscado = "";
let coleccionBuscada = "";

function calcularOffset(pagina, cantidad) {
    return (pagina - 1) * cantidad;
}

async function cargarPagina(pagina, cantidad) {
    const cargando = document.getElementById("cargando");
    cargando.hidden = false;
    const paginacion = document.getElementById("paginacion");
    paginacion.hidden = true;
    const offset = calcularOffset(pagina, cantidad);

    let resultado;

    try {
        resultado = await obtenerObras(cantidad, offset, artistaBuscado, coleccionBuscada);
    } catch (error) {
        cargando.textContent = "No se pudieron cargar las obras. Inténtalo de nuevo.";
        console.error(error);
        return;
    }

    cargando.hidden = true;
    let obras = [];

    obras = resultado.obras;
    if (resultado.total !== null) {
        totalObras = resultado.total;
    }

    const totalPaginas = Math.min(30, Math.ceil(totalObras / cantidad));
    document.getElementById("numero-pagina").textContent =
        `Página ${pagina} de ${totalPaginas}`;

    const galeria = document.getElementById("galeria");
    galeria.innerHTML = "";


    console.log("1", obras.length);

    obras.forEach(function (obra) {
        mostrarObra(obra);
    });

    botonAnterior.disabled = pagina === 1;
    botonSiguiente.disabled = pagina >= totalPaginas;
    paginacion.hidden = obras.length === 0;
}

const botonSiguiente = document.getElementById("siguiente");
const botonAnterior = document.getElementById("anterior");

botonSiguiente.addEventListener("click", async function () {
    pagina++;
    await cargarPagina(pagina, cantidad);
    document.getElementById("explorar").scrollIntoView();
});

botonAnterior.addEventListener("click", async function () {
    if (pagina > 1) {
        pagina--;
        await cargarPagina(pagina, cantidad);
        document.getElementById("explorar").scrollIntoView();
    }
});

const formulario = document.getElementById("formulario-filtros");

formulario.addEventListener("submit", function (event) {
    event.preventDefault();

    const datos = new FormData(formulario);
    artistaBuscado = datos.get("artista").trim();
    coleccionBuscada = datos.get("coleccion").trim();
    pagina = 1;

    cargarPagina(pagina, cantidad);
});

cargarPagina(pagina, cantidad);