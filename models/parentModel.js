const { pool } = require('../db');

async function saveParentData(data, matriculaId) {
    let client;
    try {
        client = await pool.connect();

        // Construir dinámicamente la lista de columnas y valores para la inserción
        const columns = [
            'matricula_id',
            'primer_nombre_madre', 'segundo_nombre_madre', 'primer_apellido_madre', 'segundo_apellido_madre', 'tipo_identificacion_madre', 'cedula_madre', 'telefono_madre',
            'primer_nombre_padre', 'segundo_nombre_padre', 'primer_apellido_padre', 'segundo_apellido_padre', 'tipo_identificacion_padre', 'cedula_padre', 'telefono_padre',
            'primer_nombre_tutor', 'segundo_nombre_tutor', 'primer_apellido_tutor', 'segundo_apellido_tutor', 'tipo_identificacion_tutor', 'cedula_tutor', 'telefono_tutor'
        ];

        const values = [
            matriculaId,
            data.primerNombreMadre || null, data.segundoNombreMadre || null, data.primerApellidoMadre || null, data.segundoApellidoMadre || null, data.tipoIdentificacionMadre || null, data.cedulaMadre || null, data.telefonoMadre || null,
            data.primerNombrePadre || null, data.segundoNombrePadre || null, data.primerApellidoPadre || null, data.segundoApellidoPadre || null, data.tipoIdentificacionPadre || null, data.cedulaPadre || null, data.telefonoPadre || null,
            data.primerNombreTutor || null, data.segundoNombreTutor || null, data.primerApellidoTutor || null, data.segundoApellidoTutor || null, data.tipoIdentificacionTutor || null, data.cedulaTutor || null, data.telefonoTutor || null
        ];

        // Generar los placeholders ($1, $2, ...)
        const placeholders = columns.map((_, i) => `$${i + 1}`).join(', ');

        await client.query(`
            INSERT INTO datos_padres_tutor (${columns.join(', ')})
            VALUES (${placeholders})
        `, values);

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
                primer_nombre_madre AS "primerNombreMadre",
                segundo_nombre_madre AS "segundoNombreMadre",
                primer_apellido_madre AS "primerApellidoMadre",
                segundo_apellido_madre AS "segundoApellidoMadre",
                tipo_identificacion_madre AS "tipoIdentificacionMadre",
                cedula_madre AS "cedulaMadre",
                telefono_madre AS "telefonoMadre",
                primer_nombre_padre AS "primerNombrePadre",
                segundo_nombre_padre AS "segundoNombrePadre",
                primer_apellido_padre AS "primerApellidoPadre",
                segundo_apellido_padre AS "segundoApellidoPadre",
                tipo_identificacion_padre AS "tipoIdentificacionPadre",
                cedula_padre AS "cedulaPadre",
                telefono_padre AS "telefonoPadre",
                primer_nombre_tutor AS "primerNombreTutor",
                segundo_nombre_tutor AS "segundoNombreTutor",
                primer_apellido_tutor AS "primerApellidoTutor",
                segundo_apellido_tutor AS "segundoApellidoTutor",
                tipo_identificacion_tutor AS "tipoIdentificacionTutor",
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