import { Route, Routes  } from "react-router-dom"
import HomePage from "./page/HomePage"
import { Layout } from "./layout/Layout"
import { FullTable } from "./page/FullTable"
// import { SidebarLayout } from "./layout/Layout"
// import UserPage from "./page/RepositoryTable"

const App = () => {
  return (
    <>
      <div>
        <Routes>
          {/* layout for home page */}
          <Route path="/" element={<Layout />}>     
            <Route index element={<HomePage />} />
            <Route path="/dashboard" element={<FullTable />} />
            
            {/* layout for other pages  */}
              {/* <Route element={<SidebarLayout />} >
                <Route path="/user" element={<UserPage />} />
              </Route> */}


            </Route>
        </Routes>
      </div>
    </>
  )
}

export default App  