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

    // Dinamik SQL sorgusu: name, surname, tc gibi filtreleri işle
    let query = 'SELECT * FROM medinfo WHERE 1=1';
    let countQuery = 'SELECT COUNT(*) as total FROM medinfo WHERE 1=1';
    const params: any[] = [];
    const countParams: any[] = [];
    
    console.log(filters)
    // TC filtreleme
    if (filters.tc && filters.tc.trim() !== "") {
      query += ' AND tc = ?';
      countQuery += ' AND tc = ?';
      params.push(filters.tc.trim()); // TC numarasını string olarak işliyoruz
      countParams.push(filters.tc.trim());
    }

    // İsim filtreleme
    if (filters.name) {
      query += ' AND name = ?';
      countQuery += ' AND name = ?';
      params.push(`${filters.name}`);
      countParams.push(`${filters.name}`);
    }

    // Soyisim filtreleme
    if (filters.surname) {
      query += ' AND surname = ?';
      countQuery += ' AND surname = ?';
      params.push(`${filters.surname}`);
      countParams.push(`${filters.surname}`);
    }

    // Limit ve offset ekleme
    query += ' LIMIT ? OFFSET ?';
    params.push(limit, offset);

    console.log("query", query, params);
    console.log("countQuery", countQuery, countParams);

    // Filtrelenmiş sonuçları getir
    const [rows] = await db.execute(query, params);

    // Filtrelenmiş toplam sayıyı getir (pagination için)
    const [totalCountResult] = await db.execute<TotalCountResult[]>(countQuery, countParams);
    const total = totalCountResult[0].total;

    // Sonuçları ve pagination bilgilerini döndürüyoruz
    return {
      data: rows,
      pagination: {
        total, // Filtrelenmiş toplam kullanıcı sayısı
        page,  // Mevcut sayfa
        limit, // Sayfa başına gösterilecek kayıt sayısı
        totalPages: Math.ceil(total / limit), // Toplam sayfa sayısı
      },
    };
  } catch (error) {
    console.error('Database query error:', error);
    throw new Error('Database query failed');
  }
};
