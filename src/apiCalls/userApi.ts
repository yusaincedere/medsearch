import axios from "axios";
import { DbUserRow } from "@/types/dnbUserRow";
import { UserFilter } from "@/types/filters";

export const mapDbToUserArray = (dbRows: DbUserRow[]): User[] => {
  return dbRows.map((dbRow: DbUserRow) => ({
    tc: dbRow.TC,
    name: dbRow.NAME,
    surname: dbRow.SURNAME,
    birthDate: dbRow.BIRTHDATE,
    nameOfMother: dbRow.MOTHERNAME,
    nameOfFather: dbRow.FATHERNAME,
    fatherTC: dbRow.FATHERTC,
    motherTC: dbRow.MOTHERTC,
    city: dbRow.CITY,
    county: dbRow.COUNTY,
  }));
};

// Veritabanından kullanıcı verilerini çekmek için ortak fonksiyon
export const getUsers = async (filters: UserFilter, page: number, limit: number) => {
  try {
    const response = await axios.post("/api/users", {
      page,
      limit,
      filters,
    });

    if (response?.data?.data) {
      const users = mapDbToUserArray(response.data.data);
      const { totalPages, total } = response.data.pagination;
      return { users, totalPages, total };
    }
    return { users: [], totalPages: 0, total: 0 };
  } catch (error) {
    console.error("API request failed", error);
    return { users: [], totalPages: 0, total: 0 };
  }
};