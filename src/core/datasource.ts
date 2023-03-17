import dotenv from 'dotenv';
dotenv.config();
import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import path from 'path';

export const AppDataSource = new DataSource({
  charset: 'utf8mb4_general_ci',
  type: 'mariadb',
  host: process.env.DB_HOST || 'localhost',
  port: +process.env.DB_PORT || 3306,
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || 'mariadb',
  entities: [path.join(__dirname, '../**/*.entity{.js,.ts}')],
  migrations: [path.join(__dirname, '../migrations/*{.js,.ts}')],
  namingStrategy: new SnakeNamingStrategy(),
  logging: true,
});
