export class Obra {
    constructor(datos) {
        this.id = datos.id;
        this.name = datos.name;
        this.artist = datos.artist;
        this.image = datos.image;
        this.animation_url = datos.animation_url;
    }

    obtenerDescripcion() {
        return `${this.name} - ${this.artist}`;
    }
}