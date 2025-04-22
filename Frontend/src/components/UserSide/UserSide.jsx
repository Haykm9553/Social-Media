import ProfileViews from './ProfileViews/ProfileViews'
import UserInfo from './UserInfo/UserInfo'
import './UserSide.css'

const UserSide = ({ profile,token }) => (
  <section className="UserSide">
    <UserInfo profile={profile} token={token} />
    <ProfileViews />
  </section>
);

export default UserSide