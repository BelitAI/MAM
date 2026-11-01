import { obtenerObras } from "./api.js";
import { mostrarObra } from "./obras.js";

async function init() {
    const obras = await obtenerObras();

    obras.forEach(function (obra) {
        mostrarObra(obra);
    });
}

init();