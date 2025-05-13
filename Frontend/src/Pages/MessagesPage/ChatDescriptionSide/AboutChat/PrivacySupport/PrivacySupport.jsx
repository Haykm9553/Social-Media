import React from 'react'
import MuteNotification from '../../../../../SVG/MuteNotification'
import DisapearingMessage from '../../../../../SVG/DisapearingMessage'
import ReadRecepts from '../../../../../SVG/ReadRecepts'
import VerifyEncoryption from '../../../../../SVG/VerifyEncoryption'
import Restrict from '../../../../../SVG/Restrict'
import Block from '../../../../../SVG/Block'

export default function PrivacySupport({setPrivacySupport,privacySupport}) {
  return (
    <main className='ChatInfo'>
      <div className='SetChatInfo' onClick={() => {setPrivacySupport(!privacySupport)}}>
      <b>Privacy & support</b>
      <i className='pi pi-angle-up'></i>
      </div>
      <div className='OpenedChatInfo'>
        <i><MuteNotification/></i>
        <p>Mute notifications</p>
      </div>
      <div className='OpenedChatInfo'>
        <i><DisapearingMessage/></i>
        <p>Disapearing messages</p>
      </div>
      <div className='OpenedChatInfo'>
        <i><ReadRecepts/></i>
        <p>Read Receipts</p>
      </div>
      <div className='OpenedChatInfo'>
        <i><VerifyEncoryption/></i>
        <p>Verify end-to-end encryption</p>
      </div>
      <div className='OpenedChatInfo'>
        <i><Restrict/></i>
        <p>Restrict</p>
      </div>
      <div className='OpenedChatInfo'>
        <i><Block/></i>
        <p>Block</p>
      </div>
      <div className='OpenedChatInfo'>
        <i><Block/></i>
        <p>Report</p>
      </div>
    </main>
  )
}
