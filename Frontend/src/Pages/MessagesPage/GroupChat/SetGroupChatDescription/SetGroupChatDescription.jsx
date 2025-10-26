import React from 'react'
import './SetGroupChatDescription.css'
import { Button } from 'primereact/button'
import CrossLogo from '../../../../SVG/CrossLogo'
import { getToken } from '../../../../utils/auth'

export default function SetGroupChatDescription({groupChatFriends, setGroupChatFriends, setCreateChat}) {

  const handleCreateChat = async (e) => {
    e.preventDefault()
        const [name, description] = e.target
      
        try {
          const token = getToken();
          const res = await fetch('http://localhost:8000/api/chats/create-group-chat', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
              Accept: 'application/json',
            },
            body: JSON.stringify({
              type: 'group',
              users: groupChatFriends,
              name: name.value,
              description: description.value
            }),
          });
      
          if (!res.ok) throw new Error('Failed to create chat');
      
          const data = await res.json();
      
          setCreateChat(false); 
          setGroupChatFriends([]); 
        } catch (error) {
          console.error('Create chat failed:', error);
        }
  }
  return (
    <header className="GroupChat">
  
        <div className="SelectedChat">
          <div>
            <div>
              <i >
                <CrossLogo />
              </i>
            </div>
          </div>

  
  
          <div className="selected-image-buttons">
            
  
            <div className='SubmitButton'>
            <form onSubmit={(e) => handleCreateChat(e)}>

            <label htmlFor="">Chat Name</label>
            <input type="text" />
            <label htmlFor="">Chat Description</label>
            <input type="text" />
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
              />
            </form>
            </div>
  
            
          </div>
        </div>
      </header>
  )
}
