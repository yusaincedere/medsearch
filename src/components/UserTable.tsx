
// Mock data
const mockUsers = [
  { tcNo: 1, name: 'John',surname:'Doe', birthDate: new Date(), nameOfMother: 'X123',nameOfFather: 'X123',birthPlace:"İstanbul"},
  { tcNo: 2, name: 'Jane',surname:'Smith', birthDate: new Date(), nameOfMother: 'X456' ,nameOfFather: 'X123',birthPlace:"İstanbul"},
  { tcNo: 3, name: 'Alex',surname:'Johnson', birthDate: new Date(), nameOfMother: 'X789' ,nameOfFather: 'X123',birthPlace:"İstanbul"},
  { tcNo: 4, name: 'Emma',surname:'Watson', birthDate: new Date(), nameOfMother: 'X101',nameOfFather: 'X123',birthPlace:"İstanbul" },
  // Add more mock data as needed
];

const UserTable = () => {
  return (
    <div className="w-full max-w-4xl overflow-x-auto">
      <table className="min-w-full table-auto border-collapse border border-gray-200 dark:border-gray-700">
        <thead className="bg-base-100 text-base-content">
          <tr>
            <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">Tc</th>
            <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">Ad</th>
            <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">Soyad</th>
            <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">Doğum Tarihi</th>
            <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">Anne Adı</th>
            <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">Baba Adı</th>
            <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left">Doğum Yeri</th>
          </tr>
        </thead>
        <tbody>
          {mockUsers.map((user) => (
            <tr key={user.tcNo} className="bg-base-100 dark:bg-gray-800">
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">{user.tcNo}</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">{user.name}</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">{user.surname}</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">{user.birthDate.toLocaleDateString()}</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">{user.nameOfMother}</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">{user.nameOfFather}</td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">{user.birthPlace}</td>


            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
