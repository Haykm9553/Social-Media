import './ProfilePage.css'
import UserSide from '../../components/UserSide/UserSide'
import ShareSide from '../../components/ShareSide/ShareSide'
import PeopleYouKnowSide from '../../components/PeopleYouKnowSide/PeopleYouKnowSide'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getToken } from '../../utils/auth';
import { useDispatch } from 'react-redux';

const ProfilePage = () => {
 
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const token = getToken()
  useEffect(() => {

    const fetchProfile = async () => {

      if (!token) {
        console.warn("No token found, redirecting to login");
        navigate("/"); 
        return;
      }

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
        navigate("/login");
      }
    };

    fetchProfile();
    
  }, [navigate]);


  return (
    <header className="ProfilePage">
      <UserSide />
      <ShareSide />
      <PeopleYouKnowSide />
    </header>
  );
};

export default ProfilePage;
