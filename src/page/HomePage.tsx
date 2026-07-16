import Footer from "../components/Footer";
import { FiArrowUpRight } from "react-icons/fi";
import { Store  } from 'lucide-react';
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";


interface TextAreaType {
  number: number
  Paregrapgtext: string
  Span1: string
  Span2: string
  
}

const TextArea = ({number, Paregrapgtext, Span1, Span2}: TextAreaType) => {
    return (
      <div className="flex flex-col gap-3 items-start cursor-pointer group">
      <div className="flex gap-4">
        <h3 className="inline-flex items-center font-medium border box-content transition-colors focus:outline-none focus-visible:outline-none whitespace-nowrap bg-white text-gray-700 border-black/10 group-hover:text-gray-900 group-hover:border-black/20 h-6 px-2 gap-1.5 text-sm rounded-full">
          {number}
        </h3>
        <p className="font-semibold leading-6 text-gray-700 text-lg sm:text-xl mb-0">
          {Paregrapgtext}
        </p>
      </div>
      <div >
        <span className="block text-gray-700 text-sm sm:text-base font-normal mt-1">{Span1}</span>
        <span className="block text-gray-700 text-sm sm:text-base font-normal ">{Span2}</span>
      </div>
    </div>
    )
}




type FAQ = {
  question: string;
  answer: string;
};

const faqs: FAQ[] = [
  {
    question: "What exactly is Orepo?",
    answer: "Orepo is a free, open-source platform to help developers easily discover open-source projects on GitHub. Whether you are looking for your next contribution,",
  },
  {
    question: "Is Orepo completely free to use?",
    answer: "Yes. Screenshot Studio is 100% free with no hidden costs. Unlimited exports, all features, no watermarks. No signup required.",
  },
  {
    question: "How many projects are listed on the platform?",
    answer: "We currently feature a growing collection of over 1,700+ open-source projects.",
  },
  {
    question: "How do I find projects that match my tech stack?",
    answer: "Orepo organizes projects into multiple easy-to-navigate categories. You can filter our collection by specific technologies and topics—including TypeScript, npm, Databases, and many more—so you can find exactly what you want to work with.",
  },
  {
    question: "Do I need to create an account to search for projects? ",
    answer: "Yes. You can cancel your subscription at any time without any hidden fees.",
  },  
  {
    question: "Is Orepo itself open-source?",
    answer: "Yes, Orepo is proudly open-source. If you would like to help us build a better discovery tool for developers, you can find our repository on GitHub and contribute to the platform.",
  },  
];

const FAQSection = ()  => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="   bg-white py-10 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-black">
            Explore Common Questions
          </h2>
        </div>

        <div className="mx-auto mt-8 sm:mt-12 max-w-3xl space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-md"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 p-4 text-left"
                >
                  <span className="text-base sm:text-lg text-gray-800 font-semibold">
                    {faq.question}
                  </span>

                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-gray-500 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-4 sm:px-6 pb-6 text-gray-600">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>


      </div>
    </section>
  );
}


const HomePage = () => {
  return (
    <>
      <div 
        className="flex min-h-screen flex-col bg-white"
        style={{ colorScheme: 'light' }}
      >
                <main className="flex ">
          <section className="mx-auto min-h-screen w-full h-full">
            <img 
              src="src\assets\download.webp" 
              alt=""  
              className="mask-b-from-50%  absolute inset-0 h-full w-full select-none object-cover  "
              onContextMenu={(e) => e.preventDefault()} 
              onDragStart={(e) => e.preventDefault()}
            />

            <div className="relative flex min-h-dvh w-full">
              <div className="flex w-full items-center justify-center">
                <div className="z-10 flex w-full max-w-215.5 flex-col items-center justify-center gap-8  md:gap-12.5">
                  <div className="flex flex-col items-center gap-2 mb-1">
                      <h1 className="text-3xl font-jakarta font-semibold sm:text-3xl md:text-5xl  text-[#313131] text-center [text-shadow:0_2px_3px_rgb(75_85_99/10%)]">
                      Explore 3100+ open-source <br />
                      </h1>
                      <h1 className="text-3xl sm:text-3xl md:text-5xl font-bold text-[#313131] text-center [text-shadow:0_2px_3px_rgb(75_85_99/10%)]">
                      projects with <span className="text-rose-500 " >Orepo</span>   
                      </h1>
                  </div>

                  <div className="flex flex-col items-center gap-2 mb-1">
                    <p className="text-base md:text-2xl px-5 md:px-10 font-normal [text-shadow:0_2px_3px_rgb(75_85_99/10%)] text-white tracking-normal opacity-80 max-w-3xl text-center">
                    Search what you need and contribute to
                    </p>
                    <p className="text-base md:text-2xl px-0 [text-shadow:0_2px_3px_rgb(75_85_99/10%)] md:px-0 font-normal text-shadow-gray-600 text-white tracking-normal opacity-80 max-w-3xl text-center">
                    AI, Frontend, Databases, or TypeScript. <span className="text-black font-bold [text-shadow:0_2px_3px_rgb(75_85_99/30%)]">Your skills are needed!</span>
                    </p>
                  </div>
                  <div className="flex items-center gap-6 font-medium">
                    <Link to="/dashboard">
                      <button className="h-12 px-8 rounded-full bg-linear-to-b from-white to-gray-200 text-black font-semibold shadow-[0_4px_20px_rgba(59,130,246,0.4)] hover:shadow-[0_4px_25px_rgba(59,130,246,0.6)] hover:scale-105 transition-all duration-300">
                          Get Started
                      </button>
                    </Link>
            
                    <Link to="https://github.com/SandeepSuthar169/Orepo">
                      <button className="h-12 px-8 rounded-full border border-gray-950 bg-mist-800  text-white font-medium 0 transition-colors backdrop-blur-sm flex items-center gap-2 group">
                          Source
                          <FiArrowUpRight className="w-4 h-4 fill-white group-hover:scale-110 transition-transform" />
                      </button>
                    </Link>
                    
                  </div>
                </div>  
                
              </div>  
            </div>
            
            <div className="relative mx-auto w-[95%] sm:w-[90%] md:w-full max-w-7xl rounded-xl md:rounded-3xl  border-2 border-neutral-200 bg-white p-1  backdrop-blur-lg ">
              <div className="rounded-xl md:rounded-[20px] border-2 border-neutral-200 bg-white   md:p-2">
                <img 
                  src="src\assets\Screenshot 2026-07-15 112046.png" 
                  alt="Dashboard preview" 
                  className="rounded-lg md:rounded-2xl select-none w-full h-auto object-cover"
                  onContextMenu={(e) => e.preventDefault()} 
                  onDragStart={(e) => e.preventDefault()}
                />
              </div>
            </div>
          </section>
        </main>

        <div className="mx-auto flex w-full max-w-310 flex-col items-center gap-6 sm:gap-7 px-4 pb-16 sm:pb-20 pt-16 sm:pt-25 md:px-6 borde [text-shadow:0_2px_3px_rgb(75_85_99/30%)]">
          <div className=" flex items-center  border-3 text-sm rounded-3xl gap-1.5 px-2.5 py-1.5 border-gray-300 hover:border-gray-400">  
            <Store className="text-gray-800 text-sm"  />
            <h3 className=" font-bold text-gray-800 text-sm [text-shadow:0_2px_3px_rgb(75_85_99/20%)]">Why Orepo?</h3>
          </div>
          
          <div className="flex flex-col items-center gap-3 text-center">
            <h2 className="font-blMelody text-[26px] sm:text-[32px] md:text-[40px] font-semibold leading-tight sm:leading-8.75 md:leading-11 text-gray-800 mb-0">
                Contribute and Skill Up with 
            </h2>
            <h2 className="font-blMelody text-[26px] sm:text-[32px] md:text-[40px] font-semibold leading-tight sm:leading-8.75 md:leading-11 text-gray-800 mb-0">
                Confidence 
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-8 items-start w-full mt-6">
            <TextArea 
              number={1}
              Paregrapgtext={"Discover GitHub Open Source Projects"}
              Span1={"Orepo helps developers easily find amazing"}
              Span2={"open source projects to contribute to on GitHub."}
            
            />
            <TextArea 
              number={2}
              Paregrapgtext={"Completely Free "}
              Span1={"Enjoy full access to all features with unlimited"}
              Span2={"exports and absolutely no hidden costs."}
            />
            <TextArea 
              number={3}
              Paregrapgtext={"Massive Project Collection Available"}
              Span1={"Browse through a rapidly growing collection of"}
              Span2={"three thousand open source developer repositories."}
            />
         </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 items-start w-full mt-6">
           <TextArea 
              number={4}
              Paregrapgtext={"Filter By Specific Technologies"}
              Span1={"Easily navigate multiple categories to find exactly"}
              Span2={"what you want to work with quickly."}
            />

             <TextArea 
              number={5}
              Paregrapgtext={"Proudly Open Source Platform"}
              Span1={"Join our GitHub repository to help us build"}
              Span2={"a better discovery tool for developers."}
            />

            <TextArea 
              number={6}
              Paregrapgtext={"Easy To Navigate"}
              Span1={"Orepo organizes open source projects "}
              Span2={"categories so developers can discover them seamlessly."}
            />

         </div>
        </div>

        <div className="flex flex-col items-center gap-3 mt-4 mb-5 px-4 text-center">
            <h2 className="font-blMelody text-[26px] sm:text-[32px] md:text-[40px] font-semibold leading-tight sm:leading-8.75 md:leading-11 text-gray-800 mb-0">
              Everything you need to go             
            </h2>
          </div>

          <div className="flex mx-auto w-full max-w-310 px-4 md:px-6 flex-col md:flex-row gap-2 lg:gap-2">
            <div className="flex flex-col sm:flex-row w-full bg-white shadow-marketing-outline ">
              <div className="flex flex-col rounded-3xl sm:mr-2 mb-2 sm:mb-0 items-center justify-center bg-gray-50 w-full sm:w-1/2 p-4 md:p-6">
                <img 
                  src="src\assets\Screenshot 2026-07-16 134810.png" 
                  alt=""  
                  className="h-40 sm:h-50"
                  onContextMenu={(e) => e.preventDefault()} 
                  onDragStart={(e) => e.preventDefault()}  
                />
                <div className="flex flex-col  p-4 sm:p-6 md:p-8 text-center">
                  <h3 className="text-gray-700 text-lg font-semibold mb-2">Filter By Specific Tech</h3>
                  <p className="text-sm sm:text-base font-normal text-brand-gray-500 text-gray-700  leading-normal mb-0">Easily navigate multiple categories to find exactly what you want to work with quickly.</p>
                </div>
              </div>
              <div className="flex flex-col rounded-3xl items-center justify-center bg-gray-50 w-full sm:w-1/2 p-4 md:p-6">
                <img 
                  src="src\assets\Screenshot 2026-07-16 134848.png" 
                  alt=""  
                  className="h-40 sm:h-50"
                  onContextMenu={(e) => e.preventDefault()} 
                  onDragStart={(e) => e.preventDefault()}
                />
                <div className="flex flex-col  p-4 sm:p-6 md:p-8 text-center">
                  <h3 className="text-gray-700 text-lg font-semibold mb-2">Discover GitHub Projects</h3>
                  <p className="text-sm sm:text-base font-normal text-gray-700  text-brand-gray-500 leading-normal mb-0">Orepo helps developers easily find amazing open source projects to contribute to on GitHub.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="pt-4">
            <FAQSection />
          </div>

          
        <Footer />
      </div>

    </>
  );
};

export default HomePage;