const { Pool } = require('pg'); 
require('dotenv').config();

const config = {
  connectionString: process.env.DATABASE_URL, 
  ssl: {
    rejectUnauthorized: false 
  }
};

const pool = new Pool(config); 

pool.connect()
  .then(() => {
    console.log('✅ Conectado a PostgreSQL (Supabase)');
  })
  .catch(err => {
    console.error('❌ Error al conectar a PostgreSQL:', err);
  });

module.exports = { pool };