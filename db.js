const { Pool } = require('pg'); // Importamos Pool de pg
require('dotenv').config();

const config = {
  connectionString: process.env.DATABASE_URL, // Usamos la URI de conexión
  ssl: {
    rejectUnauthorized: false // Para producción, considera true si tienes un certificado válido o si Supabase lo requiere. En desarrollo, suele ser false para evitar problemas.
  }
};

const pool = new Pool(config); // Creamos el pool de conexiones

pool.connect()
  .then(() => {
    console.log('✅ Conectado a PostgreSQL (Supabase)');
  })
  .catch(err => {
    console.error('❌ Error al conectar a PostgreSQL:', err);
  });

module.exports = { pool }; // Exportamos solo el pool