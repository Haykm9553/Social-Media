import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../../store/slices/UserSlice";
import "./PeopleKnow.css";

const PeopleKnow = () => {
  const { users  } = useSelector(selectUser);
  const dispatch = useDispatch();
  const profile = JSON.parse(localStorage.getItem("userProfile"))
  
  return (
    <div className="PeopleKnow">
      <div className="PeopleYouMightKnow">
        <h3>People You Might Know</h3>
      </div>
      <div className="AllPeople">
      {users.filter((e) => e.id !== profile?.id && !profile?.friend_list.find((user)=>user.id===e.id)).map(
  (e, index) => {
    return (
      <div key={index} className="person-card">
        <img src={e.Image} alt="Icon" />
        <p className="name">
          {e.FirstName} {e.LastName}
        </p>
        <button
        className="add-button"
          onClick={ async() =>  {
              const newResult= {...e, friend_request: [...e.friend_request, {fromUser: profile}]}
              await fetch ((`http://localhost:3005/users_Data/${e?.id}`),{
              method: "PUT",
              body: JSON.stringify(newResult)
            })
          }}
        >
          Add
        </button>
      </div>
    );
  }
)}
      </div>
    </div>
  );
};

export default PeopleKnow;
