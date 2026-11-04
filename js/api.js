/* Al principio intenté utilizar la API de Art Blocks siguiendo la estructura del proyecto Pokémon. 
Conseguí obtener obras, pero tenía que introducir sus identificadores manualmente. 
Esto limitaba bastante el museo, porque quería que se pudieran explorar muchas obras, buscar por artista 
y navegar entre los resultados. Por eso decidí utilizar la API GraphQL de Art Blocks. 
Como no conocía GraphQL, me apoyé en la IA para construir la consulta y conseguir las funcionalidades que necesitaba.

const API_URL = "https://token.artblocks.io/1/0x99a9b7c1116f9ceeb1652de04d5969cce509b069/";

// Identificadores de las obras que quiero mostrar en MAM.
const idsObras = [
    385000000,
    391000000
];

// Obtengo una obra de Art Blocks utilizando su identificador.
async function getObra(tokenId) {
    try {
        const url = new URL(API_URL + tokenId);
        const urlString = url.toString();

        const response = await fetch(urlString);

        if (!response.ok) {
            throw new Error("No se pudo conectar con Art Blocks");
        }

        const result = await response.json();
        return result;

    } catch (error) {
        console.error(error);
        return null;
    }
}

// Preparo los datos que necesito para mostrar cada obra.
function getCleanObra(dato) {
    return {
        id: dato.tokenID,
        name: dato.name,
        artist: dato.artist,
        image: dato.image,
        animation_url: dato.animation_url
    };
}

// Obtengo las obras para mostrarlas en la galería.
export async function obtenerObras(limit = 12, offset = 0, artista = "") {

    const resultados = await Promise.all(idsObras.map(getObra));

    const obras = resultados
        .filter(dato => dato !== null)
        .map(getCleanObra);

    const obrasFiltradas = obras.filter(obra =>
        obra.artist.toLowerCase().includes(artista.toLowerCase())
    );

    return {
        obras: obrasFiltradas.slice(offset, offset + limit),
        total: obrasFiltradas.length
    };
}

*/

import { Obra } from "../clases/Obra.js";
export async function obtenerObras(limit = 12, offset = 0, artista = "") {
    const filtroArtista = JSON.stringify("%" + artista + "%");
    const API_URL = "https://data.artblocks.io/v1/graphql";

    const consulta = `{ 
        tokens_metadata(
            where: {
                chain_id: {_eq: 1}
                project: {
    is_artblocks: {_eq: true}
    artist_name: {_ilike: ${filtroArtista}}
}
                media_url: {_is_null: false}
                live_view_url: {_is_null: false}
            }
            limit: ${limit}
            offset: ${offset}
            order_by: [{invocation: asc}, {id: asc}]
        ) {
            id
            media_url
            live_view_url
            invocation
            project {
                name
                artist_name
            }
        }

        tokens_metadata_aggregate(
            where: {
                chain_id: {_eq: 1}
                project: {
    is_artblocks: {_eq: true}
    artist_name: {_ilike: ${filtroArtista}}
}
                media_url: {_is_null: false}
                live_view_url: {_is_null: false}
            }
                ) @include(if: ${offset === 0}) {
            aggregate {
                count
            }
        }
    }`;

    const respuesta = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ query: consulta })
    });

    if (!respuesta.ok) {
        throw new Error("No se pudieron obtener las obras");
    }

    const resultado = await respuesta.json();

    if (resultado.errors) {
        throw new Error(resultado.errors[0].message);
    }

    const obras = resultado.data.tokens_metadata.map(function (dato) {
        return new Obra({
            id: dato.id,
            name: `${dato.project.name} #${dato.invocation}`,
            artist: dato.project.artist_name,
            image: dato.media_url,
            animation_url: dato.live_view_url
        });
    });

    return {
        obras: obras,
        total: offset === 0
            ? resultado.data.tokens_metadata_aggregate.aggregate.count
            : null
    };
}