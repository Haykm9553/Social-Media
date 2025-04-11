import "./NavBar.css";
import ChatLogo from "../../SVG/ChatLogo";
import NotificationLogo from "../../SVG/NotificationLogo";
import Logo from "../Img/Logo.jpeg";
import { useDispatch, useSelector } from "react-redux";
import { LogOut, selectUser } from "../../store/slices/UserSlice";
import { NavLink, useNavigate } from "react-router-dom";
const NavBar = () => {
  const navigate = useNavigate();
  const {User_Data, Loged_User_Data } = useSelector(selectUser);
  const dispatch = useDispatch();

  const logOut = () => {
    fetch(`http://localhost:3005/users_Data/${Loged_User_Data[0]?.id}`, {
      method: "PUT",
      body: JSON.stringify(Loged_User_Data[0]),
    });

    fetch(`http://localhost:3005/Loged_User/${Loged_User_Data[0].id}`, {
      method: "DELETE",
    });
    dispatch(LogOut());
    navigate("/Login");
  };

  const FindImage = Loged_User_Data[0]?.Photo?.map((el) => {
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
            if (Loged_User_Data.length === 0) {
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

          <li><NavLink to={"Pages"}>Pages</NavLink></li>
          <li>
            <ChatLogo />
          </li>
          <li>
            <NotificationLogo />
          </li>
          <li>
            <img src={User_Data[0]?.image} alt="" />
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
