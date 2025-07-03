const { PDFDocument, rgb, StandardFonts } = require('pdf-lib');

exports.generateStudentPdf = async (req, res) => {
    try {
        const { studentData, academicData, parentData } = req.body; // Asumiendo que los datos vienen en el cuerpo de la solicitud

        // Validar que se recibieron los datos necesarios
        if (!studentData || !academicData || !parentData) {
            return res.status(400).json({ error: 'Faltan datos para generar el PDF. Se requieren datos de estudiante, académicos y de padres/tutor.' });
        }

        const pdfDoc = await PDFDocument.create();
        const page = pdfDoc.addPage();

        // Cargar una fuente estándar
        const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
        const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

        // Definir el contenido del PDF
        let yOffset = 750; // Posición inicial en Y
        const xOffset = 50; // Posición inicial en X
        const lineHeight = 20; // Espaciado entre líneas
        const headingSize = 16;
        const textSize = 12;

        // Título principal
        page.drawText('Reporte de Datos de Estudiante', {
            x: xOffset,
            y: yOffset,
            font: boldFont,
            size: 24,
            color: rgb(0, 0.53, 0.71), // Un azul bonito
        });
        yOffset -= 30;

        // --- Sección de Datos del Estudiante ---
        page.drawText('Datos del Estudiante', {
            x: xOffset,
            y: yOffset,
            font: boldFont,
            size: headingSize,
            color: rgb(0.1, 0.1, 0.1),
        });
        yOffset -= lineHeight;

        page.drawText(`Nombre Completo: ${studentData.primerNombre || ''} ${studentData.segundoNombre || ''} ${studentData.primerApellido || ''} ${studentData.segundoApellido || ''}`, { x: xOffset, y: yOffset, font, size: textSize });
        yOffset -= lineHeight;
        page.drawText(`Fecha de Nacimiento: ${studentData.fechaNacimiento ? new Date(studentData.fechaNacimiento).toLocaleDateString() : 'N/A'}`, { x: xOffset, y: yOffset, font, size: textSize });
        yOffset -= lineHeight;
        page.drawText(`Género: ${studentData.genero || 'N/A'}`, { x: xOffset, y: yOffset, font, size: textSize });
        yOffset -= lineHeight;
        page.drawText(`Nacionalidad: ${studentData.nacionalidad || 'N/A'}`, { x: xOffset, y: yOffset, font, size: textSize });
        yOffset -= lineHeight;
        page.drawText(`Teléfono: ${studentData.telefono || 'N/A'}`, { x: xOffset, y: yOffset, font, size: textSize });
        yOffset -= lineHeight;
        page.drawText(`Dirección: ${studentData.direccion || 'N/A'}`, { x: xOffset, y: yOffset, font, size: textSize });
        yOffset -= lineHeight;
        page.drawText(`Departamento de Residencia: ${studentData.residenciaDepartamento || 'N/A'}`, { x: xOffset, y: yOffset, font, size: textSize });
        yOffset -= lineHeight;
        page.drawText(`Municipio de Residencia: ${studentData.residenciaMunicipio || 'N/A'}`, { x: xOffset, y: yOffset, font, size: textSize });
        yOffset -= (lineHeight * 2); // Espacio adicional entre secciones

        // --- Sección de Datos Académicos ---
        page.drawText('Datos Académicos', {
            x: xOffset,
            y: yOffset,
            font: boldFont,
            size: headingSize,
            color: rgb(0.1, 0.1, 0.1),
        });
        yOffset -= lineHeight;

        page.drawText(`Fecha de Matrícula: ${academicData.fechaMatricula ? new Date(academicData.fechaMatricula).toLocaleDateString() : 'N/A'}`, { x: xOffset, y: yOffset, font, size: textSize });
        yOffset -= lineHeight;
        page.drawText(`Nivel Educativo: ${academicData.nivelEducativo || 'N/A'}`, { x: xOffset, y: yOffset, font, size: textSize });
        yOffset -= lineHeight;
        page.drawText(`Grado y Sección: ${academicData.grado || 'N/A'} ${academicData.seccion || ''}`, { x: xOffset, y: yOffset, font, size: textSize });
        yOffset -= lineHeight;
        page.drawText(`Nombre del Centro: ${academicData.nombreCentro || 'N/A'}`, { x: xOffset, y: yOffset, font, size: textSize });
        yOffset -= lineHeight;
        page.drawText(`Código del Centro: ${academicData.codigoCentro || 'N/A'}`, { x: xOffset, y: yOffset, font, size: textSize });
        yOffset -= (lineHeight * 2);

        // --- Sección de Datos del Padre/Madre/Tutor ---
        page.drawText('Datos de Padres o Tutor', {
            x: xOffset,
            y: yOffset,
            font: boldFont,
            size: headingSize,
            color: rgb(0.1, 0.1, 0.1),
        });
        yOffset -= lineHeight;

        // Datos de la Madre
        if (parentData.primerNombreMadre) {
            page.drawText(`Madre: ${parentData.primerNombreMadre || ''} ${parentData.segundoNombreMadre || ''} ${parentData.primerApellidoMadre || ''} ${parentData.segundoApellidoMadre || ''}`, { x: xOffset, y: yOffset, font, size: textSize });
            yOffset -= lineHeight;
            page.drawText(`Cédula Madre: ${parentData.cedulaMadre || 'N/A'}`, { x: xOffset, y: yOffset, font, size: textSize });
            yOffset -= lineHeight;
            page.drawText(`Teléfono Madre: ${parentData.telefonoMadre || 'N/A'}`, { x: xOffset, y: yOffset, font, size: textSize });
            yOffset -= lineHeight;
        }

        // Datos del Padre
        if (parentData.primerNombrePadre) {
            page.drawText(`Padre: ${parentData.primerNombrePadre || ''} ${parentData.segundoNombrePadre || ''} ${parentData.primerApellidoPadre || ''} ${parentData.segundoApellidoPadre || ''}`, { x: xOffset, y: yOffset, font, size: textSize });
            yOffset -= lineHeight;
            page.drawText(`Cédula Padre: ${parentData.cedulaPadre || 'N/A'}`, { x: xOffset, y: yOffset, font, size: textSize });
            yOffset -= lineHeight;
            page.drawText(`Teléfono Padre: ${parentData.telefonoPadre || 'N/A'}`, { x: xOffset, y: yOffset, font, size: textSize });
            yOffset -= lineHeight;
        }

        // Datos del Tutor
        if (parentData.primerNombreTutor) {
            page.drawText(`Tutor: ${parentData.primerNombreTutor || ''} ${parentData.segundoNombreTutor || ''} ${parentData.primerApellidoTutor || ''} ${parentData.segundoApellidoTutor || ''}`, { x: xOffset, y: yOffset, font, size: textSize });
            yOffset -= lineHeight;
            page.drawText(`Cédula Tutor: ${parentData.cedulaTutor || 'N/A'}`, { x: xOffset, y: yOffset, font, size: textSize });
            yOffset -= lineHeight;
            page.drawText(`Teléfono Tutor: ${parentData.telefonoTutor || 'N/A'}`, { x: xOffset, y: yOffset, font, size: textSize });
            yOffset -= lineHeight;
        }

        const pdfBytes = await pdfDoc.save();

        // Configurar las cabeceras para la descarga
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename="reporte_estudiante.pdf"');
        res.send(Buffer.from(pdfBytes));

    } catch (error) {
        console.error('Error al generar el PDF:', error);
        res.status(500).json({ error: 'No se pudo generar el PDF' });
    }
};