import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../../../store/slices/UserSlice";
import {DeleteFriend} from "../../../../store/slices/UserSlice";
import "./MyFriends.css";

const MyFriends = () => {
  const dispatch = useDispatch();
  const {User_Data, Loged_User_Data } = useSelector(selectUser);

  return (
    <div className="friends-container">
      <h3 className="friends-title">Friends List</h3>
      <ul className="friends-list">
        {Loged_User_Data[0].FriendList.map(
          (user) => (
            <li key={user.id} className="friend-card">
              <img className="friend-avatar" src={user.Image} alt="" />
              <div className="friend-info">
                <h4 className="friend-name">
                  {user.FirstName} {user.LastName}
                </h4>
                <p className="friend-detail">Age: {user.Age}</p>
                <p className="friend-detail">Gender: {user.gender}</p>
                <button onClick={async ()=>{
                  dispatch(DeleteFriend(user))
                  const findUser = User_Data.find((friend)=>friend.id===user.id)
                  const newResultforLogedUser= {...Loged_User_Data[0], FriendList: Loged_User_Data[0]?.FriendList.filter((friend)=>friend.id!==user?.id)}
                  const newresultforDeletedUser = {...findUser, FriendList: findUser?.FriendList.filter((friend)=>friend.id!==Loged_User_Data[0]?.id)  }
                  await fetch ((`http://localhost:3005/Loged_User/${Loged_User_Data[0]?.id}`) ,{
                  method: "PUT",
                  body: JSON.stringify(newResultforLogedUser)    
                })
                  await fetch ((`http://localhost:3005/users_Data/${findUser?.id}`) ,{
                  method: "PUT",
                  body: JSON.stringify(newresultforDeletedUser) 
                })

                  }}
                  >Delete</button>
              </div>
            </li>
          )
        )}
      </ul>
    </div>
  );
};

export default MyFriends;
