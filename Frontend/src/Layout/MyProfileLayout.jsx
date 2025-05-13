import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBar/NavBar'
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom'
import MyProfilePage from '../Pages/MyProfilePage/MyProfilePage'
import { useDispatch } from 'react-redux';
import { setActiveSection } from '../store/slices/SectionSlice/SectionSlice';
import AboutMe from '../Pages/MyProfilePage/MyInfo/AboutMe/AboutMe';
import MyFriends from '../Pages/MyProfilePage/MyInfo/MyFriends/MyFriends';
import UploadPhoto from '../Pages/MyProfilePage/MyInfo/UploadPhoto/UploadPhoto';

export default function MyProfileLayout() {
  const { id } = useParams(); 
  const [profile,setProfile] = useState([]);

  const getUser = async () => {
    const res = await fetch(`http://localhost:8000/api/users/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      }
    });
  
    const data = await res.json();
    setProfile(data)
    
  }
  

useEffect(() => {
  getUser()
},[])

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const goToSection = (section) => {
    dispatch(setActiveSection(section));
    navigate(`/profile/${id}/${section.toLowerCase()}`, {
      state: {profile}
    });
  };
  return (
    <div className='App'>
        <NavBar profile={profile}/>
        
    <div className="MyProfilePage">
     {
            <div key={profile?.id}> 
              <div style={{ marginBottom: "20px", marginTop:"65px" }}>
            <img
              src={profile?.image}
              style={{
                backgroundColor: "#ccc",
                width: "100px",
                height: "100px",
                borderRadius: "50%",
                margin: "0 auto",
              }}
              alt=""
            ></img>
            <h2>
              {profile?.first_name} {profile?.last_name}
            </h2>
            <p>Friends: 330</p>
          </div>
    
          <nav className="nav-buttons" style={{ marginBottom: "20px" }}>
            <button
              onClick={() => goToSection("Info")}
              className="nav-button"
            >
              Info
            </button>
            <button
              onClick={() => goToSection("Friends")}
              className="nav-button"
            >
              Friends
            </button>
            <button
              onClick={() => goToSection("Photo")}
              className="nav-button"
            >
              Photo
            </button>

           
          </nav>
    
          <div className="section-content" >
          <Outlet/>
          </div>
            </div>

     }
    </div>
  
    </div>
)
}
