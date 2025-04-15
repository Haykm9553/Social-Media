import './ProfilePage.css'
import UserSide from '../../components/UserSide/UserSide'
import ShareSide from '../../components/ShareSide/ShareSide'
import PeopleYouKnowSide from '../../components/PeopleYouKnowSide/PeopleYouKnowSide'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';



const ProfilePage = () => {
  const navigate = useNavigate()
  
  const [profile, setProfile] = useState(null);
  
  
  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");

      try {
        const res = await fetch("http://localhost:8000/api/profile", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          throw new Error("Unauthorized");
        }

        const userProfile = await res.json();
        setProfile(userProfile);
        
      } catch (err) {
        console.error("Ошибка при загрузке профиля:", err);
      }
    };

    fetchProfile();
  }, []);




  return (
    <header className="ProfilePage">
      <UserSide profile={profile} />
      <ShareSide />
      <PeopleYouKnowSide />
    </header>
  );
};

export default ProfilePage