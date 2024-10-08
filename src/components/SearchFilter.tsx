'use client';  
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

const SearchFilter = () => {
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);

  const toggleAdvancedFilters = () => {
    setIsAdvancedOpen(prevState => {
        return !prevState;
    });
  };

  return (
    <div className="w-full max-w-4xl mb-8">
      {/* Search Bar and Advanced Filters on the Same Row */}
      <div className="flex items-center  mb-6">
        {/* Search Input and Button */}
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="TCNO/Ad/Soyad"
            className="border border-gray-400 dark:border-gray-600 p-2 rounded-md w-64 h-10 bg-background text-foreground"
          />
          <button className="px-4 py-2 h-10 rounded-md bg-background text-foreground border border-gray-400 dark:border-gray-600">
            Ara
          </button>
        </div>
        <div className="ml-auto">
          <button
            onClick={toggleAdvancedFilters}
            className="text-blue-500 hover:text-blue-700 flex items-center space-x-2"
          >
            <span>Gelişmiş Arama</span>
            <FontAwesomeIcon icon={isAdvancedOpen ? faChevronUp : faChevronDown} />
          </button>
        </div>
      </div>

      {/* Collapsible Advanced Filters (Display if Open) */}
      {isAdvancedOpen && (
        <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Gelişmiş Filtreler</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-2">Doğum Tarihi</label>
              <input
                type="date"
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-background text-foreground"
              />
            </div>
            <div>
              <label className="block text-sm mb-2">Doğum Yeri</label>
              <input
                type="text"
                placeholder="Doğum Yeri"
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-background text-foreground"
              />
            </div>
            <div>
              <label className="block text-sm mb-2">Anne Adı</label>
              <input
                type="text"
                placeholder="Anne Adı"
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-background text-foreground"
              />
            </div>
            <div>
              <label className="block text-sm mb-2">Baba Adı</label>
              <input
                type="text"
                placeholder="Baba Adı"
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-background text-foreground"
              />
            </div>
          </div>
          <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md">
            Filtrele
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchFilter;
