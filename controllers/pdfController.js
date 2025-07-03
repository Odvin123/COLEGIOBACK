const { PDFDocument, rgb, StandardFonts } = require('pdf-lib');

exports.generateStudentPdf = async (req, res) => {
    try {
        const { studentData, academicData, parentData } = req.body;

        if (!studentData || !academicData || !parentData) {
            return res.status(400).json({ error: 'Faltan datos para generar el PDF. Se requieren datos de estudiante, académicos y de padres/tutor.' });
        }

        const pdfDoc = await PDFDocument.create();
        const page = pdfDoc.addPage();

        const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
        const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
        const codeFont = await pdfDoc.embedFont(StandardFonts.Courier); // Para códigos, si se desea un estilo diferente

        let yOffset = 750;
        const margin = 50;
        const contentWidth = page.getWidth() - (2 * margin); // Ancho disponible para el contenido
        const lineHeight = 18;
        const headingSize = 18;
        const subHeadingSize = 14;
        const textSize = 10;
        const labelWidth = 150; // Ancho para las etiquetas de los campos
        const valueWidth = contentWidth - labelWidth - 10; // Ancho para los valores de los campos
        const cellPadding = 5; // Espacio interno de las "celdas"

        // Colores
        const primaryColor = rgb(0, 0.53, 0.71); // Azul Oscuro (ej. #0088B5)
        const secondaryColor = rgb(0.1, 0.1, 0.1); // Casi negro para texto principal
        const borderColor = rgb(0.8, 0.8, 0.8); // Gris claro para bordes de tabla
        const headerBgColor = rgb(0.9, 0.9, 0.9); // Gris muy claro para fondo de encabezado

        // Función auxiliar para dibujar una fila de tabla
        const drawTableRow = (page, y, label, value, labelFont, valueFont, labelColor, valueColor, labelSize, valueSize) => {
            const startY = y - cellPadding;
            page.drawText(label, {
                x: margin + cellPadding,
                y: startY,
                font: labelFont,
                size: labelSize,
                color: labelColor,
            });
            page.drawText(value, {
                x: margin + labelWidth + cellPadding + 5, // Pequeño espacio extra
                y: startY,
                font: valueFont,
                size: valueSize,
                color: valueColor,
                maxWidth: valueWidth - cellPadding * 2, // Para asegurar que el texto no se desborde
            });
            return lineHeight + (cellPadding * 2); // Altura de la fila
        };

        // Título Principal
        page.drawText('FICHA DE MATRÍCULA', {
            x: margin,
            y: yOffset,
            font: boldFont,
            size: 28,
            color: primaryColor,
        });
        yOffset -= 40;

        // --- Sección de Datos del Estudiante ---
        const studentFields = [
            { label: 'ID', value: studentData.id || 'N/A' },
            { label: 'Nombre Completo', value: `${studentData.primerNombre || ''} ${studentData.segundoNombre || ''} ${studentData.primerApellido || ''} ${studentData.segundoApellido || ''}` },
            { label: 'Teléfono', value: studentData.telefono || 'N/A' },
            { label: 'Dirección', value: studentData.direccion || 'N/A' },
            { label: 'Fecha de Nacimiento', value: studentData.fechaNacimiento ? new Date(studentData.fechaNacimiento).toLocaleDateString() : 'N/A' },
            { label: 'Género', value: studentData.genero || 'N/A' },
            { label: 'Peso (kg)', value: studentData.peso || 'N/A' },
            { label: 'Talla (cm)', value: studentData.talla || 'N/A' },
            { label: 'Nacionalidad', value: studentData.nacionalidad || 'N/A' },
            { label: 'País de Nacimiento', value: studentData.paisNacimiento || 'N/A' },
            { label: 'Residencia Depto', value: studentData.residenciaDepartamento || 'N/A' },
            { label: 'Residencia Municipio', value: studentData.residenciaMunicipio || 'N/A' },
            { label: 'Lengua Materna', value: studentData.lenguaMaterna || 'N/A' },
            { label: 'Discapacidad', value: studentData.discapacidad || 'N/A' },
            { label: 'Tipo de Discapacidad', value: (studentData.discapacidad === 'Sí' && studentData.tipoDiscapacidad) ? studentData.tipoDiscapacidad : 'N/A' },
            { label: 'Territorio Indígena', value: studentData.territorioIndigenaEstudiante || 'N/A' },
            { label: 'Habita en Territorio Indígena', value: studentData.habitaIndigenaEstudiante || 'N/A' }
        ];

        // Header for Student Data
        page.drawRectangle({
            x: margin,
            y: yOffset - subHeadingSize - cellPadding * 2,
            width: contentWidth,
            height: subHeadingSize + cellPadding * 2,
            color: headerBgColor,
        });
        page.drawText('DATOS DEL ESTUDIANTE', {
            x: margin + cellPadding,
            y: yOffset - subHeadingSize - cellPadding,
            font: boldFont,
            size: subHeadingSize,
            color: secondaryColor,
        });
        yOffset -= (subHeadingSize + cellPadding * 2 + 5); // Espacio después del encabezado

        // Draw Student Data Table
        let currentStudentY = yOffset;
        studentFields.forEach((field, index) => {
            const rowHeight = drawTableRow(page, currentStudentY, field.label, field.value, font, font, secondaryColor, secondaryColor, textSize, textSize);
            page.drawLine({
                start: { x: margin, y: currentStudentY - rowHeight + cellPadding },
                end: { x: margin + contentWidth, y: currentStudentY - rowHeight + cellPadding },
                color: borderColor,
                thickness: 0.5,
            });
            currentStudentY -= rowHeight;
        });
        yOffset = currentStudentY - 20; // Espacio entre secciones

        // --- Sección de Datos Académicos ---
        const academicFields = [
            { label: 'ID', value: academicData.id || 'N/A' },
            { label: 'Fecha Matrícula', value: academicData.fechaMatricula ? new Date(academicData.fechaMatricula).toLocaleDateString() : 'N/A' },
            { label: 'Departamento Académico', value: academicData.departamentoacad || 'N/A' },
            { label: 'Municipio Académico', value: academicData.municipioAcad || 'N/A' },
            { label: 'Código Único', value: academicData.codigoUnico || 'N/A' },
            { label: 'Código Centro', value: academicData.codigoCentro || 'N/A' },
            { label: 'Nombre del Centro', value: academicData.nombreCentro || 'N/A' },
            { label: 'Nivel Educativo', value: academicData.nivelEducativo || 'N/A' },
            { label: 'Modalidad', value: academicData.modalidad || 'N/A' },
            { label: 'Turno', value: academicData.turno || 'N/A' },
            { label: 'Grado', value: academicData.grado || 'N/A' },
            { label: 'Sección', value: academicData.seccion || 'N/A' },
            { label: 'Repitente', value: academicData.repitente || 'N/A' }
        ];

        // Header for Academic Data
        page.drawRectangle({
            x: margin,
            y: yOffset - subHeadingSize - cellPadding * 2,
            width: contentWidth,
            height: subHeadingSize + cellPadding * 2,
            color: headerBgColor,
        });
        page.drawText('DATOS ACADÉMICOS', {
            x: margin + cellPadding,
            y: yOffset - subHeadingSize - cellPadding,
            font: boldFont,
            size: subHeadingSize,
            color: secondaryColor,
        });
        yOffset -= (subHeadingSize + cellPadding * 2 + 5);

        // Draw Academic Data Table
        let currentAcademicY = yOffset;
        academicFields.forEach((field, index) => {
            const rowHeight = drawTableRow(page, currentAcademicY, field.label, field.value, font, font, secondaryColor, secondaryColor, textSize, textSize);
            page.drawLine({
                start: { x: margin, y: currentAcademicY - rowHeight + cellPadding },
                end: { x: margin + contentWidth, y: currentAcademicY - rowHeight + cellPadding },
                color: borderColor,
                thickness: 0.5,
            });
            currentAcademicY -= rowHeight;
        });
        yOffset = currentAcademicY - 20;

        // --- Sección de Datos de Padres o Tutor ---
        const parentTutorFields = [];
        if (parentData.primerNombreMadre) {
            parentTutorFields.push({ section: 'Datos de la Madre', fields: [
                { label: 'Nombre Completo', value: `${parentData.primerNombreMadre || ''} ${parentData.segundoNombreMadre || ''} ${parentData.primerApellidoMadre || ''} ${parentData.segundoApellidoMadre || ''}` },
                { label: 'Tipo Identificación', value: parentData.tipoIdentificacionMadre || 'N/A' },
                { label: 'Cédula', value: parentData.cedulaMadre || 'N/A' },
                { label: 'Teléfono', value: parentData.telefonoMadre || 'N/A' }
            ]});
        }
        if (parentData.primerNombrePadre) {
            parentTutorFields.push({ section: 'Datos del Padre', fields: [
                { label: 'Nombre Completo', value: `${parentData.primerNombrePadre || ''} ${parentData.segundoNombrePadre || ''} ${parentData.primerApellidoPadre || ''} ${parentData.segundoApellidoPadre || ''}` },
                { label: 'Tipo Identificación', value: parentData.tipoIdentificacionPadre || 'N/A' },
                { label: 'Cédula', value: parentData.cedulaPadre || 'N/A' },
                { label: 'Teléfono', value: parentData.telefonoPadre || 'N/A' }
            ]});
        }
        if (parentData.primerNombreTutor) {
            parentTutorFields.push({ section: 'Datos del Tutor', fields: [
                { label: 'Nombre Completo', value: `${parentData.primerNombreTutor || ''} ${parentData.segundoNombreTutor || ''} ${parentData.primerApellidoTutor || ''} ${parentData.segundoApellidoTutor || ''}` },
                { label: 'Tipo Identificación', value: parentData.tipoIdentificacionTutor || 'N/A' },
                { label: 'Cédula', value: parentData.cedulaTutor || 'N/A' },
                { label: 'Teléfono', value: parentData.telefonoTutor || 'N/A' }
            ]});
        }

        if (parentTutorFields.length > 0) {
            // Header for Parent/Tutor Data
            page.drawRectangle({
                x: margin,
                y: yOffset - subHeadingSize - cellPadding * 2,
                width: contentWidth,
                height: subHeadingSize + cellPadding * 2,
                color: headerBgColor,
            });
            page.drawText('DATOS DE PADRES O TUTOR', {
                x: margin + cellPadding,
                y: yOffset - subHeadingSize - cellPadding,
                font: boldFont,
                size: subHeadingSize,
                color: secondaryColor,
            });
            yOffset -= (subHeadingSize + cellPadding * 2 + 5);

            parentTutorFields.forEach(section => {
                // Sección específica (Madre/Padre/Tutor)
                page.drawText(section.section.toUpperCase(), {
                    x: margin,
                    y: yOffset - lineHeight,
                    font: boldFont,
                    size: textSize + 1,
                    color: primaryColor,
                });
                yOffset -= (lineHeight + 5);

                let currentParentY = yOffset;
                section.fields.forEach(field => {
                    const rowHeight = drawTableRow(page, currentParentY, field.label, field.value, font, font, secondaryColor, secondaryColor, textSize, textSize);
                    page.drawLine({
                        start: { x: margin, y: currentParentY - rowHeight + cellPadding },
                        end: { x: margin + contentWidth, y: currentParentY - rowHeight + cellPadding },
                        color: borderColor,
                        thickness: 0.5,
                    });
                    currentParentY -= rowHeight;
                });
                yOffset = currentParentY - 10; // Espacio entre subsecciones de padres/tutores
            });
        }

        const pdfBytes = await pdfDoc.save();

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename="ficha_de_matricula.pdf"');
        res.send(Buffer.from(pdfBytes));

    } catch (error) {
        console.error('Error al generar el PDF:', error);
        res.status(500).json({ error: 'No se pudo generar el PDF: ' + error.message });
    }
};