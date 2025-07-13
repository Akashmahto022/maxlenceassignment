import React from 'react'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Register from "./pages/Register"
import NotFound from './pages/NotFound'
import About from './pages/About'
import Contact from './pages/Contact'
import Login from './pages/Login'
import ResetPassword from './pages/ResetPassword'
import ChangePassword from './pages/ChangePassword'

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/reset-password' element={<ResetPassword />} />
        <Route path='/change-password' element={<ChangePassword />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App