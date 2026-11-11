import dotenv from 'dotenv';
dotenv.config();

// Validación defensiva fail-fast
const requiredVars = ['PG_HOST', 'PG_DATABASE', 'PG_USER', 'MONGO_URI'];
const missingVars = requiredVars.filter(v => !process.env[v]);

if (missingVars.length > 0) {
  console.warn(`⚠️ [ADSO ADVERTENCIA] Faltan variables en .env: ${missingVars.join(', ')}`);
}

export const config = {
  port: parseInt(process.env.PORT || '3000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  postgres: {
    host: process.env.PG_HOST || 'localhost',
    port: parseInt(process.env.PG_PORT || '5432', 10),
    database: process.env.PG_DATABASE || 'adso_polyglot_db',
    user: process.env.PG_USER || 'postgres',
    password: process.env.PG_PASSWORD || '',
    max: parseInt(process.env.PG_MAX_POOL || '10', 10),
    idleTimeoutMillis: parseInt(process.env.PG_IDLE_TIMEOUT || '30000', 10)
  },
  mongo: {
    uri: process.env.MONGO_URI || 'mongodb://localhost:27017/adso_polyglot_db'
  }
};