import LandingPage from './pages/LandingPage'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Providers from './providers'
import Home from './pages/Home'
import Onboarding from './pages/Onboarding'

const App = () => {
  return (
    /* showing the routes */
    <Providers>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home/*" element={<Home />} />
          <Route path="/Onboarding" element={<Onboarding/>} />
        </Routes>
      </BrowserRouter>
    </Providers>
  )
}

export default App
