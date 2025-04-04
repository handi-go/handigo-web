import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './css/index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import NavBar from './components/navbar.jsx'
import SignUp from './pages/authentications/signup.jsx'
import LogIn from './pages/authentications/login.jsx'




createRoot(document.getElementById('root')).render(
  <BrowserRouter>
      {/* <NavBar /> */}

    <Routes>
      <Route path='/' element={<App />} />
      <Route path='/signup' element={<SignUp />} />
      <Route path='/login' element={<LogIn />} />

    </Routes>
  </BrowserRouter>
)



{/* <StrictMode>
    <NavBar />
    <App />
  </StrictMode>, */}