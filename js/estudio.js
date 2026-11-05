function setup() {
    const lienzo = createCanvas(1350, 650);
    lienzo.parent("lienzo-estudio");
    background(30);
    let colorCirculo = color(232, 255, 0);

    const botonAgregar = document.getElementById("agregar-circulo");

    botonAgregar.addEventListener("click", function () {
        fill(colorCirculo);
        noStroke();
        circle(random(width), random(height), 60);
    });

    const botonCuadrado = document.getElementById("agregar-cuadrado");

    botonCuadrado.addEventListener("click", function () {
        fill(colorCirculo);
        noStroke();
        square(random(width - 60), random(height - 60), 60);
    });

    const botonLimpiar = document.getElementById("limpiar");

    botonLimpiar.addEventListener("click", function () {
        background(30);
    });

    const botonColores = document.getElementById("cambiar-colores");

    botonColores.addEventListener("click", function () {
        colorCirculo = color(random(255), random(255), random(255));
    });
}