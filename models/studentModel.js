const { pool } = require('../db'); 

async function saveStudentData(data, matriculaId) {
    let client;
    try {
        client = await pool.connect();

        await client.query(`
            INSERT INTO datos_estudiante (
                matricula_id, telefono, direccion, primer_nombre, segundo_nombre,
                primer_apellido, segundo_apellido, fecha_nacimiento, genero, peso, talla,
                nacionalidad, pais_nacimiento, residencia_departamento, residencia_municipio,
                lengua_materna, discapacidad, territorio_indigena, habita_indigena
            )
            VALUES (
                $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19
            )
        `, [
            matriculaId,
            data.telefono || null,
            data.direccion || null,
            data.primerNombre || null,
            data.segundoNombre || null,
            data.primerApellido || null,
            data.segundoApellido || null,
            data.fechaNacimiento || null,
            data.genero || null,
            data.peso || null,
            data.talla || null,
            data.nacionalidad || null,
            data.paisNacimiento || null,
            data.residenciaDepartamento || null,
            data.residenciaMunicipio || null,
            data.lenguaMaterna || null,
            data.discapacidad || null,
            data.territorioIndigena || null,
            data.habitaIndigena || null
        ]);
    } catch (err) {
        console.error('Error al guardar datos del estudiante:', err);
        throw err;
    } finally {
        if (client) {
            client.release();
        }
    }
}


async function getAllStudentData() {
    let client;
    try {
        client = await pool.connect();
        const result = await client.query(`
            SELECT
                id,
                matricula_id AS "matriculaId",
                telefono,
                direccion,
                primer_nombre AS "primerNombre",
                segundo_nombre AS "segundoNombre",
                primer_apellido AS "primerApellido",
                segundo_apellido AS "segundoApellido",
                fecha_nacimiento AS "fechaNacimiento",
                genero,
                peso,
                talla,
                nacionalidad,
                pais_nacimiento AS "paisNacimiento",
                residencia_departamento AS "residenciaDepartamento",
                residencia_municipio AS "residenciaMunicipio",
                lengua_materna AS "lenguaMaterna",
                discapacidad,
                territorio_indigena AS "territorioIndigena",
                habita_indigena AS "habitaIndigena"
            FROM datos_estudiante
            ORDER BY id DESC;
        `);
        return result.rows;
    } catch (err) {
        console.error('Error al obtener todos los datos del estudiante:', err);
        throw err;
    } finally {
        if (client) {
            client.release();
        }
    }
}

module.exports = { saveStudentData, getAllStudentData };