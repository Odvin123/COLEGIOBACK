 const pdf = require('html-pdf');

    exports.generatePdf = (req, res) => {
        const formData = req.body;

        const getRadioValue = (name, data) => {
            return data[name] || '';
        };

        const htmlContent = `
            <!DOCTYPE html>
            <html>
            <head>
                <title>Ficha de Matrícula</title>
                <style>
                    body { font-family: Arial, sans-serif; margin: 20px; font-size: 10pt; }
                    h1, h2, h3 { text-align: center; color: #333; margin-bottom: 10px; }
                    h1 { font-size: 18pt; }
                    h2 { font-size: 14pt; }
                    h3 { font-size: 12pt; margin-top: 20px; border-bottom: 1px solid #ccc; padding-bottom: 5px; }
                    table { width: 100%; border-collapse: collapse; margin-top: 10px; }
                    th, td { border: 1px solid #ddd; padding: 6px; text-align: left; vertical-align: top; }
                    th { background-color: #f2f2f2; font-weight: bold; width: 35%; }
                    td { width: 65%; }
                    .text-center { text-align: center; }
                    .logo { max-width: 100px; display: block; margin: 0 auto 10px; }
                </style>
            </head>
            <body>
                <div class="text-center">
                    <h1>COLEGIO SOLDADO DE LA CRUZ</h1>
                    <h2>FICHA DE NUEVO INGRESO DE ESTUDIANTES 2025</h2>
                </div>

                <h3>I. DATOS PERSONALES DEL ESTUDIANTE DE NUEVO INGRESO</h3>
                <table>
                    <tr><th>Primer Nombre:</th><td>${formData.nombre || ''}</td></tr>
                    <tr><th>Segundo Nombre:</th><td>${formData.segundoNombre || ''}</td></tr>
                    <tr><th>Primer Apellido:</th><td>${formData.apellido1 || ''}</td></tr>
                    <tr><th>Segundo Apellido:</th><td>${formData.apellido2 || ''}</td></tr>
                    <tr><th>Teléfono:</th><td>${formData.telefono || ''}</td></tr>
                    <tr><th>Dirección:</th><td>${formData.direccion || ''}</td></tr>
                    <tr><th>Fecha de Nacimiento:</th><td>${formData.fechaNacimiento || ''}</td></tr>
                    <tr><th>Género:</th><td>${formData.genero || ''}</td></tr>
                    <tr><th>Peso (kg):</th><td>${formData.peso || ''}</td></tr>
                    <tr><th>Talla (cm):</th><td>${formData.talla || ''}</td></tr>
                    <tr><th>Nacionalidad:</th><td>${formData.nacionalidad || ''}</td></tr>
                    <tr><th>País de Nacimiento:</th><td>${formData.paisNacimiento || ''}</td></tr>
                    <tr><th>Departamento:</th><td>${formData.departamento || ''}</td></tr>
                    <tr><th>Municipio/Distrito:</th><td>${formData.municipio || ''}</td></tr>
                    <tr><th>Lengua Materna:</th><td>${formData.lenguaMaterna || ''}</td></tr>
                    <tr><th>Discapacidad:</th><td>${formData.discapacidad || ''}</td></tr>
                    <tr><th>Territorio Indígena:</th><td>${formData.territorioIndigena || 'N/A'}</td></tr>
                    <tr><th>Habita en Territorio Indígena:</th><td>${formData.habitaIndigena || 'N/A'}</td></tr>
                </table>

                <h3>II. DATOS PERSONALES DE LOS PADRES O TUTOR</h3>
                <table>
                    <tr><th>Nombres y Apellidos de la Madre:</th><td>${formData.nombreMadre || 'N/A'}</td></tr>
                    <tr><th>Cédula de la Madre:</th><td>${formData.cedulaMadre || 'N/A'}</td></tr>
                    <tr><th>Teléfono de la Madre:</th><td>${formData.telefonoMadre || 'N/A'}</td></tr>
                    <tr><th>Nombres y Apellidos del Padre:</th><td>${formData.nombrePadre || 'N/A'}</td></tr>
                    <tr><th>Cédula del Padre:</th><td>${formData.cedulaPadre || 'N/A'}</td></tr>
                    <tr><th>Teléfono del Padre:</th><td>${formData.telefonoPadre || 'N/A'}</td></tr>
                    <tr><th>Nombres y Apellidos del Tutor:</th><td>${formData.nombreTutor || 'N/A'}</td></tr>
                    <tr><th>Cédula del Tutor:</th><td>${formData.cedulaTutor || 'N/A'}</td></tr>
                    <tr><th>Teléfono del Tutor:</th><td>${formData.telefonoTutor || 'N/A'}</td></tr>
                </table>

                <h3>III. DATOS ACADÉMICOS DEL ESTUDIANTE</h3>
                <table>
                    <tr><th>Fecha de Matrícula:</th><td>${formData.fechaMatricula || ''}</td></tr>
                    <tr><th>Departamento de Proviene:</th><td>${formData.departamentoacad || ''}</td></tr>
                    <tr><th>Municipio/Distrito:</th><td>${formData.municipioAcad || ''}</td></tr>
                    <tr><th>Código Único del Establecimiento:</th><td>${formData.codigoUnico || ''}</td></tr>
                    <tr><th>Código del Centro Educativo:</th><td>${formData.codigoCentro || ''}</td></tr>
                    <tr><th>Nombre del Centro Educativo:</th><td>${formData.nombreCentro || ''}</td></tr>
                    <tr><th>Nivel Educativo:</th><td>${formData.nivelEducativo || ''}</td></tr>
                    <tr><th>Modalidad:</th><td>${formData.modalidad || ''}</td></tr>
                    <tr><th>Turno:</th><td>${getRadioValue('turno', formData)}</td></tr>
                    <tr><th>Nivel/Grado/Año/Ciclo/Grupo:</th><td>${formData.grado || ''}</td></tr>
                    <tr><th>Sección:</th><td>${formData.seccion || ''}</td></tr>
                    <tr><th>Es Repitente?:</th><td>${getRadioValue('repitente', formData)}</td></tr>
                </table>
            </body>
            </html>
        `;

        const options = {
            format: 'Letter',
            orientation: 'portrait',
            border: '15mm'
        };

        pdf.create(htmlContent, options).toBuffer((err, buffer) => {
            if (err) {
                console.error('Error al crear el PDF:', err.message);
                return res.status(500).send('Error al generar el PDF.');
            }

            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', `attachment; filename="ficha_matricula_${formData.nombre || 'desconocido'}_${formData.apellido1 || 'desconocido'}.pdf"`);
            res.send(buffer);
        });
    };
    