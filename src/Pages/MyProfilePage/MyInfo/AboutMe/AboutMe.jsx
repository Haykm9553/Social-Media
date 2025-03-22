
import { useDispatch, useSelector } from 'react-redux';
import './AboutMe.css'
import { editProfile, selectUser,editedProfile } from '../../../../store/slices/UserSlice';

const AboutMe = () => {
  
    const {Loged_User_Data} = useSelector(selectUser)
    const dispatch = useDispatch()
    
    const handlerSubmit = async (e) => {
      e.preventDefault()
      const [FirstName,LastName,Age,Bio,Location,Profession,Hobbies] = e.target
      const newUser = {
        id: Loged_User_Data[0].id,
        FirstName: FirstName.value,
        LastName: LastName.value,
        Age: Age.value,
        Bio: Bio.value,
        Location: Location.value,
        Profession: Profession.value,
        Hobbies: Hobbies.value,
        Image: Loged_User_Data[0].Image,
      }
      await fetch(`http://localhost:3005/Loged_User/${Loged_User_Data[0].id}`, {
        method: 'PATCH',
        body: JSON.stringify(newUser),
      })
      dispatch(editedProfile(newUser))
      
      
    }
    return (
      <div className="info">
        {
          Loged_User_Data.map((user,index) => {
           if(user.isEditing){
            return (
              <div className='form-container' key={user.id}>
                <form onSubmit={(e) => handlerSubmit(e)}>
                <label>FirstName:</label>
                <input type="text" defaultValue={user.FirstName} />
                <label>LastName:</label>
                <input type="text" defaultValue={user.LastName} />
                <label>Age:</label>
                <input type="text" defaultValue={user.Age}/>
                <label>Bio:</label>
                <input type="text" defaultValue={user.Bio} />
                <label>Location:</label>
                <input type="text" defaultValue={user.Location} />
                <label>Profesion:</label>
                <input type="text"  defaultValue={user.Profession}/>
                <label>Hobbie:</label>
                <input type="text"defaultValue={user.Hobbies} />
                <button>Save</button>
                </form>
              </div>
            )
           } else {
            return (
              <div className='user-info' key={user.id}>
                <div className='user-name'>
                  <h3>{user.FirstName}</h3>
                  <h3>{user.LastName}</h3>
                </div>
                <p><strong>Age:</strong> {user.Age}</p>
                <p><strong>Bio:</strong> {user.Bio}</p>
                <p><strong>Location:</strong> {user.Location}</p>
                <p><strong>Profession:</strong> {user.Profession}</p>
                <p><strong>Hobbie:</strong> {user.Hobbies}</p>
                <button 
                className='edit-profile-button' onClick={() => {
                  dispatch(editProfile())
                }}>Edit Profile</button>
              </div>
            )
           }
          })
        }
      </div>
    
    );
}

export default AboutMe