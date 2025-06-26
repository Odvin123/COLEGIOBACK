const { saveAcademicData } = require('../models/academicModel');

exports.createAcademicData = async (req, res) => {
    try {
        const data = req.body;
        const academicId = await saveAcademicData(data);
        res.status(201).json({ id: academicId, message: 'Datos académicos guardados' });
    } catch (error) {
        console.error('Error al guardar datos académicos:', error);
        res.status(500).json({ error: 'No se pudieron guardar los datos académicos' });
    }
};