import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './css/index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import NavBar from './components/navbar.jsx'
import SignUp from './pages/authentications/signup.jsx'
import LogIn from './pages/authentications/login.jsx'
import ForgorPassword from './pages/authentications/forgotPassword.jsx'
import EmailVerification from './pages/authentications/emailVerification.jsx'
import PersonalInfo from './components/onboarding/personalInformations.jsx'




createRoot(document.getElementById('root')).render(
  <BrowserRouter>
      {/* <NavBar /> */}

    <Routes>
      <Route path='/' element={<App />} />
      <Route path='/signup' element={<SignUp />} />
      <Route path='/login' element={<LogIn />} />
      <Route path='/forgot-password' element={<ForgorPassword />} />
      <Route path='/verify-email' element={<EmailVerification />} />

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