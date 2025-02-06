import "./UserInfo.css";
import { NavLink } from "react-router-dom";
const UserInfo = ({User_Data,Loged_User_Data}) => {

  const FindImage = Loged_User_Data[0]?.Photo?.map((el) => {
    if(el.key){
      return el.url
    } else {
      return ""
    }
  });
  return (
    <article className="User">
      {Loged_User_Data?.map((user, index) => {
        return (
          <div key={index} className="UserInfo">
            <img src={FindImage.length !== 0 ? FindImage : user.Image} alt={user.FirstName} />
            <h2>{user.FirstName} {user.LastName}</h2>
            <p>UI / UX Designer</p>
          </div>
        );
      })}
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
        <NavLink to={`${Loged_User_Data[0]?.id}`}>View my profile</NavLink>
      </div>
    </article>
  );
};

export default UserInfo;
