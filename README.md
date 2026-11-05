# MAM — Museo de Arte Mutable

Proyecto individual de JavaScript del bootcamp Full Stack con IA.

## Descripción

MAM es un museo de arte generativo donde se pueden explorar obras
de Art Blocks, buscar por artista o colección y guardar favoritas.

La portada incluye unas letras MAM animadas con p5.js y una obra
generativa de Art Blocks. También he añadido un estudio creativo
para crear composiciones sencillas con círculos, cuadrados y colores.

## Tecnologías utilizadas

- HTML.
- CSS.
- JavaScript.
- p5.js.
- API GraphQL de Art Blocks.
- localStorage para guardar los favoritos.
- Git y GitHub para el control de versiones.

## Qué se puede hacer

- Consultar obras con su imagen, título y artista.
- Buscar por artista y colección, juntos o por separado.
- Recorrer los resultados de 12 en 12, hasta un máximo de 30 páginas.
- Ver el número de página actual y el total disponible dentro del límite.
- Abrir las obras generativas en otra pestaña.
- Guardar y quitar favoritos pulsando el corazón.
- Consultar los favoritos en Mi colección.
- Crear composiciones en el estudio creativo.

Mientras se consulta la API aparece una animación de carga.
Si la consulta falla, se muestra un mensaje de error.

## Cómo abrir el proyecto

1. Descarga o clona el repositorio.
2. Abre la carpeta MAM en Visual Studio Code.
3. Instala la extensión Live Server si no la tienes.
4. Haz clic derecho sobre `index.html` y selecciona
   «Open with Live Server».

Se necesita conexión a internet para consultar Art Blocks,
cargar las imágenes y utilizar p5.js.

## Cómo utilizarlo

### Explorar

Escribe el nombre de un artista o de una colección y pulsa Buscar.
Puedes combinar ambos campos. Para volver a los resultados
sin filtros, vacía los dos campos y pulsa Buscar.

Utiliza Anterior y Siguiente para cambiar de página.

### Mi colección

Pulsa el corazón de una obra para guardarla o quitarla.
En Mi colección aparecen las obras guardadas.

Los favoritos se conservan en ese navegador mediante localStorage.
No se comparten entre dispositivos.

### Estudio creativo

Pulsa Añadir círculo o Añadir cuadrado para colocar figuras
en posiciones aleatorias.

Cambiar colores elige un color para las próximas figuras.
Las anteriores conservan su color. Limpiar borra la composición.

La composición no se guarda y se pierde al recargar la página.

## Organización del proyecto

- `index.html`: portada.
- `explorar.html`: buscador y catálogo.
- `favorites.html`: obras favoritas.
- `estudio.html`: estudio creativo.
- `css/`: estilos generales, portada, galería y animación de carga.
- `js/`: consultas, eventos, tarjetas, favoritos y composiciones de p5.js.
- `clases/Obra.js`: representa una obra y permite obtener su descripción.
- `clases/Coleccion.js`: contiene obras y permite añadirlas,
  eliminarlas y comprobar si están guardadas.
- `assets/img/`: imágenes, logo e iconos.

Coleccion utiliza composición porque contiene objetos Obra.

## Limitaciones y mejoras pendientes

- La consulta inicial y algunas búsquedas pueden tardar.
- Las obras se vuelven a consultar al cambiar de página;
  no se ha añadido caché.
- La adaptación de las obras externas a móvil depende
  del código de cada obra.
- Quedan ajustes de diseño y adaptación a móvil,
  especialmente en el estudio creativo.

## Referencias y ayuda

He tomado como referencia el proyecto Pokémon trabajado en clase
para organizar la consulta de datos, la paginación y los favoritos.

Para la portada he recuperado técnicas de mis trabajos anteriores
con p5.js. También he utilizado ayuda de IA para resolver dudas,
adaptar la consulta GraphQL y revisar partes del código.