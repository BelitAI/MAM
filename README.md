# MAM — Museo de Arte Mutable

Proyecto individual de JavaScript del bootcamp Full Stack con IA.

## Descripción

MAM es un museo de arte mutable en desarrollo que incorpora
un sketch de p5.js como parte de su identidad visual.

## Tecnologías previstas

- HTML
- CSS
- JavaScript
- p5.js

## Organización del proyecto

- `js/main.js`
- `js/api.js`
- `js/obras.js`
- `js/favoritos.js`
- `js/sketch_mam.js`
- `js/localStorage.js`
- `clases/Obra.js`
- `clases/Coleccion.js`
- `favorites.html`

## Estado

Proyecto en desarrollo.

### Funcionalidades implementadas

- Consulta de obras de Art Blocks mediante su API GraphQL.
- Creación dinámica de tarjetas con JavaScript y el DOM.
- Galería con paginación de 12 obras.
- Botones Anterior y Siguiente con control de los límites.
- Enlaces para abrir las obras generativas.
- Composición propia con p5.js en la portada.
- Búsqueda por artista, manteniendo la paginación de los resultados.
- Guardado y eliminación de obras favoritas mediante localStorage.
- Iconos que muestran si una obra está guardada al cargar la galería.
- Portada con una obra generativa de Art Blocks integrada.
- Letras MAM realizadas con p5.js, con ondulación e interacción con el ratón.
- Clase Obra para representar las piezas y obtener su descripción.
- Clase Coleccion para gestionar obras sin duplicados mediante composición.
- Reconstrucción de los objetos Obra al recuperar favoritos de localStorage.
- Página "Mi colección" para consultar las obras favoritas.
- Eliminación de favoritos con actualización inmediata de las tarjetas.

### Funcionalidades pendientes

- Búsqueda por colección.