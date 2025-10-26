import ProfileViews from './ProfileViews/ProfileViews'
import UserInfo from './UserInfo/UserInfo'
import './UserSide.css'

const UserSide = () => (
  <section className="UserSide">
    <UserInfo  />
    <ProfileViews />
  </section>
);

export default UserSide