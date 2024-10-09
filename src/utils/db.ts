import mysql from 'mysql2/promise';

// Veritabanı bağlantı fonksiyonu
export const dbConnect = async () => {
  const connection = await mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
  });
  return connection;
};