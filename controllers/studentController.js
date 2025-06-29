
const { saveStudentData } = require('../models/studentModel'); 

exports.createStudentData = async (req, res) => {
    try {
        const data = req.body;
        const matriculaId = data.matriculaId;

        if (!matriculaId) {
            return res.status(400).json({ error: 'El campo matriculaId es obligatorio' });
        }

        await saveStudentData(data, matriculaId);
        res.status(201).json({ message: 'Datos del estudiante guardados' });

    } catch (error) {
        console.error('Error al guardar datos del estudiante:', error);
        res.status(500).json({ error: 'No se pudieron guardar los datos del estudiante' });
    }
};