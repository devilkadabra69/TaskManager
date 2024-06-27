import { useState } from 'react'
import './App.css'
import { ScreenWidthAndHeightContainer, Header, Footer, MaxWidthContainer } from "./components/index.js"
import { Outlet } from "react-router-dom"
import { Home } from "./pages/index.js"

function App() {


  return (
    <section className='flex w-full h-full bg-secondPrimaryColor'>
      <Header />
      <Outlet />
    </section>
  )
}

export default App
