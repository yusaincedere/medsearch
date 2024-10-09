import { dbConnect } from './db'; // Veritabanı bağlantısını içe aktarıyoruz
import { RowDataPacket } from 'mysql2';
import { UserFilter } from '../types/filters'; // Filtre yapısını import ediyoruz

// TotalCountResult'ı RowDataPacket ile genişletiyoruz
interface TotalCountResult extends RowDataPacket {
  total: number;
}

// Kullanıcıları getiren ve filtreleme/pagination işlemi yapan fonksiyon
export const getUsers = async (page: number, limit: number, filters: UserFilter) => {
  try {
    const db = await dbConnect();

    // Sayfalama için offset hesaplama
    const offset = (page - 1) * limit;

    // Dinamik SQL sorgusu: name ve email gibi filtreleri işle
    let query = 'SELECT * FROM users WHERE 1=1';
    const params = [];

    // Eğer filtrelerde isim varsa
    if (filters.name) {
      query += ' AND name LIKE ?';
      params.push(`%${filters.name}%`);
    }

    if (filters.surname) {
      query += ' AND surname LIKE ?';
      params.push(`%${filters.surname}%`);
    }

    // Limit ve offset ekleme
    query += ' LIMIT ? OFFSET ?';
    params.push(limit, offset);

    // Kullanıcıları getirme sorgusu
    const [rows] = await db.execute(query, params);

    // Toplam kullanıcı sayısını getirme sorgusu (pagination için)
    const [totalCountResult] = await db.execute<TotalCountResult[]>('SELECT COUNT(*) as total FROM users WHERE 1=1', []);
    const total = totalCountResult[0].total;

    // Sonuçları ve pagination bilgilerini döndürüyoruz
    return {
      data: rows,
      pagination: {
        total, // Toplam kullanıcı sayısı
        page, // Mevcut sayfa
        limit, // Sayfa başına gösterilecek kayıt sayısı
        totalPages: Math.ceil(total / limit), // Toplam sayfa sayısı
      },
    };
  } catch (error) {
    console.error('Database query error:', error);
    throw new Error('Database query failed');
  }
};
