import React from 'react'
import NavBar from '../components/NavBar/NavBar'
import { Outlet } from 'react-router-dom'

const Layout = ({profile}) => {
    return (
        <div className='App'>
            <NavBar profile={profile}/>
            <Outlet/>
        </div>
    )
}

export default Layout