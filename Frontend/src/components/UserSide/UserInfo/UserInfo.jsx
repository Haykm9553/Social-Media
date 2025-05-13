import "./UserInfo.css";
import { NavLink } from "react-router-dom";
const UserInfo = () => {

  const profile = JSON.parse(localStorage.getItem("userProfile") || sessionStorage.getItem("userProfile"))
  

  
  
  return (
    <article className="User">
      
        
          <div className="UserInfo">
            <img src={profile?.image} alt={profile?.first_name} />
            <h2>{profile?.first_name} {profile?.last_name}</h2>
            <p>UI / UX Designer</p>
          </div>
        
      
      <div className="UserViews">
        <div>
          <h3>358</h3>
          <p>Connection</p>
        </div>
        <div>
          <h3>85</h3>
          <p>Views</p>
        </div>
      </div>
      <div className="ViewProfile">
        <NavLink to={`/profile/${profile?.id}/info`} state={{ profile }}>View my profile</NavLink>
      </div>
    </article>
  );
};

export default UserInfo;
