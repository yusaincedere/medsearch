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

    console.log(filters);

    // TC filtreleme
    if (filters.tc && filters.tc.trim() !== "") {
      query += ' AND tc = ?';
      countQuery += ' AND tc = ?';
      params.push(filters.tc.trim()); // TC numarasını string olarak işliyoruz
      countParams.push(filters.tc.trim());
    }

    // İsim filtreleme
    if (filters.name && filters.name.trim() !== "") {
      query += ' AND name = ?';
      countQuery += ' AND name = ?';
      params.push(filters.name.trim());
      countParams.push(filters.name.trim());
    }

    // Soyisim filtreleme
    if (filters.surname && filters.surname.trim() !== "") {
      query += ' AND surname = ?';
      countQuery += ' AND surname = ?';
      params.push(filters.surname.trim());
      countParams.push(filters.surname.trim());
    }

    // Şehir filtreleme
    if (filters.city && filters.city.trim() !== "") {
      query += ' AND city = ?';
      countQuery += ' AND city = ?';
      params.push(filters.city.trim());
      countParams.push(filters.city.trim());
    }

    // Anne adı filtreleme
    if (filters.motherName && filters.motherName.trim() !== "") {
      query += ' AND motherName = ?';
      countQuery += ' AND motherName = ?';
      params.push(filters.motherName.trim());
      countParams.push(filters.motherName.trim());
    }

    // Baba adı filtreleme
    if (filters.fatherName && filters.fatherName.trim() !== "") {
      query += ' AND fatherName = ?';
      countQuery += ' AND fatherName = ?';
      params.push(filters.fatherName.trim());
      countParams.push(filters.fatherName.trim());
    }

    // Doğum tarihi aralığı (between)
    if (filters.birthDateStart && filters.birthDateEnd) {
      query += ' AND STR_TO_DATE(birthDate, "%d.%m.%Y") BETWEEN STR_TO_DATE(?, "%Y-%m-%d") AND STR_TO_DATE(?, "%Y-%m-%d")';
      countQuery += ' AND STR_TO_DATE(birthDate, "%d.%m.%Y") BETWEEN STR_TO_DATE(?, "%Y-%m-%d") AND STR_TO_DATE(?, "%Y-%m-%d")';
      params.push(filters.birthDateStart, filters.birthDateEnd);
      countParams.push(filters.birthDateStart, filters.birthDateEnd);
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
