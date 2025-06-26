const { pool } = require('../db');

async function saveAcademicData(data) {
    let client;
    try {
        client = await pool.connect(); 

        const result = await client.query(`
            INSERT INTO datos_academicos (
                fecha_matricula, departamento, municipio, codigo_unico, codigo_centro,
                nombre_centro, nivel_educativo, modalidad, turno, grado, seccion, repitente
            )
            VALUES (
                $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12 
            )
            RETURNING id;
        `, [
            data.fechaMatricula || null,
            data.departamento || null,
            data.municipio || null,
            data.codigoUnico || null,
            data.codigoCentro || null,
            data.nombreCentro || null,
            data.nivelEducativo || null,
            data.modalidad || null,
            data.turno || null,
            data.grado || null,
            data.seccion || null,
            data.repitente || null
        ]);

        return result.rows[0].id;
    } catch (err) {
        console.error('Error al guardar datos académicos:', err);
        throw err;
    } finally {
        if (client) {
            client.release();
        }
    }
}

async function getAllAcademicData() {
    let client;
    try {
        client = await pool.connect();
        const result = await client.query(`
            SELECT
                id,
                fecha_matricula AS "fechaMatricula",
                departamento,
                municipio,
                codigo_unico AS "codigoUnico",
                codigo_centro AS "codigoCentro",
                nombre_centro AS "nombreCentro",
                nivel_educativo AS "nivelEducativo",
                modalidad,
                turno,
                grado,
                seccion,
                repitente
            FROM datos_academicos
            ORDER BY id DESC;
        `);
        return result.rows;
    } catch (err) {
        console.error('Error al obtener todos los datos académicos:', err);
        throw err;
    } finally {
        if (client) {
            client.release();
        }
    }
}

module.exports = { saveAcademicData, getAllAcademicData };