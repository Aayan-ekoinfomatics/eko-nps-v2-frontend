import { useState } from 'react'
import LoginPage from './pages/LoginPage'
import Dashboard from './pages/Dashboard'
import DashboardNew from './pages/DashboardNew'
import Sidebar from './components/global-components/Sidebar'
import NSSCard from './components/individual-components/NSSCard'
import { Route, Routes, useLocation } from 'react-router-dom'
import ReviewsTablePage from './pages/ReviewsTablePage'
import ProtectedRoute from './components/global-components/ProtectedRoute'
import DashboardNewTwo from './pages/DashboardNewTwo'
import NPSSentimentsTablePage from './pages/NPSSentimentsTablePage'
import NPSCommentsTablePage from './pages/NPSCommentsTablePage'

function App() {
  const [count, setCount] = useState(0)

  const location = useLocation()

  return (
    <div className='font-poppins'>
      {
        location?.pathname?.includes('/login') ?
          null
          :
          <Sidebar />
      }
      <div className={`${location?.pathname?.includes('/login') ? '' : 'sm:pl-[60px] lg:pl-[200px] 2xl:pl-[230px]'}`}>
        <Routes >
          <Route path='/login' element={<LoginPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path='/' element={<DashboardNew />} />
            <Route path='/sentiments' element={<Dashboard />} />
            <Route path='/comments' element={<ReviewsTablePage />} />
            <Route path='/nps-dashboard' element={<DashboardNewTwo />} />
            <Route path='/nps-sentiments' element={<NPSSentimentsTablePage />} />
            <Route path='/nps-comments' element={<NPSCommentsTablePage />} />
          </Route>
        </Routes>
      </div>
    </div>
  )
}

export default App
