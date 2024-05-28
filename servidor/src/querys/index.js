/* COnsulta a la BD */
const pool = require('../config/db');
const format = require('pg-format');

const getJoyaByIdQuery = async (id) => {
    try {
        const consulta = 'SELECT * FROM inventario WHERE id = $1';
        const { rows } = await pool.query(consulta, [id]);
        return rows[0]; // 1era row(fila)
    } catch (error) {
        console.error('Error en la consulta', error);
        throw error;
    }
}

//PAGE
const getJoyasQuery = async ({ limits = 10, page = 1, order_by = "stock_ASC" }) => {

    const [campo, direccion] = order_by.split('_');
    const offset = (page - 1) * limits; //pagina a mostrar
    const formatQuery = format("SELECT * FROM inventario ORDER BY %s %s LIMIT %s OFFSET %s",
        campo,
        direccion,
        limits,
        offset
    );
    const { rows: result } = await pool.query(formatQuery);
    return result;
}
const filtrarJoyasQuery = async (precio_max, precio_min, categoria, metal) => {
    let query = 'SELECT * FROM inventario WHERE 1=1';
    const values = [];

    if (precio_max) {   query += ' AND precio <= $' + (values.length + 1);
                        values.push(precio_max);
    }
    if (precio_min) {   query += ' AND precio >= $' + (values.length + 1);
                        values.push(precio_min);
    }
    if (categoria) {    query += ' AND categoria = $' + (values.length + 1);
                        values.push(categoria);
    }
    if (metal) {
                    query += ' AND metal = $' + (values.length + 1);
                    values.push(metal);
    }
    const { rows } = await pool.query(query, values);
    return rows;
}
module.exports = {
    getJoyaByIdQuery,
    getJoyasQuery,
    filtrarJoyasQuery
};
