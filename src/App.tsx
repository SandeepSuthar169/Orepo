import { Route, Routes  } from "react-router-dom"
import HomePage from "./page/HomePage"
import { Layout } from "./layout/Layout"
import { FullTable } from "./page/FullTable"
import NotFound from "./components/NotFound"


const App = () => {
  return (
    <>
      <div>
        <Routes>

          <Route path="/" element={<Layout />}>     
            <Route index element={<HomePage />} />
            <Route path="/dashboard" element={<FullTable />} />
            <Route path="*" element={<NotFound />} />
          </Route>

        </Routes>
      </div>
    </>
  )
}

export default App  