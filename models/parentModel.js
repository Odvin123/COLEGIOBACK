const { pool } = require('../db');

async function saveParentData(data, matriculaId) {
    let client;
    try {
        client = await pool.connect();

        await client.query(`
            INSERT INTO datos_padres_tutor (
                matricula_id, nombre_madre, cedula_madre, telefono_madre,
                nombre_padre, cedula_padre, telefono_padre,
                nombre_tutor, cedula_tutor, telefono_tutor
            )
            VALUES (
                $1, $2, $3, $4, $5, $6, $7, $8, $9, $10
            )
        `, [
            matriculaId,
            data.nombreMadre || null,
            data.cedulaMadre || null,
            data.telefonoMadre || null,
            data.nombrePadre || null,
            data.cedulaPadre || null,
            data.telefonoPadre || null,
            data.nombreTutor || null,
            data.cedulaTutor || null,
            data.telefonoTutor || null
        ]);
    } catch (err) {
        console.error('Error al guardar datos de padres o tutor:', err);
        throw err;
    } finally {
        if (client) {
            client.release();
        }
    }
}

async function getAllParentData() {
    let client;
    try {
        client = await pool.connect();
        const result = await client.query(`
            SELECT
                id,
                matricula_id AS "matriculaId",
                nombre_madre AS "nombreMadre",
                cedula_madre AS "cedulaMadre",
                telefono_madre AS "telefonoMadre",
                nombre_padre AS "nombrePadre",
                cedula_padre AS "cedulaPadre",
                telefono_padre AS "telefonoPadre",
                nombre_tutor AS "nombreTutor",
                cedula_tutor AS "cedulaTutor",
                telefono_tutor AS "telefonoTutor"
            FROM datos_padres_tutor
            ORDER BY id DESC;
        `);
        return result.rows;
    } catch (err) {
        console.error('Error al obtener todos los datos de padres/tutores:', err);
        throw err;
    } finally {
        if (client) {
            client.release();
        }
    }
}

module.exports = { saveParentData, getAllParentData };