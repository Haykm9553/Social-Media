import { Button } from 'primereact/button'
import React, { useEffect, useState } from 'react'
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';
import Echo from '../../../echo';
import { getToken } from '../../../utils/auth';

export default function GroupChatSide({
  selectedFriend,
  messages,
  profile,
  messagesEndRef,
  handleSendMessage,
  newMessage,
  setMessages,
  setNewMessage,
  showEmojiPicker,
  setShowEmojiPicker,
  setShowChatDescription,
  showChatDescription
}) {

  const addEmoji = (emoji) => {
    setNewMessage(prev => prev + emoji.native);
  };

  useEffect(() => {
    Echo.private("chat").listen(".SendMessageEvent", (e) => {

      setMessages(prev => {
        const exists = prev.some(msg => msg.id === e.message.id);
        if (!exists) {
          return [...prev, e.message];
        }
        return prev;
      });
    });
  }, []);

  return (
    <div className="Chat">
      <div className="ChatHeader">
        <div>
          <img src={profile?.image} alt="friend" />
          <h3>{selectedFriend?.name}</h3>
        </div>
        <div>
          <button><i className='pi pi-phone'></i></button>
          <button><i className='pi pi-video'></i></button>
          <button onClick={() => setShowChatDescription(!showChatDescription)}><i className='pi pi-info'></i></button>
        </div>
      </div>

      <div className="ChatMessages">
        {messages.map((message, index) => {
          const sender = selectedFriend.participants.find(
            (el) => String(el.user_id) === String(message.sender_id)
          );

          return (
            <div
              key={`${message.id}-${index}`}
              className="Message"
              style={{
                gap:'5px',
                alignSelf: message.sender_id === profile.id ?  'flex-end' : 'flex-start',
                display:'flex',
                alignItems: 'end',
                justifyContent:'flex-start'
              }}
            >
                {sender?.user_id !== profile?.id ? <img src={sender?.image} alt="Sender" /> : null}
              <div className='NameAndMessage'> 
                    {sender ? <b style={{textAlign: message.sender_id === profile.id ? "end" : "start"}}>{sender?.first_name}</b> : null}
                <div className={`MessageSide ${message.sender_id === profile.id ? 'user' : 'friend'}`}>
                <p>{message.content}</p>
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef}></div>
      </div>

      <form className="ChatInput" onSubmit={handleSendMessage}>
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', width: '100%' }}>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Aa"
            style={{ flexGrow: 1, padding: '10px', borderRadius: '10px' }}
          />
          <button
            type="button"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            style={{ border: 'none', marginRight: '10px' }}
            className='pi pi-face-smile'
          >
            <i className="pi pi-smile" style={{ fontSize: '1.5rem' }}></i>
          </button>

          {showEmojiPicker && (
            <div style={{ position: 'absolute', bottom: '60px', right: '5px', zIndex: 100 }}>
              <Picker data={data} onEmojiSelect={addEmoji} theme="light" />
            </div>
          )}
          <Button
            type="submit"
            style={{ width: '120px', height: '40px', borderRadius: '12px', display: "flex", gap: "5px", justifyContent: "center" }}
            label="Send"
            icon="pi pi-envelope"
          />
        </div>
      </form>
    </div>
  );
}
