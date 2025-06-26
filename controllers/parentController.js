const { saveParentData } = require('../models/parentModel');

exports.createParentData = async (req, res) => {
    try {
        const data = req.body;
        const matriculaId = data.matriculaId;

        if (!matriculaId) {
            return res.status(400).json({ error: 'El campo matriculaId es obligatorio' });
        }

        await saveParentData(data, matriculaId);
        res.status(201).json({ message: 'Datos de los padres o tutor guardados' });

    } catch (error) {
        console.error('Error al guardar datos de padres o tutor:', error);
        res.status(500).json({ error: 'No se pudieron guardar los datos de los padres o tutor' });
    }
};