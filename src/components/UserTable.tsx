import { FC } from "react";
import Pagination from "./Pagination";

interface UserTableProps {
  userData: User[];
  totalPages: number;
  totalUser: number;
  currentPage: number;
  onPageChange: (page: number) => void; // Sayfa değişikliklerinde tetiklenen fonksiyon
}

const UserTable: FC<UserTableProps> = ({
  userData,
  totalPages,
  totalUser,
  currentPage,
  onPageChange,
}) => {
  // Sayfa değişikliklerini tetikleyen fonksiyon
  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      onPageChange(newPage); // Parent bileşene sayfa değişimini bildiriyoruz
    }
  };

  const formatDate = (dateString: string): string => {
    const [day, month, year] = dateString.split(".");
    return `${year}-${month}-${day}`;
  };

  return (
    <div className="w-full max-w-4xl overflow-x-auto">
      <table className="min-w-full table-auto border-collapse border border-gray-200 dark:border-gray-700  ">
        <thead className="bg-base-100 text-base-content">
          <tr>
            <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">
              Tc
            </th>
            <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">
              Adı
            </th>
            <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">
              Soyadı
            </th>
            <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">
              Doğum Tarihi
            </th>
            <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">
              Anne Adı
            </th>
            <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">
              Baba Adı
            </th>
            <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">
              Nüfus İl
            </th>
            <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">
              Nüfus İlçe
            </th>
          </tr>
        </thead>
        <tbody>
          {userData.length > 0 ? (
            userData.map((user) => (
              <tr key={user.tc}>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                  {user.tc}
                </td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                  {user.name}
                </td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                  {user.surname}
                </td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                  {new Date(formatDate(user.birthDate)).toLocaleDateString()}
                </td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                  {user.nameOfMother}
                </td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                  {user.nameOfFather}
                </td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                  {user.city}
                </td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                  {user.county}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={8} className="text-center py-4">
                Veri bulunamadı
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination Kontrolleri */}
      {totalPages > 1 && (
        <Pagination
        totalItems={totalUser}
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
      )}
    </div>
  );
};

export default UserTable;
