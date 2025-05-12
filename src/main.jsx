import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './css/index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import SignUp from './pages/authentications/signup.jsx'
import LogIn from './pages/authentications/login.jsx'
import ForgorPassword from './pages/authentications/forgotPassword.jsx'
import EmailVerification from './pages/authentications/emailVerification.jsx'
import PersonalInfo from './pages/onboarding/personalInformations.jsx'
import Dashboard from './pages/dashboard.jsx'
import DashboardLayout from './layouts/dashboardLayout.jsx'
import Jobs from './pages/jobs.jsx'
import AuthLayout from './layouts/authLayout.jsx'


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
      {/* <NavBar /> */}

    <Routes>
      <Route path='/' element={<App />} />

      {/* Auth */}
      <Route element={<AuthLayout />}>
        <Route path='/signup' element={<SignUp />} />
        <Route path='/login' element={<LogIn />} />
        <Route path='/forgot-password' element={<ForgorPassword />} />
        <Route path='/verify-email' element={<EmailVerification />} />
      </Route>

      {/* Dashboard */}
      <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/jobs" element={<Jobs />} />
        {/* <Route path="/wallet" element={<Wallet />} />
        <Route path="/settings" element={<Settings />} /> */}
        {/* Add more child routes as needed */}
      </Route>

      {/* Nested route under onboarding */}
      <Route path='/onboarding'>
        <Route path='personal-information' element={<PersonalInfo />} />
      </Route>

    </Routes>
  </BrowserRouter>
)



{/* <StrictMode>
    <NavBar />
    <App />
  </StrictMode>, */}