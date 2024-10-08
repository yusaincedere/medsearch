import SearchFilter from "@/components/SearchFilter";
import UserTable from "@/components/UserTable";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground">
      <h1 className="text-5xl font-bold mb-6">MedSearch</h1>
      <SearchFilter/>
      <UserTable/>
    </div>
  );
}
