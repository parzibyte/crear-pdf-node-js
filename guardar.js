/**
 * https://parzibyte.me/blog
 */
const pdf = require("html-pdf");
const fs = require("fs");
const ubicacionPlantilla = require.resolve("./plantilla.html");
let contenidoHtml = fs.readFileSync(ubicacionPlantilla, 'utf8')
const valorPasadoPorNode = "Soy un valor pasado desde JavaScript";
contenidoHtml = contenidoHtml.replace("{{valor}}", valorPasadoPorNode);
pdf.create(contenidoHtml).toFile("salida.pdf", (error) => {
    if (error) {
        console.log("Error creando PDF: " + error)
    } else {
        console.log("PDF creado correctamente");
    }
});