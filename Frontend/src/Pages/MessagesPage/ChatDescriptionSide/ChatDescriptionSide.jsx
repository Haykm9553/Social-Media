
import React, { useState } from 'react';
import './ChatDescriptionSide.css';
import AboutChat from './AboutChat/AboutChat';
import { useNavigate } from 'react-router-dom';
import MuteNotification from '../../../SVG/MuteNotification';
import UnmuteNotification from '../../../SVG/UnmuteNotification';
import SearchLogo from '../../../SVG/SearchLogo';
import ProfileLogo from '../../../SVG/ProfileLogo';
import VerifyEncoryption from '../../../SVG/VerifyEncoryption';

const ChatDescriptionSide = ({ selectedFriend, profile }) => {
  const navigate = useNavigate()
  const [Mute, setMute] = useState(false)
  if (!selectedFriend) return null;


  return (
    <div className="ChatDescriptionSide">
      <img src={selectedFriend.image} alt="Friend" className='DescriptionImage' />
      <h3>{selectedFriend.first_name} {selectedFriend.last_name}</h3>
      <div className="FriendInfo">

        <div className='FriendInfoChild'>
          <div className='Protection'>
            <i><VerifyEncoryption width="10" height="10"/></i>
            <b>End-to-end encryption</b>
          </div>
        </div>
      </div>
      <div className='FriendInfoButtons'>
        <div>
          <i
            style={{ fontSize: '18px' }}
            onClick={() => {
              navigate(`/profile/${selectedFriend.user_id}/info`)
            }}
          >
            <ProfileLogo/>
          </i>
          <span>Profile</span>
        </div>
        {
          Mute
            ?
            <div>
              <i onClick={() => setMute(!Mute)} style={{ fontSize: '18px' }}><UnmuteNotification /></i>
              <span>Mute</span>
            </div>
            :
            <div>
              <i onClick={() => setMute(!Mute)} style={{ fontSize: '18px' }}><MuteNotification /></i>
              <span>Unmute</span>
            </div>
        }
        <div>
          <i style={{ fontSize: '18px' }}><SearchLogo /></i>
          <span>Search</span>
        </div>
      </div>
      <AboutChat />
    </div>
  );
};

export default ChatDescriptionSide;
