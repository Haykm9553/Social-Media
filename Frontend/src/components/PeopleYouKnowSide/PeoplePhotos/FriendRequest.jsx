import { useDispatch, useSelector } from 'react-redux'
import './FriendRequest.css'
import { AddFriend, RejectFriendRequest, selectUser } from '../../../store/slices/UserSlice'

const FriendRequest = () => {
    const {User_Data, Loged_User_Data}= useSelector(selectUser)
    const dispatch = useDispatch()
    // const request = profile?.FriendRequest[0]?.fromUser
    // const searchResult =User_Data.find((user)=>user.id===request?.id)
    
    return (
        <></>
    )
}

export default FriendRequest


/*{ <div className='FriendRequest'>
            <h2>Friend Request</h2>
            <div className="FriendRequestBody">
                {
                    profile?.FriendRequest?.length!==0 ?
                    <div> You have a friend request [<span> {profile?.FriendRequest.length} </span>]
                    <div  className="person-card">
                <img src={request?.Image} alt="Icon" />
                <p className="name">
                  {request?.FirstName} {request?.LastName}
                </p>
                <button className='add-button'
                onClick={
                    async() =>  {
                        dispatch(AddFriend(request))

                        const newResultForLogedUser= {...profile, FriendRequest: profile?.FriendRequest.toSpliced(0,1), FriendList: [...profile?.FriendList, request] }

                        const newResultForRequestUser= {...searchResult, FriendList: [...searchResult?.FriendList, {...profile, FriendRequest: profile?.FriendRequest.toSpliced(0,1)}]}

                        await fetch ((`http://localhost:3005/Loged_User/${profile?.id}`),{
                        method: "PUT",
                        body: JSON.stringify(newResultForLogedUser)
                      })
                        await fetch ((`http://localhost:3005/users_Data/${searchResult?.id}`),{
                        method: "PUT",
                        body: JSON.stringify(newResultForRequestUser)
                      })
                    }
                }
                >
                    Accept
                    </button>
                <button className='add-button'

                onClick={async()=>{
                    dispatch(RejectFriendRequest())
                    const NewResult = {...profile, FriendRequest: profile?.FriendRequest.toSpliced(0,1)}
                    await fetch ((`http://localhost:3005/Loged_User/${profile?.id}`),{
                        method: "PUT",
                        body: JSON.stringify(NewResult)
                      })
                }}
                >
                    Reject
                    </button>
                    </div>
                    </div>
                    :
                     <p>You have no friend request</p>
                }
            </div>
        </div> }*/