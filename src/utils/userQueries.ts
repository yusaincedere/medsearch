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

    // Dinamik SQL sorgusu: name, surname, tcno gibi filtreleri işle
    let query = 'SELECT * FROM medinfo WHERE 1=1';
    let countQuery = 'SELECT COUNT(*) as total FROM medinfo WHERE 1=1';
    const params: any[] = [];
    const countParams: any[] = [];

    // Eğer filtrelerde isim varsa
    if (filters.name) {
      // Girilen değeri kontrol ediyoruz, rakam mı, isim mi yoksa isim soyisim mi
      const nameParts = filters.name.trim().split(' ');

      // Eğer girilen değer sadece rakamlardan oluşuyorsa TCNO'da arama yap
      if (/^\d+$/.test(filters.name)) {
        query += ' AND tc = ?';
        countQuery += ' AND tc = ?';
        params.push(filters.name);
        countParams.push(filters.name);
      } 
      // Eğer "isim soyisim" girilmişse
      else if (nameParts.length === 2) {
        const [firstName, lastName] = nameParts;
        query += ' AND name = ? AND surname = ?';
        countQuery += ' AND name = ? AND surname = ?';
        params.push(`${firstName}`, `${lastName}`);
        countParams.push(`${firstName}`, `${lastName}`);
      } 
      // Sadece isim girilmişse
      else {
        query += ' AND name = ?';
        countQuery += ' AND name = ?';
        params.push(`${filters.name}`);
        countParams.push(`${filters.name}`);
      }
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
