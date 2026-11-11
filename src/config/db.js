import pg from 'pg';
import mongoose from 'mongoose';
import { config } from './environment.js';

const { Pool } = pg;

// 1. Singleton pg.Pool (PostgreSQL)
export const pool = new Pool(config.postgres);

pool.on('connect', () => {
  if (config.nodeEnv === 'development') {
    console.log('🐘 [PostgreSQL] Nuevo cliente físico asignado en el Pool');
  }
});

pool.on('error', (err) => {
  console.error('❌ [PostgreSQL Error en Cliente Ocioso]:', err.message);
});
// 2. Listeners de Ciclo de Vida del Clúster Atlas en Mongoose
mongoose.connection.on('connected', () => {
  console.log('🍃 [MongoDB] Conexión establecida exitosamente con el clúster');
});

mongoose.connection.on('error', (err) => {
  console.error('❌ [MongoDB Error de Conexión]:', err.message);
});

mongoose.connection.on('disconnected', () => {
  console.warn('⚠️ [MongoDB] Desconectado del servidor de base de datos');
});

export { mongoose };
export async function connectDatabases() {
  console.log('🔌 [ADSO DUAL DB] Inicializando conexiones...');

  // A. Verificación PostgreSQL
  try {
    const res = await pool.query('SELECT NOW() AS t, current_database() AS db');
    console.log(`✅ [PostgreSQL Conectado] Base: "${res.rows[0].db}"`);
  } catch (err) {
    console.error(`❌ [PostgreSQL Falló Conexión]: ${err.message}`);
  }

  // B. Inicialización MongoDB Atlas
  try {
    await mongoose.connect(config.mongo.uri, { serverSelectionTimeoutMS: 5000 });
    console.log(`✅ [MongoDB Atlas Conectado] Base: "${mongoose.connection.name}"`);
  } catch (err) {
    console.error(`❌ [MongoDB Falló Conexión]: ${err.message}`);
  }
}

export async function disconnectDatabases() {
  await pool.end();
  await mongoose.connection.close();
  console.log('🔒 Ambas bases de datos cerradas correctamente');
}