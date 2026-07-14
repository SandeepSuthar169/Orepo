import { Bot, CloudSync, Database, LaptopMinimal, Server, Smartphone, SquareChevronLeft, ChevronDown, SquareChevronRight, type LucideIcon } from 'lucide-react';
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
        { id: 'go', label: 'GO' },
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
        { id: 'android', label: 'Android Dev' },
        { id: 'ios', label: 'iOS Dev' },
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
        { id: 'ci-cd', label: 'CI-CD' },
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
      ]
    },
  ];

  return (
    <section className={`relative border mt-11 border-gray-200 h-full transition-all duration-300 bg-white text-gray-700 p-3 shrink-0 rounded-lg shadow-sm overflow-y-auto ${isOpen ? "w-60" : "w-16"}`}>

      <div className='px-1 cursor-pointer flex items-center justify-between'>
        <h1 className={`font-bold overflow-hidden transition-all duration-300 text-lg text-nowrap text-taupe-800 ${isOpen ? "opacity-100" : "opacity-0 w-0"}`}>
          Dashboard
        </h1>

        <button
          onClick={() => setIsOpen?.(!isOpen)}
          className='hover:bg-gray-100 p-2 cursor-pointer rounded-lg items-center justify-center transition-colors'
        >
          {isOpen ? <SquareChevronLeft size={20} strokeWidth={2.1} /> : <SquareChevronRight size={20} strokeWidth={2.1} />}
        </button>
      </div>

      <div className={`mt-6`}>
        {BarItems.map((j) => (
          <div key={j.title}>
            <div
              className='px-2 py-2 hover:bg-gray-100 transition-colors duration-100 rounded-md cursor-pointer flex items-center justify-between'
              onClick={() => j.hasDropdown && isOpen && setActiveDropdown(activeDropdown === j.title ? "" : j.title)}
            >
              <div className='flex items-center justify-between'>
                <j.icon size={19} strokeWidth={2.1} className="text-gray-700" />
                <span className={`ml-4 whitespace-nowrap overflow-hidden transition-all duration-300 ${isOpen ? 'w-32 opacity-100' : 'w-0 opacity-0'}`}>
                  {j.title}
                </span>
              </div>
              {j.hasDropdown && isOpen && (
                <ChevronDown
                  size={16}
                  strokeWidth={2.5}
                  className={`transition-transform duration-200 text-gray-500 ${activeDropdown === j.title ? 'rotate-180' : ''}`}
                />
              )}
            </div>
            {j.hasDropdown && isOpen && activeDropdown === j.title && (
              <div className="bg-gray-50/50 overflow-hidden transition-all border-gray-200 ml-2 mt-1 space-y-1 border-l-2 pl-2 duration-200">
                {j.available_topics.map((t) => (
                  <div 
                  className='hover:bg-gray-100 transition-colors duration-100 rounded-md'>
                    <button 
                      key={t.id} 
                      onClick={() => setTopic(t.id)}
                      className="px-7 py-1.5 text-gray-600 w-full text-left cursor-pointer text-sm font-medium">
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
  );
};

export default Sidebar;