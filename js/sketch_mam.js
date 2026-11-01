// Creo una instancia de p5.js para no interferir con main.js.
const sketchMAM = (p) => {

    /* Creo un array con palabras relacionadas
    con el concepto del museo.

    Estas palabras servirán para construir
    el interior de las letras MAM. */

    const palabras = [
        "ARTE",
        "CÓDIGO",
        "MUTACIÓN",
        "ALGORITMO",
        "CREACIÓN",
        "MOVIMIENTO",
        "AZAR",
        "TRANSFORMACIÓN",
        "GENERATIVO",
        "EXPERIMENTAL",
        "DIGITAL",
        "INTERACCIÓN"
    ];

    /*
    Declaro tres variables que utilizaré
    para construir las letras MAM.
*/

    let layer;
    let patternG;
    let maskG;

    // SETUP: se ejecuta una sola vez al iniciar el sketch.
    p.setup = function () {

        // Busco el contenedor que he creado en index.html.
        const contenedor = document.getElementById("arte-generativo");

        // Obtengo su ancho disponible.
        const ancho = contenedor.clientWidth;

        // Creo el canvas y lo guardo en una constante.
        const canvas = p.createCanvas(ancho, 300);

        // Introduzco el canvas dentro del contenedor HTML.
        canvas.parent("arte-generativo");

        /* Todas las capas graficas tendrán el mismo tamaño
    que el canvas principal.*/

        layer = p.createGraphics(p.width, p.height);

        patternG = p.createGraphics(p.width, p.height);

        maskG = p.createGraphics(p.width, p.height);

        // Mantengo la misma densidad de píxeles.
        layer.pixelDensity(1);
        patternG.pixelDensity(1);
        maskG.pixelDensity(1);

        // Genero el patrón de palabras por primera vez.
        crearPatron();

        // Creo la máscara con la silueta de las letras MAM.
        crearMascara();

        // Combino las palabras con las letras MAM.
        aplicarMascara();

    };

    /* Recupero la técnica de mi sketch de la UOC.
    La máscara permite que las palabras solamente
    sean visibles dentro de las letras MAM. */

    function aplicarMascara() {

        // Creo una copia del patrón de palabras.
        const imagen = patternG.get();

        // Aplico la máscara con la silueta de MAM.
        imagen.mask(maskG.get());

        // Limpio la capa donde guardaré el resultado.
        layer.clear();

        // Dibujo la imagen recortada en la capa final.
        layer.image(imagen, 0, 0);

    }

    /*   Esta función rellena una capa gráfica
    con las palabras del array.*/

    function crearPatron() {

        // Limpio la capa antes de dibujar.
        patternG.clear();

        // Establezco el color amarillo de MAM.
        patternG.fill(232, 255, 0);

        // Elimino los bordes del texto.
        patternG.noStroke();

        // Alineo las palabras desde la esquina superior izquierda.
        patternG.textAlign(p.LEFT, p.TOP);

        // Establezco el tamaño del texto.
        const tamanoTexto = 10;
        patternG.textSize(tamanoTexto);

        // Calculo la separación entre líneas.
        const altoLinea = tamanoTexto * 1.5;

        // Creo un contador para recorrer el array.
        let contador = 0;

        // Recorro verticalmente toda la capa.
        for (let y = 0; y < p.height; y += altoLinea) {

            // Empiezo cada línea desde la izquierda.
            let x = 0;

            // Relleno cada línea con palabras.
            while (x < p.width) {

                // Selecciono una palabra del array.
                const palabra = palabras[contador % palabras.length];

                // Dibujo la palabra en la posición actual.
                patternG.text(palabra, x, y);

                // Calculo cuánto espacio ocupa la palabra.
                const anchoPalabra = patternG.textWidth(palabra + " ");

                // Avanzo horizontalmente.
                x += anchoPalabra;

                // Paso a la siguiente palabra.
                contador++;

            }
        }
    }

    /* Esta máscara permitirá mostrar las palabras
    únicamente dentro de la silueta de MAM. */

    function crearMascara() {

        // Limpio la capa antes de dibujar.
        maskG.clear();

        // Establezco el color blanco para la máscara.
        maskG.fill(255);

        // Elimino los bordes.
        maskG.noStroke();

        // Centro el texto.
        maskG.textAlign(p.CENTER, p.CENTER);

        // Utilizo una tipografía gruesa para definir mejor las letras.
        maskG.textStyle(p.BOLD);

        // Calculo un tamaño adaptable al ancho del canvas.
        const tamanoLetras = Math.min(p.width * 0.27, 250);

        maskG.textSize(tamanoLetras);

        // Dibujo las letras MAM en la máscara.
        maskG.text("MAM", p.width / 2, p.height / 2);

    }

    // DRAW: muestra la composición generativa.

    p.draw = function () {

        // Pinto el fondo negro del museo.
        p.background(8, 8, 8);

        // Muestro las letras MAM construidas con palabras.
        p.image(layer, 0, 0);

    };

};

// Inicio el sketch dentro de p5.js.
new p5(sketchMAM);