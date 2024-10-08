'use client';  
import { useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

const SearchFilter = () => {
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  const formRef = useRef<HTMLFormElement | null>(null);
  const toggleAdvancedFilters = () => {
    setIsAdvancedOpen(prevState => {
        return !prevState;
    });
  };


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formRef.current) {
      // Access form values using formRef and input names
      const formData = {
        startDate: formRef.current['startDate'].value,
        endDate: formRef.current['endDate'].value,
        birthPlace: formRef.current['birthPlace'].value,
        motherName: formRef.current['motherName'].value,
        fatherName: formRef.current['fatherName'].value
      };

      console.log("Form Data Submitted: ", formData);

      // Process formData further or send it to a backend
    }
  };

  return (
    <div className="w-full max-w-4xl mb-8 mt-8">
      {/* Search Bar and Advanced Filters on the Same Row */}
      <div className="flex items-center mb-6">
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
         <div className="mt-4 p-3 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg">
         <h2 className="text-base font-medium mb-2">Gelişmiş Filtreler</h2>
   
         {/* Form Element */}
         <form ref={formRef} onSubmit={handleSubmit}>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
             {/* Date Range Filter */}
             <div className="col-span-2 grid grid-cols-1 md:grid-cols-2 gap-3">
               <div>
                 <label className="block text-xs mb-1">Doğum Tarihi Başlangıç</label>
                 <input
                   type="date"
                   name="startDate"
                   className="w-full p-1 border border-gray-300 dark:border-gray-600 rounded-md bg-background text-foreground text-sm"
                 />
               </div>
               <div>
                 <label className="block text-xs mb-1">Doğum Tarihi Bitiş</label>
                 <input
                   type="date"
                   name="endDate"
                   className="w-full p-1 border border-gray-300 dark:border-gray-600 rounded-md bg-background text-foreground text-sm"
                 />
               </div>
             </div>
   
             {/* Birth Place (Combo Box) */}
             <div>
               <label className="block text-xs mb-1">Doğum Yeri</label>
               <select
                 name="birthPlace"
                 className="w-full p-1 border border-gray-300 dark:border-gray-600 rounded-md bg-background text-foreground text-sm"
               >
                 <option value="">Seçiniz</option>
                 <option value="İstanbul">İstanbul</option>
                 <option value="Ankara">Ankara</option>
                 <option value="İzmir">İzmir</option>
                 <option value="Bursa">Bursa</option>
                 {/* Diğer şehirler eklenebilir */}
               </select>
             </div>
   
             {/* Mother and Father Names */}
             <div>
               <label className="block text-xs mb-1">Anne Adı</label>
               <input
                 type="text"
                 name="motherName"
                 placeholder="Anne Adı"
                 className="w-full p-1 border border-gray-300 dark:border-gray-600 rounded-md bg-background text-foreground text-sm"
               />
             </div>
             <div>
               <label className="block text-xs mb-1">Baba Adı</label>
               <input
                 type="text"
                 name="fatherName"
                 placeholder="Baba Adı"
                 className="w-full p-1 border border-gray-300 dark:border-gray-600 rounded-md bg-background text-foreground text-sm"
               />
             </div>
           </div>
   
           {/* Submit Button */}
           <div className="flex justify-end mt-3">
             <button
               type="submit"
               className="px-3 py-1 bg-blue-500 text-white rounded-md text-sm"
             >
               Filtrele
             </button>
           </div>
         </form>
       </div>
      
      )}
    </div>
  );
};

export default SearchFilter;
