import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from '../Layout/Layout'
import ProfilePage from '../Pages/ProfilePage/ProfilePage'
import RegPage from '../Pages/RegistrationPage/RegPage'
import LoginPage from '../Pages/LoginPage/LoginPage'
import {  useSelector } from 'react-redux'
import { selectUser } from '../store/slices/UserSlice'
import ProjectPage from '../Pages/ProjectPage/ProjectPage'
import AboutMeEdit from '../Pages/MyProfilePage/MyInfo/AboutMe/AboutMeEdit/AboutMeEdit'
import MyProfileLayout from '../Layout/MyProfileLayout'
import AboutMe from '../Pages/MyProfilePage/MyInfo/AboutMe/AboutMe'
import MyFriends from '../Pages/MyProfilePage/MyInfo/MyFriends/MyFriends'
import UploadPhoto from '../Pages/MyProfilePage/MyInfo/UploadPhoto/UploadPhoto'

const AppRouter = () => {

    const { profile,users } = useSelector(selectUser);
    
    return (
        <Routes>
            <Route path='/' element={<RegPage users={users} profile={profile}/>}/>
            <Route path='/Login' element={<LoginPage />}/>
            <Route path='/profile' element={<Layout />} >
                <Route path='/profile/pages' element={<ProjectPage />}/>
                <Route index element={<ProfilePage />}/>
                <Route path="/profile/:id/edit" element={<AboutMeEdit profile={profile} />}/>
                
            </Route>
            <Route path='/profile/:id' element={<MyProfileLayout/>}>
            <Route path='info' element={<AboutMe/>}/>
            <Route path='friends' element={<MyFriends/>}/>
            <Route path='photo' element={<UploadPhoto/>}/>
            <Route path='info/edit' element={<AboutMeEdit/>}/>
            </Route>

        </Routes>
    )
}

export default AppRouter