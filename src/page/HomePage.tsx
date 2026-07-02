import Footer from "../components/Footer";
import { FiArrowUpRight } from "react-icons/fi";
import { Store  } from 'lucide-react';




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
              src="src\assets\hero.webp" 
              alt=""  
              className="mask-b-from-50% absolute inset-0 h-full w-full select-none object-cover  "
              onContextMenu={(e) => e.preventDefault()} 
              onDragStart={(e) => e.preventDefault()}
            />

            <div className="relative flex min-h-dvh w-full">
              <div className="flex w-full items-center justify-center">
                <div className="z-10 flex w-full max-w-206.5 flex-col items-center justify-center gap-8 md:gap-12.5">
                  <div className="flex flex-col items-center gap-2 mb-1">
                      <h1 className="text-5xl font-bold text-white text-center [text-shadow:0_2px_3px_rgb(75_85_99/30%)]">
                          Here are 1700+ Projects <br />
                      </h1>
                      <h1 className="text-5xl font-bold text-white/70 text-center [text-shadow:0_2px_3px_rgb(75_85_99/30%)]">
                        you can <span className="text-rose-500 " >contribute</span>   
                      </h1>
                  </div>

                  <div className="flex flex-col items-center gap-2 mb-1">
                    <p className="text-base md:text-2xl px-5 md:px-10 font-normal [text-shadow:0_2px_3px_rgb(75_85_99/30%)] text-white tracking-normal opacity-80 max-w-2xl text-center">
                      Search what you need and let Ople handle the rest.
                    </p>
                    <p className="text-base md:text-2xl px-0 [text-shadow:0_2px_3px_rgb(75_85_99/30%)] md:px-0 font-normal text-shadow-gray-600 text-white tracking-normal opacity-80 max-w-2xl text-center">
                      Contribute in AI, Frontend, DataBase, npm. <span className="text-black font-bold [text-shadow:0_2px_3px_rgb(75_85_99/30%)]"> You are needed. </span>
                    </p>
                  </div>
                  <div className="flex items-center gap-6 font-medium">
                     <button className="h-12 px-8 rounded-full bg-linear-to-b from-white to-gray-200 text-black font-semibold shadow-[0_4px_20px_rgba(59,130,246,0.4)] hover:shadow-[0_4px_25px_rgba(59,130,246,0.6)] hover:scale-105 transition-all duration-300">
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



            <div className="relative mx-auto max-w-4xl rounded-3xl border border-neutral-200/50 bg-neutral-100 p-2 backdrop-blur-lg md:p-4">
              <div className="rounded-3xl border border-neutral-200 bg-white p-2">
                <img 
                  src="src\assets\dashboard-new.webp" 
                  alt="" 
                  className="rounded-[20px] select-none"
                  onContextMenu={(e) => e.preventDefault()} 
                  onDragStart={(e) => e.preventDefault()}
                  />
              </div>
            </div>


            
          </section>
        </main>

        <div className="mx-auto flex w-full max-w-310 flex-col items-center gap-7 px-4 pb-20 pt-25 md:px-6 borde [text-shadow:0_2px_3px_rgb(75_85_99/30%)]">
          <div className=" flex items-center  border-3 text-sm rounded-3xl gap-1.5 px-2.5 py-1.5 border-gray-300 hover:border-gray-400">  
            <Store className="text-gray-800 text-sm"  />
            <h3 className=" font-bold text-gray-800 text-sm [text-shadow:0_2px_3px_rgb(75_85_99/20%)]">Why Orepo?</h3>
          </div>
          
          <div className="flex flex-col items-start sm:items-center gap-3 sm:text-center">
            <h2 className="font-blMelody text-[32px] sm:text-[40px] font-semibold leading-8.75 sm:leading-11 text-gray-800 mb-0">
                Contribute and Skill Up with 
            </h2>
            <h2 className="font-blMelody text-[32px] sm:text-[40px] font-semibold leading-8.75 sm:leading-11 text-gray-800 mb-0">
                Confidence 
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 items-start w-full mt-6">
            <div className="flex flex-col gap-3 items-start w-full cursor-pointer group">
              <div className="flex gap-4">
                <h3 className="inline-flex items-center font-medium border box-content transition-colors focus:outline-none focus-visible:outline-none whitespace-nowrap bg-white text-gray-700 border-black/10 group-hover:text-gray-900 group-hover:border-black/20 h-6 px-2 gap-1.5 text-sm rounded-full">
                  1
                </h3>
                <p className="font-semibold leading-6 text-gray-700 text-xl mb-0">
                  Build business apps, fast
                </p>
              </div>
              <div >
                <span className="block text-gray-700 text-base font-normal mt-1">Prompt to build the software you need.</span>
                <span className="block text-gray-700 text-base font-normal ">Describe your app and watch Zite get to work.</span>
              </div>
            </div>

            <div className="flex flex-col gap-3 items-start w-full cursor-pointer group">
              <div className="flex gap-4">
                <h3 className="inline-flex items-center font-medium border box-content transition-colors focus:outline-none focus-visible:outline-none whitespace-nowrap bg-white text-gray-700 border-black/10 group-hover:text-gray-900 group-hover:border-black/20 h-6 px-2 gap-1.5 text-sm rounded-full">
                  2
                </h3>
                <p className="font-semibold leading-6 text-gray-700 text-xl mb-0">
                  Build business apps, fast
                </p>
              </div>
              <div >
                <span className="block text-gray-700  font-normal mt-1">Prompt to build the software you need.</span>
                <span className="block text-gray-700  font-normal ">Describe your app and watch Zite get to work.</span>
              </div>
            </div>

            <div className="flex flex-col gap-3 items-start w-full cursor-pointer group">
              <div className="flex gap-4">
                <h3 className="inline-flex items-center font-medium border box-content transition-colors focus:outline-none focus-visible:outline-none whitespace-nowrap bg-white text-gray-700 border-black/10 group-hover:text-gray-900 group-hover:border-black/20 h-6 px-2 gap-1.5 text-sm rounded-full">
                  3
                </h3>
                <p className="font-semibold leading-6 text-gray-700 text-xl mb-0">
                  Build business apps, fast
                </p>
              </div>
              <div >
                <span className="block text-gray-700 text-base font-normal mt-1">Prompt to build the software you need.</span>
                <span className="block text-gray-700 text-base font-normal ">Describe your app and watch Zite get to work.</span>
              </div>
            </div>
         </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 items-start w-full mt-6">
            <div className="flex flex-col gap-3 items-start w-full cursor-pointer group">
              <div className="flex gap-4">
                <h3 className="inline-flex items-center font-medium border box-content transition-colors focus:outline-none focus-visible:outline-none whitespace-nowrap bg-white text-gray-700 border-black/10 group-hover:text-gray-900 group-hover:border-black/20 h-6 px-2 gap-1.5 text-sm rounded-full">
                  4
                </h3>
                <p className="font-semibold leading-6 text-gray-700 text-xl mb-0">
                  Build business apps, fast
                </p>
              </div>
              <div >
                <span className="block text-gray-700 text-base font-normal mt-1">Prompt to build the software you need.</span>
                <span className="block text-gray-700 text-base font-normal ">Describe your app and watch Zite get to work.</span>
              </div>
            </div>

            <div className="flex flex-col gap-3 items-start w-full cursor-pointer group">
              <div className="flex gap-4">
                <h3 className="inline-flex items-center font-medium border box-content transition-colors focus:outline-none focus-visible:outline-none whitespace-nowrap bg-white text-gray-700 border-black/10 group-hover:text-gray-900 group-hover:border-black/20 h-6 px-2 gap-1.5 text-sm rounded-full">
                  5
                </h3>
                <p className="font-semibold leading-6 text-gray-700 text-xl mb-0">
                  Build business apps, fast
                </p>
              </div>
              <div >
                <span className="block text-gray-700  font-normal mt-1">Prompt to build the software you need.</span>
                <span className="block text-gray-700  font-normal ">Describe your app and watch Zite get to work.</span>
              </div>
            </div>

            <div className="flex flex-col gap-3 items-start w-full cursor-pointer group">
              <div className="flex gap-4">
                <h3 className="inline-flex items-center font-medium border box-content transition-colors focus:outline-none focus-visible:outline-none whitespace-nowrap bg-white text-gray-700 border-black/10 group-hover:text-gray-900 group-hover:border-black/20 h-6 px-2 gap-1.5 text-sm rounded-full">
                  6
                </h3>
                <p className="font-semibold leading-6 text-gray-700 text-xl mb-0">
                  Build business apps, fast
                </p>
              </div>
              <div >
                <span className="block text-gray-700 text-base font-normal mt-1">Prompt to build the software you need.</span>
                <span className="block text-gray-700 text-base font-normal ">Describe your app and watch Zite get to work.</span>
              </div>
            </div>

         </div>
        </div>

        <div className="flex flex-col items-start sm:items-center gap-3 mt-4 mb-5 sm:text-center">
            <h2 className="font-blMelody text-[32px] sm:text-[40px] font-semibold leading-8.75 sm:leading-11 text-gray-800 mb-0">
              Everything you need to go             
            </h2>
          </div>

          <div className="flex  max-w-310   flex-col md:flex-row gap-2 lg:gap-2">
            <div className="flex  bg-white  shadow-marketing-outline ">
              <div className="flex flex-col rounded-3xl mr-2  items-center justify-center bg-gray-50  md:p-6">
                <img src="src\assets\SecureForms.webp" alt=""  className="h-50"/>
                <div className="flex flex-col  p-6 sm:p-8 sm:text-center">
                  <h3 className="flex flex-col text-gray-700  p-6 sm:p-8 sm:text-center">Built-in login & authentication</h3>
                  <p className="text-base font-normal text-brand-gray-500 text-gray-700  leading-normal mb-0">Login via magic link, Google, or single sign-on (SSO). Build internal-only or external-facing apps.</p>
                </div>
              </div>
              <div className="flex flex-col rounded-3xl  items-center justify-center bg-gray-50  md:p-6">
                <img src="src\assets\SecurityFirstIllustration.7037f7d0.svg" alt=""  className="h-50"/>
                <div className="flex flex-col  p-6 sm:p-8 sm:text-center">
                  <h3 className="flex flex-col text-gray-700  p-6 sm:p-8 sm:text-center">Built-in login & authentication</h3>
                  <p className="text-base font-normal text-gray-700  text-brand-gray-500 leading-normal mb-0">Login via magic link, Google, or single sign-on (SSO). Build internal-only or external-facing apps.</p>
                </div>
              </div>
            </div>
          </div>
        <Footer />
      </div>

    </>
  );
};

export default HomePage;