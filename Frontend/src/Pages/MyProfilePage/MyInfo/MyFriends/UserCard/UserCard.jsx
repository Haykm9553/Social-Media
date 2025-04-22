import React from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Avatar } from 'primereact/avatar';
import './UserCard.css'
const UserCard = ({ user, onDelete }) => {
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
    <div style={{ display: 'flex', justifyContent: 'center', alignItems:'center' }}>
      <Button 
        style={{width:'100px', height: '30px',display: 'flex', justifyContent:'center', gap: '5px', marginTop:'30px'}}
        label="Delete"
        icon="pi pi-trash"
        className="p-button-danger p-button-sm"
        onClick={onDelete}
      />
    </div>
  );

  return (
    <Card 
      header={header}
      footer={footer}
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
