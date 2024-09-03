import * as process from 'node:process';

export default () => ({
  server: {
    port: parseInt(process.env.API_PORT, 10) || 3001,
  },
  database: {
    type: 'postgres',
    host: process.env.POSTGRES_HOST || 'localhost',
    port: parseInt(process.env.POSTGRES_PORT, 10) || 5432,
    username: process.env.POSTGRES_USER || 'student',
    password: process.env.POSTGRES_PASSWORD|| 'student',
    databaseName: process.env.POSTGRES_DB || 'kupipodariday',
    synchronize: process.env.POSTGRES_SYNCHRONIZE || true,
    logging: process.env.POSTGRES_LOGGING || true,
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'supersecret',
    ttl: parseInt(process.env.JWT_TTL, 10) || '30000s',
  },
  hash: {
    saltRounds: parseInt(process.env.SALT_ROUNDS, 10) || 10,
  },
});
