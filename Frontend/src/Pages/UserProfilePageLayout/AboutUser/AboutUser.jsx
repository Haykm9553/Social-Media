
import { useDispatch} from 'react-redux';
import './AboutUser.css'
import { useLocation, useNavigate } from 'react-router-dom';

const AboutUser = () => {
  const location = useLocation()
  const user = location?.state;
  
  const profile = JSON.parse(localStorage.getItem("userProfile") || sessionStorage.getItem("userProfile"))

 
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
                
              </div>
           }
        
      </div>
    
    );
}

export default AboutUser