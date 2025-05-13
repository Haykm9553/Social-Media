
import { useDispatch } from 'react-redux';
import './AboutMe.css'
import { useNavigate, useParams } from 'react-router-dom';
import { setActiveSection } from '../../../../store/slices/SectionSlice/SectionSlice';
import { useEffect, useState } from 'react';

const AboutMe = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState([]);
  const AuthId = JSON.parse(localStorage.getItem("userProfile") || sessionStorage.getItem("userProfile")).id


  const getUser = async () => {
    const res = await fetch(`http://localhost:8000/api/users/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      }
    });

    const data = await res.json();
    setProfile(data)

  }

  useEffect(() => {
    getUser()
  }, [])
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const goToSection = (section) => {
    dispatch(setActiveSection(section));
    navigate(`/profile/${profile.id}/info/${section.toLowerCase()}`);
  };

  return (
    <div className="info">
      {
        <div className='user-info' key={profile.id}>
          <div className='user-name'>
            <h3>{profile.first_name}</h3>
            <h3>{profile.last_name}</h3>
          </div>
          <p><strong>Age:</strong> {profile.age}</p>
          <p><strong>Bio:</strong> {profile.bio}</p>
          <p><strong>Location:</strong> {profile.location}</p>
          <p><strong>Profession:</strong> {profile.profession}</p>
          <p><strong>Hobbie:</strong> {profile.hobbies}</p>
          {
            AuthId === profile.id
              ?
              <button
                onClick={() => goToSection("Edit")}
                className="nav-button"
              >
                Edit
              </button>
              :
              null
          }
        </div>
      }

    </div>

  );
}

export default AboutMe