import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground">
      <h1 className="text-5xl font-bold mb-6">MedSearch</h1>
      <p className="text-xl mb-4">Aramak için bilgileri girin</p>
      <div className="flex items-center space-x-2">
      <input
        type="text"
        placeholder="TCNO/Ad/Soyad"
        className="border border-gray-400 dark:border-gray-600 p-2 rounded-md w-64 mb-4 bg-background text-foreground"
      />
      <button className="px-4 py-2 rounded-md bg-background text-foreground border border-gray-400 dark:border-gray-600">
        Search
      </button>
      </div>
    </div>
  );
}
