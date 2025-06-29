const express = require('express');
    const cors = require('cors');
    const path = require('path');
    require('dotenv').config();
    const { pool } = require('./db');

    const studentModel = require('./models/studentModel');
    const parentModel = require('./models/parentModel');
    const academicModel = require('./models/academicModel');


    const app = express();
    const PORT = process.env.PORT || 8000;
    
const corsOptions = {
    
    origin: '*', 


    
    credentials: true, 

   
};

app.use(cors(corsOptions));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

   
    const studentRoutes = require('./routes/studentRoutes');
    const parentRoutes = require('./routes/parentRoutes');
    const academicRoutes = require('./routes/academicRoutes');
    const pdfRoutes = require('./routes/pdfRoutes'); 

    app.use('/api/student', studentRoutes);
    app.use('/api/parent', parentRoutes);
    app.use('/api/academic', academicRoutes);
    app.use('/api/generate-pdf', pdfRoutes); 

    app.post('/api/login', (req, res) => {
        const { correo, contraseña } = req.body;
        const ADMIN_CORREO = 'admin@example.com';
        const ADMIN_CONTRASEÑA = 'admin123';

        if (!correo || !contraseña) {
            return res.status(400).json({ error: 'Correo y contraseña son requeridos.' });
        }

        if (correo === ADMIN_CORREO && contraseña === ADMIN_CONTRASEÑA) {
            return res.json({
                usuario: {
                    nombre: 'Administrador',
                    correo: ADMIN_CORREO,
                    rol: 'admin'
                }
            });
        } else {
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }
    });

    app.get('/api/registros', async (req, res) => {
        try {
            const academicos = await academicModel.getAllAcademicData();
            const estudiantes = await studentModel.getAllStudentData();
            const padres = await parentModel.getAllParentData();

            res.json({
                academicos: academicos,
                estudiantes: estudiantes,
                padres: padres
            });

        } catch (error) {
            console.error('Error al obtener registros para el dashboard:', error);
            res.status(500).json({ error: 'Error al cargar los registros del dashboard' });
        }
    });

    
    app.get('/', (req, res) => {
  res.send('🎉 Backend del Colegio en línea desde Koyeb');
});
    // Iniciar servidor
    app.listen(PORT, () => {
        console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });
    