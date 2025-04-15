import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../../../store/slices/UserSlice";
import {DeleteFriend} from "../../../../store/slices/UserSlice";
import "./MyFriends.css";

const MyFriends = () => {
  const dispatch = useDispatch();
  const {users } = useSelector(selectUser);
  const profile = JSON.parse(localStorage.getItem("userProfile"))

  return (
    <div className="friends-container">
      <h3 className="friends-title">Friends List</h3>
      <ul className="friends-list">
      {
        profile.friend_list.length === 0 ?
        <div className="no-Friends">No Friends</div>
        :
          profile.friend_list.map(
            (user) => (
              <li key={user.id} className="friend-card">
                <img className="friend-avatar" src={user.image} alt="" />
                <div className="friend-info">
                  <h4 className="friend-name">
                    {user.first_name} {user.last_name}
                  </h4>
                  <p className="friend-detail">Age: {user.age}</p>
                  <p className="friend-detail">Gender: {user.gender}</p>
                  <button onClick={async ()=>{
                    dispatch(DeleteFriend(user))
                    const findUser = users.find((friend)=>friend.id===user.id)
                    const newResultforLogedUser= {...profile, friend_list: profile?.friend_list.filter((friend)=>friend.id!==user?.id)}
                    const newresultforDeletedUser = {...findUser, friend_list: findUser?.friend_list.filter((friend)=>friend.id!==profile?.id)  }
                    await fetch ((`http://localhost:3005/Loged_User/${profile?.id}`) ,{
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
          )
      }
      </ul>
    </div>
  );
};

export default MyFriends;
