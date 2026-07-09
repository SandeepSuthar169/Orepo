import { Bot, CloudSync, Database, House, LaptopMinimal, Server, Smartphone, SquareChevronLeft, SquareChevronRight, type LucideIcon } from 'lucide-react';
import { useState, type Dispatch, type SetStateAction } from 'react';

interface OpenProps {
  isOpen: boolean
  setIsOpen?: Dispatch<SetStateAction<boolean>>
}

interface OpenProps {
  activeDropdown: string
  setActiveDropdown: string
}


interface BarTypes {
  title: string;
  icon: LucideIcon;
  hasDropdown?: boolean;
  dropdownItems?: string[];
}


const Sidebar = ({ isOpen, setIsOpen }: OpenProps) => {

  const [activeDropdown, setActiveDropdown] = useState<string>("")

  const BarItems: BarTypes[] = [
    { title: "Home", icon: House, },
    { title: "Artificial Intelligence", icon: Bot, hasDropdown: true, dropdownItems: ["Machine Learning", "Deep Learning", "Data Science", "LLM", "Computer Vision", "NLP"] },
    { title: "Frontend", icon: LaptopMinimal, hasDropdown: true, dropdownItems: ["React", "Vue.js", "Angular", "TypeScript", "Next.js", "Tailwind CSS"] },
    { title: "Backend", icon: Server, hasDropdown: true, dropdownItems: ["Node.js", "Django", "GO", "Rust", "Spring Boot", "Laravel"] },
    { title: "Mobile Dev", icon: Smartphone, hasDropdown: true, dropdownItems: ["Flutter", "React Native", "GSwift", "Android Development", "iOS Development"] },
    { title: "DevOps", icon: CloudSync, hasDropdown: true, dropdownItems: ["Docker", "Kubernetes", "Terraform", "CI/CD"] },
    { title: "Databases", icon: Database, hasDropdown: true, dropdownItems: ["PostgreSQL", "Redis", "MongoDB", "MySQL"] },



  ]

  return (
    <>
      <section className={`left-0 top-0 h-screen  mt-12  ${isOpen ? "w-64" : "w-16"} transition-all duration-300  inset-y-0 absolute bg-gray-50 text-gray-700 p-4`}>
        <div className='p-4 flex justify-center  items-center duration-300'>
          <h3 className={`font-bold overflow-hidden transition-all duration-300 text-lg text-nowrap text-taupe-800 ${isOpen ? "opacity-100" : "opacity-0"}`}>
            Dashboard
          </h3>
          <button
            onClick={() => setIsOpen?.(!isOpen)}
            className='hover:bg-gray-100 p-2 rounded-lg font-bold '
          >{isOpen ? <SquareChevronRight size={20} strokeWidth={1.5} /> : <SquareChevronLeft size={20} strokeWidth={1.5} />}</button>
        </div>

        <div className={`mt-6`}>
          {BarItems.map((j) => (
            <div key={j.title}>
              <div 
                className='px-4 py-3  hover:bg-gray-200 cursor-pointer flex items-center justify-center'
                onClick={() => j.hasDropdown && isOpen && setActiveDropdown(activeDropdown === j.title ? "" : j.title)}  
              >
                  
              </div> 
            </div>
          ))}
        </div>
      </section>
    </>

  )
}

export default Sidebar