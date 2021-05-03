/**
 * Tomado de https://parzibyte.me/blog/2019/05/27/node-js-express-ejemplo-creacion-proyecto/
 * By Parzibyte
 */
// Importar dependencias
const express = require("express"),
    app = express(),
    pdf = require("html-pdf"),
    fs = require("fs");

// Constantes propias del programa
const ubicacionPlantilla = require.resolve("./plantilla.html"),
    puerto = 3000;
let contenidoHtml = fs.readFileSync(ubicacionPlantilla, 'utf8');
// Definir rutas
app.get('/', (peticion, respuesta) => {
    // Podemos acceder a la petición HTTP
    const valorPasadoPorNode = "Soy un valor pasado desde JavaScript";
    contenidoHtml = contenidoHtml.replace("{{valor}}", valorPasadoPorNode);
    pdf.create(contenidoHtml).toStream((error, stream) => {
        if (error) {
            respuesta.end("Error creando PDF: " + error)
        } else {
            respuesta.setHeader("Content-Type", "application/pdf");
            stream.pipe(respuesta);
        }
    });
});

// Una vez definidas nuestras rutas podemos iniciar el servidor
app.listen(puerto, err => {
    if (err) {
        // Aquí manejar el error
        console.error("Error escuchando: ", err);
        return;
    }
    // Si no se detuvo arriba con el return, entonces todo va bien ;)
    console.log(`Escuchando en el puerto :${puerto}`);
});