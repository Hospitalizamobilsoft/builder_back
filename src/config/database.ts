import * as sql from 'mssql'; // Importación correcta
import * as fs from 'fs';

// import { config } from 'dotenv';

// config(); // Cargar las variables de entorno
const configPath = 'src/config/config.json';
const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
const getConnection = async (coon?: string) => {
  const configuration = {
    user: config.user,
    password: config.password,
    database: config.database,
    server: config.server,
    port: config.port,
    requestTimeout: 300000,
    options: {
      encrypt: config.encrypt === 1 ? true : false, // for azure
      trustServerCertificate:
        config.trustServerCertificate === 1 ? true : false, // change to true for local dev / self-signed certs
    },
    pool: {
      max: 100,
      min: 0,
      idleTimeoutMillis: 300000,
    },
  };

  try {
    const pool = await sql.connect(configuration); // Realizamos la conexión
    console.log('Conexión exitosa a la base de datos');
    return pool;
  } catch (error) {
    console.error('Error de conexión:', error);
    throw error; // Re-throw the error so the caller can handle it
  }
};

export default { getConnection };
