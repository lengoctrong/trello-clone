import { BrowserRouter, Route, Routes } from 'react-router-dom'
import DefaultLayout from './layouts/DefaultLayout/DefaultLayout'
import { publicRoutes } from './routes'
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {publicRoutes.map((route, idx) => {
          const Page = route.element
          return (
            <Route
              key={idx}
              path={route.path}
              element={
                <DefaultLayout>
                  <Page />
                </DefaultLayout>
              }
            />
          )
        })}
      </Routes>
    </BrowserRouter>
  )
}

export default App
