import * as process from 'node:process';

export default () => ({
  server: {
    port: parseInt(process.env.PORT, 10) || 3001,
  },
  database: {
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT, 10) || 5432,
    username: process.env.DB_USERNAME || 'student',
    password: process.env.DB_PASSWORD || 'student',
    databaseName: process.env.DB_NAME || 'kupipodariday',
    synchronize: process.env.SYNCHRONIZE || true,
    logging: process.env.LOGGIN || true,
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'supersecret',
    ttl: parseInt(process.env.JWT_TTL, 10) || '30000s',
  },
  hash: {
    saltRounds: parseInt(process.env.SALT_ROUNDS, 10) || 10,
  },
});
