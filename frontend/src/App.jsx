import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'

import './index.css'

//TODO Pages
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'

import ProtectedRoute from './ProtectedRoute'
import HomePage from './pages/HomePage'
import UserPage from './pages/UserPage'
import MedidoresPage from './pages/MedidoresPage'
import ReportesPage from './pages/reportesPage'
import FacturasPage from './pages/FacturasPage'
import ConfigPage from './pages/ConfigPage'
import PagosPage from './pages/PagosPage'

function App() {

  return (
    <AuthProvider>
        
        <BrowserRouter>
          <Routes>
            <Route path='/' element={ <LoginPage />} />
            <Route path='/register' element={ <RegisterPage />} />
            
            {/* // TODO Rutas Protegidas */}
            <Route element={<ProtectedRoute/>}>
              <Route path='/home' element={ <HomePage/> } />
              <Route path='/user' element={ <UserPage/> } />
              <Route path='/medidorPage' element={ <MedidoresPage/> } />
              <Route path='/reportes' element={ <ReportesPage/> } />
              <Route path='/facturas' element={ <FacturasPage/> } />
              <Route path='/pagos' element={ <PagosPage/> } />
              <Route path='/config' element={ <ConfigPage/> } />
            </Route>
          </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
