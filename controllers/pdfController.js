
const chromium = require('@sparticuz/chromium');
const puppeteer = require('puppeteer-core');

exports.generatePdf = async (req, res) => {
    const formData = req.body;

    const htmlContent = `
        <!DOCTYPE html>
        <html lang="es">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Formulario de Matrícula</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    margin: 20px;
                    line-height: 1.6;
                    color: #333;
                }
                h1, h2, h3 {
                    color: #2c3e50;
                    text-align: center;
                    margin-bottom: 20px;
                }
                h3 {
                    border-bottom: 2px solid #3498db;
                    padding-bottom: 5px;
                    margin-top: 30px;
                    color: #3498db;
                }
                .section {
                    background-color: #f9f9f9;
                    border: 1px solid #ddd;
                    border-radius: 8px;
                    padding: 20px;
                    margin-bottom: 25px;
                    box-shadow: 0 2px 5px rgba(0,0,0,0.05);
                }
                label {
                    font-weight: bold;
                    color: #555;
                    display: inline-block;
                    width: 200px; /* Ancho fijo para las etiquetas */
                    vertical-align: top;
                }
                span {
                    display: inline-block;
                    vertical-align: top;
                    max-width: calc(100% - 210px); /* Resta el ancho de la etiqueta + margen */
                }
                div {
                    margin-bottom: 10px;
                    display: flex; /* Para alinear etiqueta y valor */
                    align-items: flex-start;
                }
                div.radio-group {
                    display: block;
                }
                div.radio-group label {
                    width: auto;
                    font-weight: normal;
                }
                /* Estilos para que las secciones se vean limpias */
                .section div:last-child {
                    margin-bottom: 0;
                }
            </style>
        </head>
        <body>
            <h2>Formulario de Matrícula</h2>

            <div class="section">
                <h3>DATOS PERSONALES DEL ESTUDIANTE</h3>
                <div><label>Primer Nombre:</label><span>${formData.nombre || 'N/A'}</span></div>
                <div><label>Segundo Nombre:</label><span>${formData.segundoNombre || 'N/A'}</span></div>
                <div><label>Primer Apellido:</label><span>${formData.apellido1 || 'N/A'}</span></div>
                <div><label>Segundo Apellido:</label><span>${formData.apellido2 || 'N/A'}</span></div>
                <div><label>Teléfono:</label><span>${formData.telefono || 'N/A'}</span></div>
                <div><label>Dirección:</label><span>${formData.direccion || 'N/A'}</span></div>
                <div><label>Fecha de Nacimiento:</label><span>${formData.fechaNacimiento || 'N/A'}</span></div>
                <div><label>Género:</label><span>${formData.genero || 'N/A'}</span></div>
                <div><label>Peso (kg):</label><span>${formData.peso || 'N/A'}</span></div>
                <div><label>Talla (cm):</label><span>${formData.talla || 'N/A'}</span></div>
                <div><label>Nacionalidad:</label><span>${formData.nacionalidad || 'N/A'}</span></div>
                <div><label>País de Nacimiento:</label><span>${formData.paisNacimiento || 'N/A'}</span></div>
                <div><label>Departamento:</label><span>${formData.departamento || 'N/A'}</span></div>
                <div><label>Municipio/Distrito:</label><span>${formData.municipio || 'N/A'}</span></div>
                <div><label>Lengua Materna:</label><span>${formData.lenguaMaterna || 'N/A'}</span></div>
                <div><label>Discapacidad:</label><span>${formData.discapacidad || 'N/A'}</span></div>
                <div><label>¿Pertenece a territorio indígena?:</label><span>${formData.territorioIndigena || 'N/A'}</span></div>
                <div><label>¿Habita en territorio indígena?:</label><span>${formData.habitaIndigena || 'N/A'}</span></div>
            </div>

            <div class="section">
                <h3>DATOS PERSONALES DE LOS PADRES O TUTOR</h3>
                <div><label>Nombre Madre:</label><span>${formData.nombreMadre || 'N/A'}</span></div>
                <div><label>Cédula Madre:</label><span>${formData.cedulaMadre || 'N/A'}</span></div>
                <div><label>Teléfono Madre:</label><span>${formData.telefonoMadre || 'N/A'}</span></div>
                <div><label>Nombre Padre:</label><span>${formData.nombrePadre || 'N/A'}</span></div>
                <div><label>Cédula Padre:</label><span>${formData.cedulaPadre || 'N/A'}</span></div>
                <div><label>Teléfono Padre:</label><span>${formData.telefonoPadre || 'N/A'}</span></div>
                <div><label>Nombre Tutor:</label><span>${formData.nombreTutor || 'N/A'}</span></div>
                <div><label>Cédula Tutor:</label><span>${formData.cedulaTutor || 'N/A'}</span></div>
                <div><label>Teléfono Tutor:</label><span>${formData.telefonoTutor || 'N/A'}</span></div>
            </div>

            <div class="section">
                <h3>DATOS ACADÉMICOS DEL ESTUDIANTE</h3>
                <div><label>Fecha de Matrícula:</label><span>${formData.fechaMatricula || 'N/A'}</span></div>
                <div><label>Departamento (Acad.):</label><span>${formData.departamentoacad || 'N/A'}</span></div>
                <div><label>Municipio/Distrito (Acad.):</label><span>${formData.municipioAcad || 'N/A'}</span></div>
                <div><label>Código Único Est.:</label><span>${formData.codigoUnico || 'N/A'}</span></div>
                <div><label>Código Centro Ed.:</label><span>${formData.codigoCentro || 'N/A'}</span></div>
                <div><label>Nombre Centro Ed.:</label><span>${formData.nombreCentro || 'N/A'}</span></div>
                <div><label>Nivel Educativo:</label><span>${formData.nivelEducativo || 'N/A'}</span></div>
                <div><label>Modalidad:</label><span>${formData.modalidad || 'N/A'}</span></div>
                <div><label>Turno:</label><span>${formData.turno || 'N/A'}</span></div>
                <div><label>Nivel/Grado/Año/Ciclo/Grupo:</label><span>${formData.grado || 'N/A'}</span></div>
                <div><label>Sección:</label><span>${formData.seccion || 'N/A'}</span></div>
                <div><label>¿Es repitente?:</label><span>${formData.repitente || 'N/A'}</span></div>
            </div>
        </body>
        </html>
    `;

    let browser = null;
    try {
        // Obtenemos la ruta ejecutable de Chromium proporcionada por @sparticuz/chromium
        const executablePath = await chromium.executablePath;

        // Validamos si la ruta es nula o indefinida antes de lanzar el navegador
        if (!executablePath) {
            throw new Error('Chromium executable path not found. This typically happens in serverless environments if @sparticuz/chromium fails to provide the path.');
        }

        browser = await puppeteer.launch({
            args: chromium.args,
            defaultViewport: chromium.defaultViewport,
            executablePath: executablePath, // Usamos la ruta obtenida
            headless: chromium.headless, // Importante: debe ser true para entornos serverless
        });

        const page = await browser.newPage();
        await page.setContent(htmlContent, {
            waitUntil: 'networkidle0'
        });

        const pdfBuffer = await page.pdf({
            format: 'Letter',
            printBackground: true,
            margin: {
                top: '20mm',
                right: '20mm',
                bottom: '20mm',
                left: '20mm'
            }
        });

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename=matricula_${formData.nombre || 'estudiante'}_${formData.apellido1 || ''}.pdf`);
        res.send(pdfBuffer);

    } catch (error) {
        console.error('❌ Error al generar el PDF con Puppeteer:', error);
        // Envía un mensaje de error detallado al frontend
        res.status(500).send(`Error al generar el PDF: ${error.message || 'Error desconocido'}`);
    } finally {
        if (browser !== null) {
            await browser.close();
        }
    }
};