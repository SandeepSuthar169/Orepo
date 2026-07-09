import { House } from 'lucide-react';
import { FiSidebar } from "react-icons/fi";

// interface OpenProps {
//   isPoen: string
//   setIsOpen: boolean
// }


const Sidebar = () => {
  return (
    <>
      <section className="left-0 top-0 h-screen w-64 mt-12   inset-y-0 absolute bg-gray-50 text-gray-700 p-4">
          <header className='flex gap-2 items-center  hover:bg-gray-200 px-2 py-3 rounded-xl'>
              <House className='text-gray-800 text-sm' />
              <h3 className=' text-sm text-gray-800 font-semibold'>Home</h3>
              <FiSidebar  className='text-gray-950 ml-24 text-2xl'/>
          </header>
          
          <main className=''>

          </main>
      </section>
      </>

  )
}

export default Sidebar