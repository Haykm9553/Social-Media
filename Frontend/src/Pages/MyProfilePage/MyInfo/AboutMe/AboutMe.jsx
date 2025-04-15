
import { useDispatch} from 'react-redux';
import './AboutMe.css'
import { useNavigate } from 'react-router-dom';
import { setActiveSection } from '../../../../store/slices/SectionSlice/SectionSlice';

const AboutMe = () => {
  
  const profile = JSON.parse(localStorage.getItem("userProfile"))
    const dispatch = useDispatch()
    const navigate =useNavigate()
    const goToSection = (section) => {
        dispatch(setActiveSection(section));
        navigate(`/profile/${profile.id}/info/${section.toLowerCase()}`);
      };
    console.log(profile);
    
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
                <button
              onClick={() => goToSection("Edit")}
              className="nav-button"
            >
              Edit
            </button>
              </div>
           }
        
      </div>
    
    );
}

export default AboutMe