import { pool, mongoose } from '../config/db.js';

export async function getHealthStatus(req, res) {
  const services = {
    api: { status: 'up', uptime_seconds: Math.floor(process.uptime()) },
    postgres: { status: 'down', latency_ms: null, error: null },
    mongodb: { status: 'down', latency_ms: null, error: null }
  };

  // 1. Evaluar PostgreSQL Pool
  const pgStart = Date.now();
  try {
    await pool.query('SELECT NOW()');
    services.postgres.latency_ms = Date.now() - pgStart;
    services.postgres.status = 'healthy';
  } catch (err) {
    services.postgres.latency_ms = Date.now() - pgStart;
    services.postgres.error = err.message;
  }

  // 2. Evaluar MongoDB Atlas
  const mongoStart = Date.now();
  try {
    if (mongoose.connection.readyState === 1 && mongoose.connection.db) {
      await mongoose.connection.db.admin().ping();
      services.mongodb.latency_ms = Date.now() - mongoStart;
      services.mongodb.status = 'healthy';
    }
  } catch (err) {
    services.mongodb.latency_ms = Date.now() - mongoStart;
    services.mongodb.error = err.message;
  }

  const isHealthy = services.postgres.status === 'healthy' && services.mongodb.status === 'healthy';
  return res.status(isHealthy ? 200 : 503).json({
    status: isHealthy ? 'healthy' : 'degraded',
    timestamp: new Date().toISOString(),
    services
  });
}