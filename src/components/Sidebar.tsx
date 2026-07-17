import { 
  Bot, 
  CloudSync, 
  Database, 
  LaptopMinimal, 
  Server, 
  Smartphone,  
  ChevronDown, 
  PanelLeft, 
  type LucideIcon 
} from 'lucide-react';
import { TbLayoutSidebarRightFilled } from "react-icons/tb";

import { useState, type Dispatch, type SetStateAction } from 'react';
import { useRepoStore } from '../store/useRepositoryStore';

interface OpenProps {
  isOpen: boolean;
  setIsOpen?: Dispatch<SetStateAction<boolean>>;
}

interface Topic {
  id: string;
  label: string;
}

interface BarTypes {
  title: string;
  icon: LucideIcon;
  hasDropdown?: boolean;
  available_topics: Topic[];
}

const Sidebar = ({ isOpen, setIsOpen }: OpenProps) => {

  const [activeDropdown, setActiveDropdown] = useState<string>("");
  const { setTopic } = useRepoStore();

  const BarItems: BarTypes[] = [
    {
      title: "AI",
      icon: Bot,
      hasDropdown: true,
      available_topics: [
        { id: 'machine-learning', label: 'Machine Learning' },
        { id: 'deep-learning', label: 'Deep Learning' },
        { id: 'data-science', label: 'Data Science' },
        { id: 'llm', label: 'LLM' },
        { id: 'computer-vision', label: 'Computer Vision' },
        { id: 'nlp', label: 'NLP' },
      ]
    },
    {
      title: "Frontend",
      icon: LaptopMinimal,
      hasDropdown: true,
      available_topics: [
        { id: 'react', label: 'React.js' },
        { id: 'vue', label: 'Vue.js' },
        { id: 'angular', label: 'Angular' },
        { id: 'typescript', label: 'TypeScript' },
        { id: 'nextjs', label: 'Next.js' },
        { id: 'tailwindcss', label: 'Tailwind CSS' },
      ]
    },
    {
      title: "Backend",
      icon: Server,
      hasDropdown: true,
      available_topics: [
        { id: 'nodejs', label: 'Node.js' },
        { id: 'django', label: 'Django' },
        { id: 'go', label: 'Go' },
        { id: 'rust', label: 'Rust' },
        { id: 'spring-boot', label: 'Spring Boot' },
        { id: 'laravel', label: 'Laravel' },
      ]
    },
    {
      title: "Mobile Dev",
      icon: Smartphone,
      hasDropdown: true,
      available_topics: [
        { id: 'flutter', label: 'Flutter' },
        { id: 'react-native', label: 'React Native' },
        { id: 'swift', label: 'Swift' },
        { id: 'swiftui', label: 'SwiftUI' },
        { id: 'android', label: 'Android Dev' },
        { id: 'kotlin', label: 'Kotlin' },
        { id: 'ionic', label: 'Ionic' },
      ]
    },
    {
      title: "DevOps",
      icon: CloudSync,
      hasDropdown: true,
      available_topics: [
        { id: 'docker', label: 'Docker' },
        { id: 'kubernetes', label: 'Kubernetes' },
        { id: 'terraform', label: 'Terraform' },
        { id: 'jenkins', label: 'Jenkins' },
        { id: 'grafana', label: 'Grafana' },
        { id: 'Ansible', label: 'Ansible' },
      ]
    },
    {
      title: "Databases",
      icon: Database,
      hasDropdown: true,
      available_topics: [
        { id: 'postgresql', label: 'PostgreSQL' },
        { id: 'redis', label: 'Redis' },
        { id: 'mongodb', label: 'MongoDB' },
        { id: 'mysql', label: 'MySQL' },
        { id: 'elasticsearch', label: 'Elasticsearch' },
        { id: 'supabase', label: 'Supabase' },
        { id: 'sqlite', label: 'SQLite' },
      ]
    },
  ];

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-40 md:hidden transition-opacity duration-300" 
          onClick={() => setIsOpen?.(false)} 
        />
      )}

      <section 
        className={`mt-11 h-9.8/10 bg-white text-gray-700 p-3 shrink-0 rounded-lg shadow-sm border  border-gray-100 overflow-y-auto transition-all duration-200 ease-in-out absolute z-50 md:relative
          ${isOpen ? "w-60 translate-x-0" : "-translate-x-full w-60 md:translate-x-0 md:w-16 "}
        `}
      >
        <div className={`px-1 cursor-pointer flex items-center ${isOpen ? 'justify-between' : 'justify-center'}`}>
          <h1 className={`font-bold overflow-hidden transition-all duration-300 text-lg text-nowrap text-taupe-800 ${isOpen ? "opacity-100 w-auto" : "opacity-0 w-0"}`}>
            Dashboard
          </h1>

          <button
            onClick={() => setIsOpen?.(!isOpen)}
            className='hover:bg-gray-100 p-2 cursor-pointer rounded-lg duration-600 flex items-center justify-center transition-colors shrink-0'
          >
            {isOpen ? <PanelLeft size={19} strokeWidth={2.1} /> : <TbLayoutSidebarRightFilled size={21} strokeWidth={1} />}
          </button>
        </div>

        <div className={`mt-6`}>
          {BarItems.map((j) => (
            <div key={j.title}>
              <div
                className={`px-2 py-2 hover:bg-gray-100 transition-colors duration-100 rounded-md cursor-pointer flex items-center ${isOpen ? 'justify-between' : 'justify-center'}`}
                onClick={() => j.hasDropdown && isOpen && setActiveDropdown(activeDropdown === j.title ? "" : j.title)}
              >
                <div className='flex items-center'>
                  <j.icon size={19} strokeWidth={2.1} className="text-gray-700 shrink-0" />
                  <span className={`whitespace-nowrap overflow-hidden transition-all duration-300 ${isOpen ? 'ml-4 w-32 opacity-100' : 'ml-0 w-0 opacity-0'}`}>
                    {j.title}
                  </span>
                </div>
                {j.hasDropdown && isOpen && (
                  <ChevronDown
                    size={16}
                    strokeWidth={2.5}
                    className={`transition-transform duration-200 shrink-0 text-gray-500 ${activeDropdown === j.title ? 'rotate-180' : ''}`}
                  />
                )}
              </div>

              {j.hasDropdown && isOpen && activeDropdown === j.title && (
                <div className="bg-white overflow-hidden transition-all border-gray-300 ml-3 space-y-1 border-l-2 pl-2 duration-200">
                  {j.available_topics.map((t) => (
                    <div 
                      key={t.id} 
                      className='hover:bg-gray-100 transition-colors duration-100 rounded-md'
                    >
                      <button 
                        onClick={() => setTopic(t.id)}
                        className="px-7 py-1.5 text-gray-600 w-full text-left cursor-pointer text-sm font-medium"
                      >
                        {t.label} 
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Sidebar;