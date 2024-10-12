"use client";
import { useState } from "react";
import SearchFilter from "@/components/SearchFilter";
import UserTable from "@/components/UserTable";

// User tipini tanımlıyoruz


export default function Home() {
  // Arama sonuçları state'i (User tipini kullanıyoruz)
  const [results, setResults] = useState<User[]>([]); // Arama sonuçları
  const [currentPage, setCurrentPage] = useState<number>(1); // Mevcut sayfa
  const [totalPages, setTotalPages] = useState<number>(1); // Toplam sayfa sayısı

  // Arama bileşeninden gelen verileri işlemek için callback fonksiyonu
  const handleSearchResults = (data: User[], page: number, totalPages: number) => {
    setResults(data);
    setCurrentPage(page);
    setTotalPages(totalPages);
  };

  // Sayfa değişikliği işlemi
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground">
      <h1 className="text-5xl font-bold mb-6">MedSearch</h1>
      <SearchFilter onSearch={handleSearchResults} currentPage={currentPage} />
      <UserTable
        userData={results}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
