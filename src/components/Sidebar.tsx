import { Bot, CloudSync, Database, LaptopMinimal, Server, Smartphone, SquareChevronLeft,ChevronDown , SquareChevronRight, type LucideIcon } from 'lucide-react';
import { useState, type Dispatch, type SetStateAction } from 'react';

interface OpenProps {
  isOpen: boolean
  setIsOpen?: Dispatch<SetStateAction<boolean>>
}

interface BarTypes {
  title: string;
  icon: LucideIcon;
  hasDropdown?: boolean;
  dropdownItems: string[];
}


const Sidebar = ({ isOpen, setIsOpen }: OpenProps) => {

  const [activeDropdown, setActiveDropdown] = useState<string>("")

  const BarItems: BarTypes[] = [
    { 
      title: "AI", 
      icon: Bot, 
      hasDropdown: true, 
      dropdownItems: ["Machine Learning", "Deep Learning", "Data Science", "LLM", "Computer Vision", "NLP"] 
      
    },
    { 
      title: "Frontend", 
      icon: LaptopMinimal,
      hasDropdown: true, 
      dropdownItems: ["React", "Vue.js", "Angular", "TypeScript", "Next.js", "Tailwind CSS"] 
    },
    { 
      title: "Backend", 
      icon: Server, 
      hasDropdown: true, 
      dropdownItems: ["Node.js", "Django", "GO", "Rust", "Spring Boot", "Laravel"] 
    },
    { 
      title: "Mobile Dev", 
      icon: Smartphone, 
      hasDropdown: true, 
      dropdownItems: ["Flutter", "React Native", "GSwift", "Android Development", "iOS Development"] 
    },
    { 
      title: "DevOps", 
      icon: CloudSync, 
      hasDropdown: true, 
      dropdownItems: ["Docker", "Kubernetes", "Terraform", "CI/CD"] 
    },
    { 
      title: "Databases", 
      icon: Database, 
      hasDropdown: true, 
      dropdownItems: ["PostgreSQL", "Redis", "MongoDB", "MySQL"] 
    },
  ]

  return (
    <>
      <section className={`left-0 top-0 h-screen  mt-12   transition-all duration-300  inset-y-0 absolute bg-[#F5F5F5] text-gray-700 p-4  
         ${isOpen ? "w-64" : "w-16"}`}>
        
        <div className='px-1  cursor-pointer flex items-center justify-between '>
          <h1 className={`font-bold overflow-hidden transition-all duration-300 text-lg text-nowrap text-taupe-800 
            ${isOpen ? "opacity-100" : "opacity-0"}`}>
            Dashboard
          </h1>
        
          <button
            onClick={() => setIsOpen?.(!isOpen)}
            className='hover:bg-gray-100 p-2 rounded-lg items-center justify-center'
          >
            {isOpen ? <SquareChevronLeft size={20} strokeWidth={2.5} /> : <SquareChevronRight size={20} strokeWidth={2.5} />}
          </button>
        </div>

        <div className={`mt-6`}>
          {BarItems.map((j) => (
            <div key={j.title}>
              <div 
                className='px-1 py-2  hover:bg-gray-200 hover:duration-100 rounded-sm cursor-pointer flex items-center justify-between '
                onClick={() => j.hasDropdown && isOpen && setActiveDropdown(activeDropdown === j.title ? "" : j.title)}  
              >
                  <div className='flex items-center justify-between'>
                    <j.icon size={19} strokeWidth={1.5} color='#000' />                   {/* icons layser  */}
                    <span className={`ml-4 whitespace-normal overflow-hidden transition-all duration-300 
                      ${isOpen ? 'w-32 opacity-100' : 'w-0 opacity-0'}`}>     
                        {
                          j.title
                        }                                                                   {/* title layser  */}
                    </span>
                  </div>
                  {
                    j.hasDropdown && isOpen && (
                        <ChevronDown  
                            size={16}
                            strokeWidth={2.5}
                            className={`transition-transform duration-200
                                      ${activeDropdown === j.title ? 'rotate-180' : ''}`}
                        />
                    )
                  }
              </div>
              {
                j.hasDropdown && isOpen && activeDropdown === j.title && (
                  <div className="bg-[#F5F5F5] overflow-hidden transition-all duration-200">
                    {j.dropdownItems.map((item) => (
                      <div
                        key={item}                                                       
                        className="px-11 py-2 text-black  hover:bg-gray-200 cursor-pointer text-sm rounded-sm hover:duration-100"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                ) 
              }
            </div>
          ))} 
        </div>
      </section>
    </>

  )
}

export default Sidebar 