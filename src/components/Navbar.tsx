import { BsAsterisk } from "react-icons/bs";
import { Link } from "react-router-dom";
import { LuGithub } from "react-icons/lu";
import { Star } from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";

interface GitHub_Star {
  stargazers_count: number;
}

const Navbar = () => {
  const [stars, setStars] = useState<number | null>(null);

  useEffect(() => {
    const fetchStars = async () => {
      try {
        const response = await axios.get<GitHub_Star>(
          `https://api.github.com/repos/SandeepSuthar169/Orepo`
        );
        
        setStars(response.data.stargazers_count);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error("Axios error:", error.message);
        } else {
          console.error("Unexpected error:", error);
        }
      }
    };

    fetchStars();
  }, []);

  return (
    <nav className="fixed left-0 right-0 z-50 flex w-full items-center justify-center">
      <div className="relative flex items-center justify-between px-1 w-full sm:backdrop-blur-sm shadow-dropdown">
        
        <div className="flex items-center gap-2 rounded-xl py-1 transition-colors duration-300 left-1 pl-16">
          <Link to="/" className="m-1.5 p-1.5 flex gap-2 items-center">
            <BsAsterisk className="text-2x sm:text-2xl text-rose-400 font-bold" />
            <span className="font-bold text-shadow-lg sm:text-xl text-gray-800">
              Orepo
            </span>
          </Link>
        </div>

        <div className="flex items-center justify-between gap-2 sm:gap-6 font-medium text-sm pr-16">
          <Link 
            to="https://github.com/SandeepSuthar169/Orepo"
            className="flex items-center justify-between " 
            >
            <button className="flex items-center gap-1.5 p-1.5 m-1 sm:m-1.5">
              <LuGithub className="text-gray-700 fill-gray-300 transition-colors text-lg sm:text-xl" />
              <span className="hidden sm:inline text-gray-800 font-bold gap-1 shadow-gray-100">
                 {stars !== null ? stars : "---"} 
              </span>
              <Star className="text-[#ffd700] shadow-2xl shadow-amber-100 fill-[#ffe96f] transition-colors text-lg sm:text-xl"/>
            </button>
          </Link>
        </div>
        
      </div>
    </nav>
  );
};

export default Navbar;