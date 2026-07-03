import { BsAsterisk } from "react-icons/bs";
import { Link } from "react-router-dom";
import { TiStarFullOutline } from "react-icons/ti";
import { LuGithub } from "react-icons/lu";

const Navbar = () => {
  return (
    <nav className="fixed left-0 right-0 z-50 mx-auto flex w-full items-center justify-center top-3">
      <div className=" relative flex items-center justify-between px-1 w-full max-w-114.5 sm:max-w-259.75 mx-3.5 rounded-2xl bg-gray-50 sm:bg-gray-300/50 sm:backdrop-blur-sm shadow-dropdown ">

      <div className=" flex items-center gap-2 rounded-xl py-0.5 transition-colors duration-300 left-1 px-2">
        <Link to="/"  className="m-1.5 p-1.5 flex gap-2 items-center">
          <BsAsterisk  className="text-xl sm:text-2xl text-rose-400 font-bold " />
            <span className="font-bold text-lg sm:text-xl text-gray-800">Opel</span>
        </Link>
      </div>

      <div className="flex items-center justify-between gap-2 sm:gap-6 font-medium text-sm">
        <div className="flex items-center border-0">
          <button className="bg-zinc-900 flex items-center gap-0 sm:gap-2 border border-zinc-800 hover:bg-zinc-800 text-white px-2.5 sm:px-3 py-2 rounded-full transition-colors">
            <TiStarFullOutline  className="text-amber-400 text-lg sm:text-xl "/>
            <span className="hidden sm:inline">Feedback</span>
          </button>
        </div>
        <div className="flex items-center">
          <button className="flex items-center gap-1.5 p-1.5 m-1 sm:m-1.5 ">
            <LuGithub  className="text-gray-900 text-lg sm:text-xl "/>
            <span className="hidden sm:inline text-gray-800 font-bold shadow-gray-100">GitHub</span> 
          </button>
        </div>

      </div>
      </div>

    </nav>
  )
}

export default Navbar