exports.generatePdf = async (req, res) => {
    const formData = req.body;

    try {
     
        console.log('Datos del formulario recibidos:', formData);

        
        res.status(200).json({
            message: 'Datos del formulario recibidos y procesados correctamente. La generación de PDF ha sido deshabilitada.',
            data: formData 
        });

    } catch (error) {
        console.error('❌ Error al procesar los datos del formulario:', error);

        res.status(500).send(`Error al procesar el formulario: ${error.message || 'Error desconocido'}`);
    }
};