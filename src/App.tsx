import { Route, Routes  } from "react-router-dom"
import HomePage from "./page/HomePage"
import { Layout } from "./layout/Layout"
import { SidebarLayout } from "./layout/Layout"
import UserPage from "./page/UserPage"

const App = () => {
  return (
    <>
      <div className="flex felx-col items-center  justify-center">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            
              <Route element={<SidebarLayout />} >
                <Route path="/user" element={<UserPage />} />
            </Route>

            </Route>
          {/* </Route> */}
        </Routes>
      </div>
    </>
  )
}

export default App  