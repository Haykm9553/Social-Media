import './ProfilePage.css'
import UserSide from '../../components/UserSide/UserSide'
import ShareSide from '../../components/ShareSide/ShareSide'
import PeopleYouKnowSide from '../../components/PeopleYouKnowSide/PeopleYouKnowSide'
import { useNavigate } from 'react-router-dom'


const ProfilePage = ({ User_Data, Loged_User_Data }) => {
  const navigate = useNavigate();
  
    if (Loged_User_Data.length === 0) {
      navigate('/Login');
    } 


  return (
    <header className="ProfilePage">
      <UserSide User_Data={User_Data} Loged_User_Data={Loged_User_Data} />
      <ShareSide />
      <PeopleYouKnowSide />
    </header>
  );
};

export default ProfilePage