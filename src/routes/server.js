import app from './app.js';
import { config } from './config/environment.js';
import { connectDatabases, disconnectDatabases } from './config/db.js';

async function bootstrap() {
  await connectDatabases();

  const server = app.listen(config.port, () => {
    console.log(`🚀 Servidor activo en: http://localhost:${config.port}`);
  });

  const handleShutdown = async (signal) => {
    console.log(`\n⚠️  ${signal} recibido. Cerrando conexiones limpiamente...`);
    server.close(async () => {
      await disconnectDatabases();
      process.exit(0);
    });
  };

  process.on('SIGINT', () => handleShutdown('SIGINT'));
  process.on('SIGTERM', () => handleShutdown('SIGTERM'));
}

bootstrap();