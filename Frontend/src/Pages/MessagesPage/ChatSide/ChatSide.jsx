import { Button } from 'primereact/button';
import React, { useEffect, useState } from 'react';
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';
import Echo from '../../../echo';

export default function ChatSide({
  selectedFriend,
  messages,
  profile,
  messagesEndRef,
  handleSendMessage,
  newMessage,
  setNewMessage,
  setShowEmojiPicker,
  showEmojiPicker,
  setShowChatDescription,
  showChatDescription,
  setMessages
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
  console.log(messages);
  

  return (
    <div className="Chat">
      <div className="ChatHeader">
        <div>
          <img src={selectedFriend?.image} alt="friend" />
          <h3>{selectedFriend?.first_name}</h3>
          <h3>{selectedFriend?.last_name}</h3>
        </div>
        <div>
          <button><i className='pi pi-phone'></i></button>
          <button><i className='pi pi-video'></i></button>
          <button onClick={() => setShowChatDescription(!showChatDescription)}><i className='pi pi-info'></i></button>
        </div>
      </div>

      <div className="ChatMessages">
      {messages.map((message, index) => {

          return (
            <div
              key={`${message.id}-${index}`}
              className="Message"
              style={{
                alignSelf: message.sender_id === profile.id ?  'flex-end' : 'flex-start',
                display:'flex',
                alignItems: 'end',                    
                justifyContent:'center'
              }}
            >
                {message.sender_id === profile.id ? null : <img src={selectedFriend.image} alt="Sender" />}
              <div className='NameAndMessage'> 
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
            style={{  width: '120px', height: '40px', borderRadius: '12px', display: "flex", gap: "5px", justifyContent:"center" }}
            label="Send"
            icon="pi pi-envelope"
          />
        </div>
      </form>
    </div>
  );
}
