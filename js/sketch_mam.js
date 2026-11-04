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

    p.setup = function () {

        const contenedor = document.getElementById("arte-generativo");
        const ancho = contenedor.clientWidth;

        // Creo el canvas y lo guardo en una constante.
        const canvas = p.createCanvas(ancho, 300);

        canvas.parent("arte-generativo");

        layer = p.createGraphics(p.width, p.height);

        patternG = p.createGraphics(p.width, p.height);

        maskG = p.createGraphics(p.width, p.height);
        layer.pixelDensity(1);
        patternG.pixelDensity(1);
        maskG.pixelDensity(1);

        crearPatron();
        crearMascara();
        aplicarMascara();

    };

    /* Recupero la técnica de mi sketch de la UOC.
    La máscara permite que las palabras solamente
    sean visibles dentro de las letras MAM. */

    function aplicarMascara() {
        const imagen = patternG.get();
        imagen.mask(maskG.get());
        layer.clear();
        layer.image(imagen, 0, 0);

    }
    function crearPatron() {

        patternG.clear();

        patternG.fill(232, 255, 0);

        patternG.noStroke();

        patternG.textAlign(p.LEFT, p.TOP);

        const tamanoTexto = 10;
        patternG.textSize(tamanoTexto);

        const altoLinea = tamanoTexto * 1.5;

        let contador = 0;

        for (let y = 0; y < p.height; y += altoLinea) {

            let x = 0;

            while (x < p.width) {

                const palabra = palabras[contador % palabras.length];

                patternG.text(palabra, x, y);

                const anchoPalabra = patternG.textWidth(palabra + " ");
                x += anchoPalabra;

                contador++;

            }
        }
    }

    /* Esta máscara permitirá mostrar las palabras
    únicamente dentro de la silueta de MAM. */

    function crearMascara() {

        maskG.clear();
        maskG.fill(255);
        maskG.noStroke();
        maskG.textAlign(p.LEFT, p.CENTER);
        maskG.textStyle(p.BOLD);
        const tamanoLetras = 250;

        maskG.textSize(tamanoLetras);

        // Calculo el ancho de las letras y las ajusto al espacio disponible.
        const anchoTexto = maskG.textWidth("MAM");

        if (anchoTexto > p.width) {
            maskG.textSize(tamanoLetras * (p.width / anchoTexto));
        }

        maskG.text("MAM", 0, p.height / 2);

    }

    p.draw = function () {
        p.clear();
        // Divido la imagen en franjas para simular una ondulación.
        const anchoFranja = 4;

        // El ratón controla la intensidad del movimiento.
        const intensidad = p.map(p.mouseX, 0, p.width, 2, 15, true);

        for (let x = 0; x < p.width; x += anchoFranja) {

            const desplazamiento = p.sin(p.frameCount * 0.04 + x * 0.02) * intensidad;

            const ancho = Math.min(anchoFranja, p.width - x);

            p.image(
                layer,
                x, desplazamiento,
                ancho, p.height,
                x, 0,
                ancho, p.height
            );
        }
    };
};
// Inicio el sketch dentro de p5.js.
new p5(sketchMAM);