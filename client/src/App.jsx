import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import './App.css'

import Home from './pages/Home'
import AdminLogin from './pages/admin/AdminLogin'
import Leads from './pages/admin/Leads'
import ProtectedRoute from './components/admin/ProtectedRoute'
import { Toaster } from "sonner";

function App() {

  return (
    <>
      <BrowserRouter>
        <Toaster richColors />
        
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/admin" element={<AdminLogin />} />

          <Route
            path="/admin/leads"
            element={
              <ProtectedRoute>
                <Leads />
              </ProtectedRoute>} />
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
