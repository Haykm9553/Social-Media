import { Button } from 'primereact/button';
import { Paginator } from 'primereact/paginator';
import React, { useEffect, useState } from 'react';
import CrossLogo from '../../../SVG/CrossLogo';
import { getToken } from '../../../utils/auth';
import SetGroupChatDescription from './SetGroupChatDescription/SetGroupChatDescription';

export default function GroupChat({
  setCreateChat,
  chatType,
  setChatType,
  profileId
}) {
  const [loading, setLoading] = useState(true);
  const [friendList, setFriendList] = useState([]);
  const [page, setPage] = useState(1);
  const [rows, setRows] = useState(6);
  const [first, setFirst] = useState(0);
  const [totalRecords, setTotalRecords] = useState(0);
  const [groupChatFriends, setGroupChatFriends] = useState([]);
  const [groupChatDescription,setGroupChatDescription] = useState(false)

  const AddGroupChatFried = (friendId) => {
    setGroupChatFriends((prev) =>
      prev.includes(friendId)
        ? prev.filter((id) => id !== friendId)
        : [...prev, friendId]
    );
  };
  const handleSetChatDescpription = async () => {
    if (groupChatFriends.length < 2) {
      alert("Select at least 2 friends to create a group chat");
      return;
    }
   setGroupChatDescription(true)
  };
  
  const getFriends = async (pageNumber) => {
    setLoading(true);
    try {
      const token = getToken();
      const res = await fetch(`http://localhost:8000/api/friends/${profileId}?page=${pageNumber}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      if (!res.ok) {
        throw new Error('Failed to fetch');
      }

      const data = await res.json();
      
      if (Array.isArray(data.data)) {
        setTotalRecords(data.meta.total)
        setFriendList(data.data);
      } else {
        console.error("data.data is not an array:", data.data);
      }
    } catch (error) {
      console.error("Failed to fetch friends:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFriends(page);
  }, [page]);

  const handlePageChange = (event) => {
    const newPage = Math.floor(event.first / event.rows) + 1;
    setPage(newPage);
    setFirst(event.first);
  };

  return (    
      groupChatDescription 
      ?
      <SetGroupChatDescription
      setGroupChatFriends = {setGroupChatFriends}
      groupChatFriends={groupChatFriends}
      setCreateChat={setCreateChat}
      />
        :
        <header className="CreateChat">
  
        <div className="SelectedChat">
          <div>
            <div>
              <i onClick={() => setCreateChat(false)}>
                <CrossLogo />
              </i>
            </div>
          </div>
  
          <div className="chat-type-container">
            <label className="radio-label">
              <input
                type="radio"
                name="chatType"
                value="group"
                checked={chatType === "group"}
                onChange={(e) => setChatType(e.target.value)}
              />
              Group
            </label>
  
            <label className="radio-label">
              <input
                type="radio"
                name="chatType"
                value="private"
                checked={chatType === "private"}
                onChange={(e) => setChatType(e.target.value)}
              />
              Private
            </label>
          </div>
  
          <div className="selected-image-buttons">
            <div className="friend-grid">
              {friendList.map((el) => (
                <div
                  className="friend-card"
                  key={el.id}
                  onClick={() => AddGroupChatFried(el.id)}
                  style={{
                    backgroundColor: groupChatFriends.includes(el.id)
                      ? '#d1e7dd'
                      : '#fff',
                    cursor: 'pointer',
                    transition: '0.3s ease',
                  }}
                >
                  <img src={el.image} alt="friend" className="friend-avatar" />
                  <div className="friend-name">
                    <p>{el.first_name}</p>
                    <p>{el.last_name}</p>
                  </div>
                </div>
              ))}
            </div>
  
            <div className='SubmitButton'>
              <Button
                style={{
                  width: '150px',
                  height: '40px',
                  display: 'flex',
                  justifyContent: 'center',
                  gap: '5px',
                  marginTop: '30px'
                }}
                label="Create Chat"
                icon="pi pi-check"
                className="p-button-primary p-button-sm"
                onClick={handleSetChatDescpription}
              />
            </div>
  
            {totalRecords > 4 && (
              <div className="paginator-wrapper">
                <Paginator
                  first={first}
                  rows={rows}
                  totalRecords={totalRecords}
                  onPageChange={handlePageChange}
                  template="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                />
              </div>
            )}
          </div>
        </div>
      </header>
        
    
   
  );
}
