import { BsAsterisk } from "react-icons/bs";

interface LiType {
  name: string
}

const LiA = ({name}:LiType) => {
  return (
    <>
      <div>
        <li className="list-none">
            <a href="#" className="hover:text-text-neutral-800 transition-colors">{name}</a>
        </li>
      </div>
    </>
  )

}


const Footer = () => {
  return (
    <section className="theme-zinc w-full bg-white">
      <div className="flex max-w-300 w-full items-center justify-center">
        <div className="relative w-full overflow-hidden border-t border-neutral-100 bg-white px-11 py-15">
          <div className="mx-auto flex max-w-7xl flex-col items-start justify-between text-sm text-neutral-500 sm:flex-row md:px-8">
            
            <div>
              <div className="ml-5 mb-4  items-center gap-2 md:mr-4 md:flex">
                <BsAsterisk  className="text-2xl text-rose-400 font-bold " />
                <span className="font-medium text-2xl text-gray-900">Orepo</span>
              </div>
            </div>

            <div className="mt-7 grid grid-cols-2 items-start gap-10 sm:mt-0 md:mt-0 lg:grid-cols-3">
              <div className="flex w-full flex-col justify-center space-y-4">
                <p className="hover:text-text-neutral-800 font-bold text-neutral-600 transition-colors">Pages</p>
                <ul className="hover:text-text-neutral-800  text-neutral-600 transition-colors">
                  <LiA name="All Collection" />
                  <LiA name="Collection" />
                  <LiA name="Repositories" />
                </ul>
              </div>
              
              <div className="flex w-full flex-col justify-center space-y-4">
                <p className="hover:text-text-neutral-800 font-bold text-neutral-600 transition-colors">Socials</p>
                <ul className="hover:text-text-neutral-800  text-neutral-600 transition-colors">
                  <LiA name="Linkedin" />
                  <LiA name="Twitter" />
                  <LiA name="Peerlist" />
                  <LiA name="Github" />
                </ul>
              </div>

              <div className="flex w-full flex-col justify-center space-y-4">
                <p className="hover:text-text-neutral-800 font-bold text-neutral-600 transition-colors">Collection</p>
                <ul className="hover:text-text-neutral-800  text-neutral-600 transition-colors">
                  <LiA name="DataBase" />
                  <LiA name="TypeScript" />
                  <LiA name="Scala" />
                  <LiA name="npm" />
                  <LiA name="Node.js" />
                </ul>
              </div>

      
            </div>

          </div>
            <div>
              <p className="inset-x-0 mt-10 bg-linear-to-b from-neutral-50 to-neutral-300 bg-clip-text text-center text-6xl font-bold text-transparent md:text-9xl lg:text-[12rem] xl:text-[13rem]  ">Opare</p>
            </div>
        </div>
      </div>
    </section>
  )
}

export default Footer