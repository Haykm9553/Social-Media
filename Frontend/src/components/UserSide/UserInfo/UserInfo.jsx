import "./UserInfo.css";
import { NavLink } from "react-router-dom";
const UserInfo = ({User_Data,Loged_User_Data}) => {
  
  const FindImage = User_Data[0]?.Photo?.map((el) => {
    if(el.key){
      return el.url
    } else {
      return ""
    }
  });
  console.log(User_Data[0]);
  
  return (
    <article className="User">
      
        
          <div className="UserInfo">
            <img src={User_Data[0]?.image} alt={User_Data[0]?.first_name} />
            <h2>{User_Data[0]?.first_name} {User_Data[0]?.last_name}</h2>
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
        <NavLink to={`${User_Data[0]?.id}`}>View my profile</NavLink>
      </div>
    </article>
  );
};

export default UserInfo;
