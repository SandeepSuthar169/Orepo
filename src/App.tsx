import { Route, Routes  } from "react-router-dom"
import HomePage from "./page/HomePage"
import Layout from "./layout/Layout"
import DataPage from "./page/DataPage"

const App = () => {
  return (
    <>
      <div className="flex felx-col items-center justify-center">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route 
              path="/"
              element={<HomePage />}
            />
            <Route 
              path="/data"
              element={<DataPage />}
            />
          </Route>
        </Routes>
      </div>
    </>
  )
}

export default App