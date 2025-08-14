import { useState } from 'react'
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from './Components/NavBar/navbar';
import LandingPage from './Components/Landing_Page/Landing_Page';
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="App">
        <BrowserRouter>
            <NavBar />
            <Routes >
                <Route path='/' element={<LandingPage/>}/>
            </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
