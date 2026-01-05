//import { useState } from 'react'
import { BrowserRouter, Routes, Route, Outlet, Navigate } from 'react-router';
import './App.css'
import Header from './Header';
import Buy from './Buy';
import Sell from './Sell';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <>
              <Header />
              <Outlet />
            </>
          }>
            <Route index element={<Buy />} />
            <Route path="/Sell" element={<Sell />} />
          </Route>
          <Route path='*' element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
