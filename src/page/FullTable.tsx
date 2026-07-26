
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
    <div className="h-screen w-full  bg-[#F3F5F7] pb-2 py-3 px-1 gap-2.5  overflow-hidden flex relative">
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      <main className="flex-1 w-full h-full  overflow-hidden  flex flex-col rounded-xl">
        <RepositoryTable />
      </main>
    </div>
  );
};