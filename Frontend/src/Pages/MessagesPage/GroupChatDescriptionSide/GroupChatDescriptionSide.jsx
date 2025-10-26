import React, { useState } from 'react'
import './GroupChatDescriptionSide.css'
import AboutGroupChat from './AboutGroupChat/AboutGroupChat';
import MuteNotification from '../../../SVG/MuteNotification';
import SearchLogo from '../../../SVG/SearchLogo';
import UnmuteNotification from '../../../SVG/UnmuteNotification';

export default function GroupChatDescriptionSide({selectedFriend,profile}) {
  const [Mute,setMute] = useState(false)
  if (!selectedFriend) return null;
  return (
    <div className="GroupChatDescriptionSide">
        <img className='GroupChatDescriptionImage' src={profile.image} alt="Friend" />
      <div className="ParticipantsInfo">
      <h2>{selectedFriend.name}</h2>
        <div className='GroupChatButtons'>
          {
            Mute 
            ?
          <div>
            <i onClick={() => setMute(!Mute)}><MuteNotification/></i>
            <p>Unmute</p>
          </div>
          :
          <div>
            <i onClick={() => setMute(!Mute)}><UnmuteNotification/></i>
            <p>Mute</p>
          </div>
          }
          <div>
            <i><SearchLogo/></i>
            <p>Search</p>
          </div>
        </div>
      </div>
      <AboutGroupChat selectedFriend={selectedFriend}/>
    </div>
  );
}
