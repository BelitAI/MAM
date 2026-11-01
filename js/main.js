import { obtenerObra } from "./api.js";
import { mostrarObra } from "./obras.js";

async function init() {
    const obra = await obtenerObra();
    mostrarObra(obra);
}

init();