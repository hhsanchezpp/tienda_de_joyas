/* Conexión a la BD */
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    allowExitOnIdle: true,
    });
    
/* Chequeo de la conexión     */
const getData = async () => {
    const result = await pool.query('SELECT NOW()')
    console.log(result.rows)
    return result
}
getData();

module.exports = pool;
