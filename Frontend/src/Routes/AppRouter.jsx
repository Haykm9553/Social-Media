import React, { useEffect, useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
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
import { getToken } from '../utils/auth'
import MessagesPage from '../Pages/MessagesPage/MessagesPage'
import UserProfilePageLayout from '../Pages/UserProfilePageLayout/UserProfilePageLayout'
import AboutUser from '../Pages/UserProfilePageLayout/AboutUser/AboutUser'

const AppRouter = () => {

    
    return (
        <Routes>
            <Route path='/' element={<RegPage />}/>
            <Route path='/Login' element={<LoginPage />}/>
            <Route path='/profile' element={<Layout />} >
                <Route path='/profile/pages' element={<ProjectPage  />}/>
                <Route index element={<ProfilePage  />}/>
                <Route path="/profile/:id/edit" element={<AboutMeEdit  />}/>
                <Route path='/profile/:id/messages' element={<MessagesPage />}/>
            </Route>
            <Route path='/profile/:id' element={<MyProfileLayout/>}>
            <Route path='info' element={<AboutMe/>}/>
            <Route path='friends' element={<MyFriends/>}/>
            <Route path='photo' element={<UploadPhoto/>}/>
            <Route path='info/edit' element={<AboutMeEdit/>}/>
            </Route>
            <Route path='/users/:id' element={<UserProfilePageLayout/>}>
            <Route path='info' element={<AboutUser/>}/>
            
            </Route>
        </Routes>
    )
}

export default AppRouter