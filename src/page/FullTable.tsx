import RepositoryTable from "@/components/RepositoryTable";
import Sidebar from "@/components/Sidebar";
import { useState } from "react";

export const FullTable = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  return (
    <div className="h-screen w-full mb-5  pb-3 flex bg-[#F3F5F7]  p-4 gap-4 overflow-hidden">
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      <RepositoryTable />
    </div>
  );
};