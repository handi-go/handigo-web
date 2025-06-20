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
import CustomerDashboard from './layouts/customerDashboardLayout.jsx'
import Jobs from './pages/jobs.jsx'
import AuthLayout from './layouts/authLayout.jsx'
import AccountVerification from './pages/onboarding/accountVerification.jsx'
import Wallet from './pages/wallet.jsx'
import CWallet from './pages/CWallet.jsx'
import Services from './pages/Services.jsx'
import Customer from './pages/customer.jsx'
import Messages from './pages/messages.jsx'
import Profile from './pages/profile.jsx'


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
        <Route path="/wallet" element={<Wallet />} />
        {/*  <Route path="/settings" element={<Settings />} /> */}
        {/* Add more child routes as needed */}
      </Route>

      {/* Customer Dashboard */}
      <Route element={<CustomerDashboard />}>
        <Route path="/cdashboard" element={<Customer />} />
        <Route path="/services" element={<Services />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/cwallet" element={<CWallet />} />
        <Route path="/settings/profile" element={<Profile />} />
      </Route>

      {/* Nested route under onboarding */}
      <Route path='/onboarding'>
        <Route path='personal-information' element={<PersonalInfo />} />
      </Route>

      <Route path='account-verification' element={<AccountVerification />} />

    </Routes>
  </BrowserRouter>
)



{/* <StrictMode>
    <NavBar />
    <App />
  </StrictMode>, */}