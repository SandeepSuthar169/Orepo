import { Route, Routes  } from "react-router-dom"
import HomePage from "./page/HomePage"
import Layout from "./layout/Layout"
import DashboardLayout from "./layout/DashboardLayout"
import { Dashboard } from "./page/DashboardPage"
import  { Users }  from "./page/User"

const App = () => {
  return (
    <>
      <div className="flex felx-col items-center  justify-center">
        <Routes>

          <Route path="/" element={<Layout />}>
          
            <Route index element={<HomePage />} />  

             <Route element={<DashboardLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/user" element={<Users />} />
            </Route> 
            
          </Route>
        </Routes>
      </div>
    </>
  )
}

export default App  