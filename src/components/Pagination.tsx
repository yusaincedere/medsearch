import { FC } from 'react';
import { FaChevronLeft, FaChevronRight, FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  totalItems: number; // Toplam veri sayısı
  onPageChange: (page: number) => void;
}

const Pagination: FC<PaginationProps> = ({ totalPages, currentPage, totalItems, onPageChange }) => {
  const pageNumbers = [];
  
  // Sayfa numaralarını dolduruyoruz
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      onPageChange(newPage);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-3 mt-4">
      {/* Toplam veri sayısı */}
      <div className="text-gray-700 dark:text-gray-300">
        Toplam Kayıt: <span className="font-bold">{totalItems}</span>
      </div>

      {/* Pagination kontrolleri */}
      <div className="flex items-center space-x-1">
        {/* İlk Sayfa Butonu */}
        <button
          onClick={() => handlePageChange(1)}
          className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded"
          disabled={currentPage === 1}
        >
          <FaAngleDoubleLeft />
        </button>

        {/* Önceki Sayfa Butonu */}
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded"
          disabled={currentPage === 1}
        >
          <FaChevronLeft />
        </button>

        {/* Sayfa Numaraları */}
        {pageNumbers.slice(Math.max(0, currentPage - 3), Math.min(currentPage + 2, totalPages)).map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => handlePageChange(pageNumber)}
            className={`px-3 py-1 rounded ${currentPage === pageNumber ? 'bg-blue-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}`}
          >
            {pageNumber}
          </button>
        ))}

        {/* Sonraki Sayfa Butonu */}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded"
          disabled={currentPage === totalPages}
        >
          <FaChevronRight />
        </button>

        {/* Son Sayfa Butonu */}
        <button
          onClick={() => handlePageChange(totalPages)}
          className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded"
          disabled={currentPage === totalPages}
        >
          <FaAngleDoubleRight />
        </button>
      </div>

      {/* Mevcut sayfa / toplam sayfa */}
      <div className="text-gray-700 dark:text-gray-300">
        Sayfa <span className="font-bold">{currentPage}</span> / <span className="font-bold">{totalPages}</span>
      </div>
    </div>
  );
};

export default Pagination;
