import ProfileViews from './ProfileViews/ProfileViews'
import UserInfo from './UserInfo/UserInfo'
import './UserSide.css'

const UserSide = ({ profile }) => (
  <section className="UserSide">
    <UserInfo profile={profile} />
    <ProfileViews />
  </section>
);

export default UserSide