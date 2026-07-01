import Footer from "../components/Footer";
import { FiArrowUpRight } from "react-icons/fi";

const HomePage = () => {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <main className="flex">
          <section className="mx-auto lg:h-281.75  md:h-250 min-h-screen w-full h-full">
            <img 
              src="src\assets\hero.png" 
              alt=""  
              className="absolute inset-0 h-full w-full object-cover"  
            />

            <div className="relative flex  min-h-dvh w-full ">
              <div className="flex w-full  items-center justify-center">
                <div className="z-10 flex w-full max-w-206.5 flex-col items-center justify-center gap-8 md:gap-12.5">
                  <div className="flex flex-col items-center gap-2 mb-1">
                      <h1 className="text-5xl  font-bold text-white ">
                          Here are 1700+ Pojects <br />
                      </h1>
                      <h1 className="text-5xl  font-bold text-white/70 ">
                      you can <span className="text-rose-500">contribure</span>   
                      </h1>
                  </div>

                  <div className="flex flex-col items-center gap-2 mb-1">
                  <p className="text-base md:text-2xl px-5 md:px-10 font-normal text-white tracking-normal opacity-80 max-w-2xl">
                    Search what you need  and let Ople handle the rest.
                  </p>
                  <p className="text-base md:text-2xl px-0 md:px-0 font-normal text-shadow-gray-600 text-white tracking-normal opacity-80 max-w-2xl">
                    Contribute in AI, Frontend, DataBase, npm. <span className="text-black  font-bold"> You are needed. </span>
                  </p>
                  </div>
                  <div className=" flex items-center gap-6  font-medium">
                <button className="h-12 px-8  rounded-full bg-linear-to-b from-white to-gray-200 text-black font-semibold shadow-[0_4px_20px_rgba(59,130,246,0.4)] hover:shadow-[0_4px_25px_rgba(59,130,246,0.6)] hover:scale-105 transition-all duration-300">
                        Get Started
                    </button>
                    <button className="h-12 px-8 rounded-full border border-gray-700 bg-gray-900/50 text-white font-medium hover:bg-gray-800 transition-colors backdrop-blur-sm flex items-center gap-2 group">
                    Source
                        <FiArrowUpRight className="w-4 h-4 fill-white group-hover:scale-110 transition-transform" />
                    </button>
                </div>
                  
                </div>
           

              </div>

            </div>

          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default HomePage;
