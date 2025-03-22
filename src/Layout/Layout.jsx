import React from 'react'
import NavBar from '../components/NavBar/NavBar'
import { Outlet } from 'react-router-dom'

const Layout = () => {
    return (
        <div className='App'>
            <NavBar/>
            <Outlet/>
        </div>
    )
}

export default Layout