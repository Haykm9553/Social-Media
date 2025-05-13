import React from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Avatar } from 'primereact/avatar';
import './UserCard.css'
import { useNavigate } from 'react-router-dom';
import { getToken } from '../../../../../utils/auth';
const UserCard = ({ userId,user, onDelete }) => {
  const AuthId = JSON.parse(localStorage.getItem("userProfile") || sessionStorage.getItem("userProfile")).id
  
  const navigate = useNavigate()
  const header = (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.5rem 0' }}>
      <Avatar image={user.image} size="large" shape="circle" />
      <div>
        <h5 style={{ margin: '0 0 0.25rem' }}>{user.first_name} {user.last_name}</h5>
        <small style={{ color: '#6c757d' }}>
          Age: {user.age} • Gender: {user.gender}
        </small>
      </div>
    </div>
  );

  const footer = (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems:'center',gap:'10px' }}>
      <Button 
        style={{width:'100px', height: '30px',display: 'flex', justifyContent:'center', gap: '5px', marginTop:'30px'}}
        label="Delete"
        icon="pi pi-trash"
        className="p-button-danger p-button-sm"
        onClick={onDelete}
      />
      <Button 
        style={{width:'100px', height: '30px',display: 'flex', justifyContent:'center', gap: '5px', marginTop:'30px'}}
        label="Message"
        icon="pi pi-envelope"
        className="p-button-primary p-button-sm"
        onClick={async () => {
          try {
            const profile = JSON.parse(localStorage.getItem("userProfile") || sessionStorage.getItem("userProfile"));
        
            const res = await fetch(`http://localhost:8000/api/chats/find-or-create`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getToken()}`,
                Accept: "application/json",
              },
              body: JSON.stringify({
                user_id: profile.id,
                friend_id: user.id,
              }),
            });
        
            const data = await res.json();
            
            
            
            
            if (data && data.chat_id) {
              navigate(`/profile/${profile.id}/messages`, {
                state: { friend: {...user, chat_id:data.chat_id} }
              });
            }
          } catch (error) {
            console.error("Error checking or creating chat:", error);
          }
        }}
      />
    </div>
  );

  return (
    <Card 
      header={header}
      footer={AuthId == userId ? footer : null}
      style={{
        width: '280px',
        minHeight: '240px',
        padding: '1rem',
        margin: '0.75rem',
        borderRadius: '14px',
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: '#ffffff'
      }}
    >
      <div style={{ paddingTop: '0.5rem', color: '#495057' }}>
        <p style={{ marginBottom: 0 }}>
          <strong>Hobby:</strong> {user.hobbies || 'N/A'}
        </p>
        <p style={{ marginBottom: 0 }}>
          <strong>Location:</strong> {user.location || 'Unknown'}
        </p>
      </div>
    </Card>
  );
};

export default UserCard;
