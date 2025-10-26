import React, { useEffect, useState } from 'react'
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import NavBar from '../../components/NavBar/NavBar';


export default function UserProfilePageLayout() {
  const { id } = useParams(); 
  const location = useLocation()
  const [user,setUser] = useState([])
  const profile = JSON.parse(localStorage.getItem("userProfile") || sessionStorage.getItem("userProfile"))
  const getUser = async () => {
    const res = await fetch(`http://localhost:8000/api/users/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      }
    });
  
    const data = await res.json();
    setUser(data)
    
  }
  useEffect(() => {
    getUser()
  },[])

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const goToSection = (section) => {
    navigate(`/users/${id}/${section.toLowerCase()}`, {
      state: user
    });
  };
  return (
    <div className='App'>
        <NavBar profile={profile}/>
        
    <div className="MyProfilePage">
     {
            <div key={user?.id}> 
              <div style={{ marginBottom: "20px", marginTop:"65px" }}>
            <img
              src={user?.image}
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
              {user?.first_name} {user?.last_name}
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
