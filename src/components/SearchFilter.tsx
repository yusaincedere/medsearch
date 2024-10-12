"use client";
import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp, faSearch } from "@fortawesome/free-solid-svg-icons";
import { getUsers } from "../apiCalls/userApi"; // Ortak Axios fonksiyonumuzu ekliyoruz
import { getCityList } from "@/apiCalls/ExternalApi";
import { City } from "@/types/city";
import { User } from "@/types/user";
import { UserFilter } from "@/types/filters";

interface SearchFilterProps {
  onSearch: (data: User[], page: number, totalPages: number, totalUser: number) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

const SearchFilter: React.FC<SearchFilterProps> = ({ onSearch, currentPage, setCurrentPage }) => {
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  const [cityList, setCityList] = useState<City[]>([]);
  const formRef = useRef<HTMLFormElement | null>(null);
  const [loading, setLoading] = useState(false);

  // Gelişmiş filtreleme alanını açıp kapatma fonksiyonu
  const toggleAdvancedFilters = () => {
    setIsAdvancedOpen((prevState) => !prevState);
  };

  // Şehir verilerini API'den çeken fonksiyon
  const fetchCities = async () => {
    try {
      const cityData = await getCityList();
      setCityList(cityData.data);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  useEffect(() => {
    fetchCities(); // Sayfa yüklendiğinde şehir verilerini alır
  }, []);

  // Ortak fonksiyonla API'den veri çekiyoruz (sayfa ve filtrelere göre)
  const fetchData = async (page: number) => {
    setLoading(true);
    if (formRef.current) {
      const formData :UserFilter = {
        tc: formRef.current["tc"]?.value || "", // TC Kimlik No'yu string olarak gönderiyoruz
        name: formRef.current["nameInput"]?.value || "",
        surname: formRef.current["surname"]?.value || "",
        birthDateStart: formRef.current["startDate"]?.value || "",
        birthDateEnd: formRef.current["endDate"]?.value || "",
        city: formRef.current["city"]?.value || "",
        motherName: formRef.current["motherName"]?.value || "",
        fatherName: formRef.current["fatherName"]?.value || "",
      };

      const filters = Object.fromEntries(Object.entries(formData).filter(([_, v]) => v !== ""));
      const { users, totalPages, total } = await getUsers(filters, page, 10); // Axios API fonksiyonu

      onSearch(users, page, totalPages, total);
    }
    setLoading(false);
  };

  // Arama formu submit olduğunda çalışacak
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCurrentPage(1); // Arama yaptığımızda sayfa 1'e dönüyoruz
    fetchData(1); // Arama yapıldığında 1. sayfayı çekiyoruz
  };

  // Sayfa numarası değiştiğinde yeni verileri çekmek için çalışacak
  useEffect(() => {
    if (currentPage > 0) {
      fetchData(currentPage); // Sayfa numarası her değiştiğinde verileri çek
    }
  }, [currentPage]);

  return (
    <div className="w-full max-w-4xl mb-8 mt-8">
      <form ref={formRef} onSubmit={handleSearch}>
        {/* Arama Inputları */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
          <div className="flex flex-col">
            <label className="block text-xs mb-1">TC Kimlik No</label>
            <input
              type="text"
              name="tc"
              placeholder="TC Kimlik No"
              className="border border-gray-400 dark:border-gray-600 p-2 rounded-md w-full bg-background text-foreground"
            />
          </div>
          <div className="flex flex-col">
            <label className="block text-xs mb-1">Ad</label>
            <input
              type="text"
              name="nameInput"
              placeholder="Ad"
              className="border border-gray-400 dark:border-gray-600 p-2 rounded-md w-full bg-background text-foreground"
            />
          </div>
          <div className="flex flex-col">
            <label className="block text-xs mb-1">Soyad</label>
            <input
              type="text"
              name="surname"
              placeholder="Soyad"
              className="border border-gray-400 dark:border-gray-600 p-2 rounded-md w-full bg-background text-foreground"
            />
          </div>
        </div>

        <div className="flex justify-between items-center">
          {/* Gelişmiş Arama İkonu */}
          <button
            type="button"
            onClick={toggleAdvancedFilters}
            className="text-blue-500 hover:text-blue-700 flex items-center"
          >
            <FontAwesomeIcon icon={isAdvancedOpen ? faChevronUp : faChevronDown} />
          </button>

          {/* Arama Butonu */}
          <button
            className="px-4 py-2 h-10 rounded-md bg-blue-500 text-white flex items-center"
            type="submit"
          >
            {loading ? (
              <span>Aranıyor...</span>
            ) : (
              <>
                <span>Ara</span>
                <FontAwesomeIcon icon={faSearch} className="ml-2" />
              </>
            )}
          </button>
        </div>

        {/* Gelişmiş Arama Filtreleri (collapse yapısı) */}
        {isAdvancedOpen && (
          <div className="mt-4 p-3 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg">
            <h2 className="text-base font-medium mb-2">Gelişmiş Filtreler</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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

              {/* City Filter */}
              <div>
                <label className="block text-xs mb-1">Nüfus İl</label>
                <select
                  name="city"
                  className="w-full p-1 border border-gray-300 dark:border-gray-600 rounded-md bg-background text-foreground text-sm"
                >
                  <option value="">Seçiniz</option>
                  {cityList?.map((city) => (
                    <option key={city.id} value={city.name}>
                      {city.name}
                    </option>
                  ))}
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
          </div>
        )}
      </form>
    </div>
  );
};

export default SearchFilter;
