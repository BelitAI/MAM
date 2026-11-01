export async function obtenerObra() {

    const url = "https://token.artblocks.io/1/0x99a9b7c1116f9ceeb1652de04d5969cce509b069/385000000";

    try {

        const respuesta = await fetch(url);

        if (!respuesta.ok) {
            throw new Error("No se pudo obtener la obra");
        }

        const obra = await respuesta.json();

        console.log("Título:", obra.name);
        console.log("Artista:", obra.artist);
        console.log("Imagen:", obra.image);
        console.log("Obra generativa:", obra.animation_url);

        return obra;

    } catch (error) {

        console.error(error);

    }

}