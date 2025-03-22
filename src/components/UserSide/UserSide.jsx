import ProfileViews from './ProfileViews/ProfileViews'
import UserInfo from './UserInfo/UserInfo'
import './UserSide.css'

const UserSide = ({ User_Data, Loged_User_Data }) => (
  <section className="UserSide">
    <UserInfo User_Data={User_Data} Loged_User_Data={Loged_User_Data} />
    <ProfileViews />
  </section>
);

export default UserSide