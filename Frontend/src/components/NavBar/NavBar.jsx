import "./NavBar.css";
import ChatLogo from "../../SVG/ChatLogo";
import NotificationLogo from "../../SVG/NotificationLogo";
import Logo from "../Img/Logo.jpeg";
import { useDispatch, useSelector } from "react-redux";
import { LogOut, selectUser } from "../../store/slices/UserSlice";
import { NavLink, useNavigate } from "react-router-dom";
import { getToken } from "../../utils/auth";
const NavBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const profile = JSON.parse(localStorage.getItem("userProfile") || sessionStorage.getItem("userProfile"))
  
  const logOut = () => {


    const token = getToken()
    fetch('http://localhost:8000/api/logout', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    })
      .then(res => res.json())
      .then(data => {
         
        
      });
      dispatch(LogOut())
      navigate("/Login")
  };
  
  
  return (
    <nav className="NavBar">
      <div className="LogoSide">
        <img
          src={Logo}
          alt="Logo"
          onClick={() => {
            if (profile.length === 0) {
              navigate("/Login");
            } else {
              navigate("/profile");
            }
          }}
        />
        <input type="text" placeholder="Search people,jops & more" />
      </div>
      <div className="JobSide">
        <ul>

          <li><NavLink to={"/profile/pages"}>Pages</NavLink></li>
          <li style={{cursor: 'pointer'}} onClick={() => {
            navigate(`/profile/${profile.id}/messages`)
          }}>
            <ChatLogo />
          </li>
          <li>
            <NotificationLogo />
          </li>
          <li className="liImg">
            <img 
            src={profile?.image} 
            alt=""
            onClick={() => navigate(`/profile/${profile.id}/info`)}
            />
            
          </li>
         
          <li className="LogOut" onClick={logOut}>
            Log Out
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
