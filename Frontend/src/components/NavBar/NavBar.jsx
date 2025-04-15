import "./NavBar.css";
import ChatLogo from "../../SVG/ChatLogo";
import NotificationLogo from "../../SVG/NotificationLogo";
import Logo from "../Img/Logo.jpeg";
import { useDispatch, useSelector } from "react-redux";
import { LogOut, selectUser } from "../../store/slices/UserSlice";
import { NavLink, useNavigate } from "react-router-dom";
const NavBar = () => {
  const navigate = useNavigate();
  const {profile} = useSelector(selectUser);
  const dispatch = useDispatch();
  
  const logOut = () => {

    const token = localStorage.getItem("token")
    fetch('http://localhost:8000/api/logout', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    })
      .then(res => res.json())
      .then(data => {
        console.log(data); 
        
      });
      dispatch(LogOut())
      navigate("/Login")
  };
  
  const FindImage = profile?.Photo?.map((el) => {
    if(el.key){
      return el.url
    } else {
      return ''
    }
  });
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
          <li>
            <ChatLogo />
          </li>
          <li>
            <NotificationLogo />
          </li>
          <li>
            <img src={profile?.image} alt="" />
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
