import '../AboutMeEdit/AboutMeEdit.css'
import { useDispatch } from 'react-redux'
import { editedProfile } from '../../../../../store/slices/UserSlice'
import { useNavigate } from 'react-router-dom';

export default function AboutMeEdit() {

  const profile = JSON.parse(localStorage.getItem("userProfile"))
  console.log(profile);
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handlerSubmit = async (e) => {
    const token = localStorage.getItem("token")
        e.preventDefault()
        const [FirstName,LastName,Age,Bio,Location,Profession,Hobbies] = e.target
        const newUser = {
          id: profile.id,
          first_name: FirstName.value,
          last_name: LastName.value,
          age: Age.value,
          bio: Bio.value,
          location: Location.value,
          profession: Profession.value,
          hobbies: Hobbies.value,
          image: profile.image,
          gender: profile.gender,
          login: profile.login,
          friend_request: profile.friend_request,
          friend_list: profile.friend_list,
          photo: profile.photo,
        }
        await fetch(`http://localhost:8000/api/users/${profile.id}`, {
          method: 'PATCH',
          body: JSON.stringify(newUser),
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            Accept: 'application/json'
            
          },
          
        })
        dispatch(editedProfile(newUser))
        navigate(`/profile/${profile.id}/info`)
        e.target.reset()
        
      }
  return (
    <div className='form-container' >
                    <form onSubmit={(e) => handlerSubmit(e)} >
                    <label>FirstName:</label>
                    <input type="text" defaultValue={profile.first_name} />
                    <label>LastName:</label>
                    <input type="text" defaultValue={profile.last_name} />
                    <label>Age:</label>
                    <input 
                    defaultValue={profile.age}
                    type="text"
                    onKeyDown={(e) => {
                      if(!/[0-9]/.test(e.key) && (e.key !== "Backspace" && e.key !== "Tab")) {
                        e.preventDefault();
                      }
                    }} 
                      
                    />
                    <label>Bio:</label>
                    <input type="text" defaultValue={profile.bio} />
                    <label>Location:</label>
                    <input type="text" defaultValue={profile.location} />
                    <label>Profesion:</label>
                    <input type="text" defaultValue={profile.profession} />
                    <label>Hobbie:</label>
                    <input type="text"defaultValue={profile.hobbies}  />
                    <button>Save</button>
                    </form>
                  </div>
  )
}
