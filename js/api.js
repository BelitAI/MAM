export async function obtenerObras(limit = 24, offset = 0) {
    const API_URL = "https://data.artblocks.io/v1/graphql";

    const consulta = `{
        tokens_metadata(
            where: {
                chain_id: {_eq: 1}
                project: {
                    is_artblocks: {_eq: true}
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
                }
                media_url: {_is_null: false}
                live_view_url: {_is_null: false}
            }
        ) {
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
        return {
            id: dato.id,
            name: `${dato.project.name} #${dato.invocation}`,
            artist: dato.project.artist_name,
            image: dato.media_url,
            animation_url: dato.live_view_url
        };
    });

    return {
        obras: obras,
        total: resultado.data.tokens_metadata_aggregate.aggregate.count
    };
}