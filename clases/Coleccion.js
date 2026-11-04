// Colección que contiene obras y evita guardarlas repetidas.
export class Coleccion {
    // Creo una colección inicialmente vacía.
    constructor() {
        this.obras = [];
    }
    // Añado la obra solo si no existe otra con el mismo identificador.
    agregarObra(obra) {
        const existe = this.obras.find(function (favorita) {
            return favorita.id === obra.id;
        });

        if (!existe) {
            this.obras.push(obra);
        }
    }
    // Busco la posición de la obra y la elimino si está guardada.
    quitarObra(obra) {
        const indice = this.obras.findIndex(function (favorita) {
            return favorita.id === obra.id;
        });

        if (indice !== -1) {
            this.obras.splice(indice, 1);
        }
    }
    // Devuelvo true si la obra pertenece a la colección y false si no.
    contieneObra(obra) {
        const encontrada = this.obras.find(function (favorita) {
            return favorita.id === obra.id;
        });

        return encontrada !== undefined;
    }
}