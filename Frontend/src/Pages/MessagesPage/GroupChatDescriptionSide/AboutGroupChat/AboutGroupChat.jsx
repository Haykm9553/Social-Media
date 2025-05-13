
import React, { useState } from 'react'
import ChatInfo from '../../ChatDescriptionSide/AboutChat/ChatInfo/ChatInfo'
import CustomizeChat from '../../ChatDescriptionSide/AboutChat/CustomizeChat/CustomizeChat'
import MediaFiles from '../../ChatDescriptionSide/AboutChat/MediaFiles/MediaFiles'
import PrivacySupport from '../../ChatDescriptionSide/AboutChat/PrivacySupport/PrivacySupport'
import GroupChatMembers from './GroupChatMembers/GroupChatMembers'

export default function AboutGroupChat({selectedFriend}) {

  const [chatInfo, setChatInfo] = useState(false)
  const [customizeChat, setCustomizeChat] = useState(false)
  const [mediaFiles, setMediaFiles] = useState(false)
  const [privacySupport, setPrivacySupport] = useState(false)
  const [chatMembers, setChatMembers] = useState(false)
  return (
    <div className='AboutChat'>

      {
        chatInfo
          ?
          <ChatInfo setChatInfo={setChatInfo} chatInfo={chatInfo} />
          :
          <div onClick={() => { setChatInfo(!chatInfo) }}>
            <b>Chat Info</b>
            <i className='pi pi-angle-down'></i>
          </div>
      }

      {
        customizeChat
          ?
          <CustomizeChat customizeChat={customizeChat} setCustomizeChat={setCustomizeChat} />
          :
          <div onClick={() => setCustomizeChat(!customizeChat)}>
            <b>Customize Chat</b>
            <i className='pi pi-angle-down'></i>
          </div>
      }

      {
        chatMembers
        ?
       <GroupChatMembers  chatMembers={chatMembers} setChatMembers={setChatMembers} selectedFriend={selectedFriend}/>
        :
        <div onClick={() => setChatMembers(!chatMembers)}>
            <b>Chat Members</b>
            <i className='pi pi-angle-down'></i>
          </div>
      }
      {
        mediaFiles
          ?
          <MediaFiles setMediaFiles={setMediaFiles} mediaFiles={mediaFiles} />
          :
          <div onClick={() => { setMediaFiles(!mediaFiles) }}>
            <b>Media & files</b>
            <i className='pi pi-angle-down'></i>
          </div>
      }
      {
        privacySupport
          ?
          <PrivacySupport setPrivacySupport={setPrivacySupport} privacySupport={privacySupport} />
          :
          <div onClick={() => {setPrivacySupport(!privacySupport)}}>
            <b>Privacy & support</b>
            <i className='pi pi-angle-down'></i>
          </div>

      }

    </div>
  )
}
