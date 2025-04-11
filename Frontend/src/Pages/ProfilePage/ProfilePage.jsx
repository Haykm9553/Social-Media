import './ProfilePage.css'
import UserSide from '../../components/UserSide/UserSide'
import ShareSide from '../../components/ShareSide/ShareSide'
import PeopleYouKnowSide from '../../components/PeopleYouKnowSide/PeopleYouKnowSide'
import { useEffect, useState } from 'react';


const ProfilePage = ({ User_Data, Loged_User_Data }) => {
  



  return (
    <header className="ProfilePage">
      <UserSide User_Data={User_Data} Loged_User_Data={Loged_User_Data} />
      <ShareSide />
      <PeopleYouKnowSide />
    </header>
  );
};

export default ProfilePage