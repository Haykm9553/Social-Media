import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBar/NavBar'
import { Outlet, useNavigate } from 'react-router-dom'
import { getToken } from '../utils/auth';

const Layout = () => {

   
      
    return (
        <div className='App'>
            <NavBar/>
            <Outlet/>
        </div>
    )
}

export default Layout