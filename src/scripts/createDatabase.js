require('dotenv').config();

const mysql = require('mysql2/promise');

async function main() {
  const host = process.env.DB_HOST || 'localhost';
  const port = Number(process.env.DB_PORT || 3306);
  const user = process.env.DB_USER || 'root';
  const password = process.env.DB_PASSWORD || '';
  const dbName = process.env.DB_NAME || 'blood_donation_db';

  const conn = await mysql.createConnection({ host, port, user, password, multipleStatements: true });
  await conn.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`);
  await conn.end();

  console.log('Database ensured:', dbName);
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error('Failed to create database.', e.message);
    process.exit(1);
  });

