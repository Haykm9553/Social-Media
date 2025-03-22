import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../../store/slices/UserSlice";
import "./PeopleKnow.css";

const PeopleKnow = () => {
  const { User_Data, Loged_User_Data } = useSelector(selectUser);
  const dispatch = useDispatch();
  return (
    <div className="PeopleKnow">
      <div className="PeopleYouMightKnow">
        <h3>People You Might Know</h3>
      </div>
      <div className="AllPeople">
      {User_Data.filter((e) => e.id !== Loged_User_Data[0]?.id && !Loged_User_Data[0]?.FriendList.find((user)=>user.id===e.id)).map(
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
                      const newResult= {...e, FriendRequest: [...e.FriendRequest, {fromUser: Loged_User_Data[0]}]}
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
