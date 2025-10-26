/* eslint-disable react-hooks/exhaustive-deps */
import './FriendRequest.css'
import { useEffect, useState } from 'react'
import { Paginator } from 'primereact/paginator'
import { getToken} from '../../../utils/auth'
import { useNavigate } from 'react-router-dom'

const FriendRequest = () => {
  const profile = JSON.parse(localStorage.getItem("userProfile") || sessionStorage.getItem("userProfile"))
  const token = getToken()
  const navigate = useNavigate()
  const [requestsData, setRequestsData] = useState({ data: [], current_page: 1, total: 0 });


  const fetchRequests = async (page = 1) => {
    const res = await fetch(`http://localhost:8000/api/friends/request?page=${page}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
      }
    });

    const data = await res.json();
    
    setRequestsData(data);
  };

  useEffect(() => {
    fetchRequests();
  }, []);



  const handleAccept = async (id) => {
    
    await fetch(`http://localhost:8000/api/friends/accept/${id}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
      },
    });
    setRequestsData(prev => ({
        ...prev,
        data: prev.data.filter(r => r.id !== id),
        total: prev.total - 1
      }));
      fetchRequests()
  };

  const handleReject = async (id) => {
    await fetch(`http://localhost:8000/api/friends/decline/${id}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
      },
    });
    setRequestsData(prev => ({
        ...prev,
        data: prev.data.filter(r => r.id !== id),
        total: prev.total_items - 1
      }));
      fetchRequests()
  };

  

  return (
    <div className='FriendRequest'>
      <h2>Friend Request</h2>
      <div className="FriendRequestBody">
        <div>You have a friend request [<span>{requestsData?.meta?.total_items}</span>]</div>
        {
          requestsData.data.length !== 0 ? requestsData.data.map((el, index) => (
            <div key={index} className="person-card">
              <img 
              src={el?.image} 
              alt="Icon"
              onClick={()=>{
                navigate(`/profile/${el?.id}/info`, {
                  state: {profile:el}
                })
              }}  
              />
              <p className="name">{el.first_name} {el.last_name}</p>
              <button className='add-button' onClick={() => handleAccept(el.id)}>Accept</button>
              <button className='add-button' onClick={() => handleReject(el.id)}>Reject</button>
            </div>
          )) : <p>No Friend Requests</p>
        }
      </div>

      <div className="paginatorDiv">
        {
          requestsData?.meta?.total_items > 4 ? <Paginator
          first={(requestsData.meta?.current_page - 1) * 4}
          rows={4}
          totalRecords={requestsData.meta.total_items}
          onPageChange={(e) => fetchRequests(e.page + 1)}
          template="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
        />
        :
        ''
        }
      </div>
    </div>
  )
}

export default FriendRequest
