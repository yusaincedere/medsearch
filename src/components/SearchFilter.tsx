"use client";
import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { getCityList } from "../apiCalls/ExternalApi";
import { DbUserRow } from "@/types/dnbUserRow";

type City = {
  id: number;
  name: string;
};

interface SearchFilterProps {
  onSearch: (data: User[], page: number, totalPages: number) => void;
  currentPage: number;
}

const SearchFilter: React.FC<SearchFilterProps> = ({ onSearch, currentPage }) => {
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  const [cityList, setCityList] = useState<City[]>([]);
  const formRef = useRef<HTMLFormElement | null>(null);
  const [loading, setLoading] = useState(false);

  const toggleAdvancedFilters = () => {
    setIsAdvancedOpen((prevState) => !prevState);
  };

  useEffect(() => {
    fetchCities();
  }, []);

  const fetchCities = async () => {
    try {
      const cityData = await getCityList();
      setCityList(cityData.data); // Şehir verilerini state'e set et
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  // Arama işlemi (basit arama veya gelişmiş arama için form submit)
  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formRef.current) {
      setLoading(true);

      const formData = {
        tc: formRef.current["tc"]?.value, // TC Kimlik No için alan
        name: formRef.current["nameInput"]?.value, // İsim alanı
        surname: formRef.current["surname"]?.value, // Soyisim alanı
        startDate: formRef.current["startDate"]?.value,
        endDate: formRef.current["endDate"]?.value,
        city: formRef.current["city"]?.value,
        motherName: formRef.current["motherName"]?.value,
        fatherName: formRef.current["fatherName"]?.value,
      };

      try {
        // API çağrısı ile verileri getiriyoruz
        const response = await axios.post("/api/users", {
          page: currentPage,
          limit: 10,
          filters: {
            tc: formData.tc, // TC No'ya göre filtreleme
            name: formData.name, // İsme göre filtreleme
            surname: formData.surname, // Soyisme göre filtreleme
            startDate: formData.startDate,
            endDate: formData.endDate,
            city: formData.city,
            motherName: formData.motherName,
            fatherName: formData.fatherName,
          },
        });

        if (response?.data?.data) {
          const users: User[] = mapDbToUserArray(response?.data?.data);
          onSearch(users, currentPage, response.data.pagination?.totalPages);
        }
        console.log("Search Results:", response.data);
      } catch (error) {
        console.error("Search Error:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const mapDbToUser = (dbRow: DbUserRow): User => {
    return {
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
    };
  };

  const mapDbToUserArray = (dbRows: DbUserRow[]): User[] => {
    return dbRows.map(mapDbToUser);
  };

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

        <div className="flex justify-end">
          <button
            className="px-4 py-2 h-10 rounded-md bg-background text-foreground border border-gray-400 dark:border-gray-600"
            type="submit"
          >
            {loading ? "Ara..." : "Ara"}
          </button>
        </div>

        {/* Gelişmiş Arama Filtreleri (collapse yapısı) */}
        {isAdvancedOpen && (
          <div className="mt-4 p-3 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg">
            <h2 className="text-base font-medium mb-2">Gelişmiş Filtreler</h2>

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

            {/* Filtreleme Butonu */}
            <div className="flex justify-end mt-3">
              <button
                type="submit"
                className="px-3 py-1 bg-blue-500 text-white rounded-md text-sm"
              >
                {loading ? "Filtrele..." : "Filtrele"}
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default SearchFilter;
