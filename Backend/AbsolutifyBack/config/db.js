const mysql = require("mysql2/promise");
const dotenv = require("dotenv");

dotenv.config();

let pool;

try {
  pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });
  console.log("Conexión a la base de datos establecida.");
} catch (error) {
  console.error("Error al conectar a la base de datos:", error.message);
  process.exit(1); // Termina el proceso si falla la conexión
}

module.exports = pool;
