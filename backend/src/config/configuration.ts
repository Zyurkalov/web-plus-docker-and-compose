import * as process from 'node:process';

export default () => ({
  server: {
    port: parseInt(process.env.API_PORT, 10),
  },
  database: {
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT, 10),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    databaseName: process.env.POSTGRES_DB,
    synchronize: process.env.POSTGRES_SYNCHRONIZE || true,
    logging: process.env.POSTGRES_LOGGING || true,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    ttl: parseInt(process.env.JWT_TTL, 10),
  },
  hash: {
    saltRounds: parseInt(process.env.SALT_ROUNDS, 10),
  },
});
