import React from 'react'
import NavBar from './components/navbar'
import { Outlet } from 'react-router-dom'
import Footer from './components/Footer'
const Body = () => {
  return (
    <div>
        <NavBar/>

        {/* all the child routes of body wil be render here  */}
        <Outlet/>  

        <Footer/> 


    </div>
  )
}

export default Body