import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from '../Layout/Layout'
import ProfilePage from '../Pages/ProfilePage/ProfilePage'
import RegPage from '../Pages/RegistrationPage/RegPage'
import LoginPage from '../Pages/LoginPage/LoginPage'
import MyProfilePage from '../Pages/MyProfilePage/MyProfilePage'
import { useDispatch, useSelector } from 'react-redux'
import { selectUser } from '../store/slices/UserSlice'
import { fetchGetLogedUser, fetchGetNewsLent, fetchGetUser } from '../store/slices/API'
import ProjectPage from '../Pages/ProjectPage/ProjectPage'

const AppRouter = () => {

    const dispatch = useDispatch()
    const {User_Data,Loged_User_Data } = useSelector(selectUser)
    
    useEffect(() => {
        dispatch(fetchGetLogedUser())
        dispatch(fetchGetUser())
        dispatch(fetchGetNewsLent())
    },[])
    return (
        <Routes>
            <Route path='/' element={<RegPage User_Data={User_Data} Loged_User_Data={Loged_User_Data}/>}/>
            <Route path='/Login' element={<LoginPage User_Data={User_Data} Loged_User_Data={Loged_User_Data}/>}/>
            <Route path='/profile' element={<Layout User_Data={User_Data} Loged_User_Data={Loged_User_Data}/>} >
                <Route path='/profile/Pages' element={<ProjectPage />}/>
                <Route path='/profile' element={<ProfilePage User_Data={User_Data} Loged_User_Data={Loged_User_Data}/>}/>
                <Route path="/profile/:id" element={<MyProfilePage User_Data={User_Data} Loged_User_Data={Loged_User_Data}/>}/>
                
            </Route>

        </Routes>
    )
}

export default AppRouter