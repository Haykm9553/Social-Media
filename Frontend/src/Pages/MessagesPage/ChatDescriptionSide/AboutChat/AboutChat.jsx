import React, { useState } from 'react'
import './AboutChat.css'
import ChatInfo from './ChatInfo/ChatInfo'
import CustomizeChat from './CustomizeChat/CustomizeChat'
import MediaFiles from './MediaFiles/MediaFiles'
import PrivacySupport from './PrivacySupport/PrivacySupport'
export default function AboutChat() {

  const [chatInfo, setChatInfo] = useState(false)
  const [customizeChat, setCustomizeChat] = useState(false)
  const [mediaFiles, setMediaFiles] = useState(false)
  const [privacySupport, setPrivacySupport] = useState(false)
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
