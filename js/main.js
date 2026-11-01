import { obtenerObras } from "./api.js";
import { mostrarObra } from "./obras.js";

let pagina = 1;
const cantidad = 12;

function calcularOffset(pagina, cantidad) {
    return (pagina - 1) * cantidad;
}

async function cargarPagina(pagina, cantidad) {
    const offset = calcularOffset(pagina, cantidad);
    const resultado = await obtenerObras(cantidad, offset);
    const obras = resultado.obras;

    console.log("Total de obras:", resultado.total);

    const galeria = document.getElementById("galeria");
    galeria.innerHTML = "";

    obras.forEach(function (obra) {
        mostrarObra(obra);
    });
    botonAnterior.disabled = pagina === 1;
    const totalPaginas = Math.ceil(resultado.total / cantidad);
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

cargarPagina(pagina, cantidad);