import React from 'react'
import NavBar from '../components/NavBar/NavBar'
import { Outlet, useNavigate, useParams } from 'react-router-dom'
import MyProfilePage from '../Pages/MyProfilePage/MyProfilePage'
import { useDispatch } from 'react-redux';
import { setActiveSection } from '../store/slices/SectionSlice/SectionSlice';

export default function MyProfileLayout() {
  const { id } = useParams(); 
const profile = JSON.parse(localStorage.getItem("userProfile"))



  const dispatch = useDispatch();

  const navigate = useNavigate();
  //  const FindImage = singleData[0]?.Photo?.map((el) => {
  //  return el.key ? el.url : ""
    
  // });
  const goToSection = (section) => {
    dispatch(setActiveSection(section));
    navigate(`/profile/${id}/${section.toLowerCase()}`);
  };
  return (
    <div className='App'>
        <NavBar/>
        
    <div className="MyProfilePage">
     {
            <div key={profile?.id}> 
              <div style={{ marginBottom: "20px" }}>
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
          <Outlet />
          </div>
            </div>

     }
    </div>
  
    </div>
)
}
