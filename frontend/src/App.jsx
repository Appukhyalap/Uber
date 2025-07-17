import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './Home'
import UserLogin from './UserLogin'
import CaptainLogin from './CaptainLogin'
import CaptainSignup from './CaptainSignup'
import UserSignup from './UserSignup'

const App = () => {
  return (
    <Routes >
      <Route path="/" element={<Home />}></Route>
      <Route path="/login" element={<UserLogin />}></Route>
      <Route path="/signup" element={<UserSignup />}></Route>
      <Route path="/captain-login" element={<CaptainLogin />}></Route>
      <Route path="/captain-signup" element={<CaptainSignup />}></Route>
    </Routes>
  )
}

export default App