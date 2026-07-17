
import RepositoryTable from "@/components/RepositoryTable";
import Sidebar from "@/components/Sidebar";
import { useState, useEffect } from "react";

export const FullTable = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(true); 
      } else {
        setIsOpen(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="h-screen w-full flex flex-col md:flex-row bg-[#F3F5F7] pb-3 md:p-4 gap-2 md:gap-4 overflow-hidden relative">

      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      <main className="flex-1 w-full h-full overflow-hidden p-3 md:p-0 flex flex-col">
        <RepositoryTable />
      </main>
      
    </div>
  );
};