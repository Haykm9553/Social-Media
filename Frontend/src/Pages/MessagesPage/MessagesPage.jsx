import React, { useEffect, useRef, useState } from 'react';
import './MessagesPage.css';
import { getToken } from '../../utils/auth';
import { useLocation } from 'react-router-dom';
import { Button } from 'primereact/button';
import CrossLogo from '../../SVG/CrossLogo';
import { useInView } from 'react-intersection-observer';
import GroupChat from './GroupChat/GroupChat';
import PrivateChat from './PrivateChat/PrivateChat';
import ChatSide from './ChatSide/ChatSide';
import GroupChatSide from './GroupChatSide/GroupChatSide';
import ChatDescriptionSide from './ChatDescriptionSide/ChatDescriptionSide';
import GroupChatDescriptionSide from './GroupChatDescriptionSide/GroupChatDescriptionSide';

const MessagesPage = () => {
  const [friendList, setFriendList] = useState([]);
  const [noChatFriendList, setNoChatFriendList] = useState([]);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [createChat, setCreateChat] = useState(false);
  const messagesEndRef = useRef(null);
  const location = useLocation();
  const [totalRecords, setTotalRecords] = useState(0);
  const [rows, setRows] = useState(6);
  const [first, setFirst] = useState(0);
  const passedFriend = location.state?.friend;
  const [chatType, setChatType] = useState("private");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showChatDescription,setShowChatDescription] = useState(false)
  
  const profile = JSON.parse(localStorage.getItem("userProfile") || sessionStorage.getItem("userProfile"));


  useEffect(() => {
    if (passedFriend) {
      setSelectedFriend(passedFriend);
      fetchMessages(passedFriend.chat_id);
    }
  }, []);

  const fetchNoChatFriends = async (pageNumber = 1) => {
    try {
      const token = getToken();
      const res = await fetch(`http://localhost:8000/api/friends/no-chat-friends?page=${pageNumber}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });
      const data = await res.json();
      setNoChatFriendList(data.data);
      setTotalRecords(data.total);
      setFirst((data.current_page - 1) * rows);
    } catch (error) {
      console.error("Failed to fetch no-chat friends:", error);
    }
  };

  const onPageChange = (event) => {
    const pageNumber = event.page + 1;
    fetchNoChatFriends(pageNumber);
  };

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const { ref, inView } = useInView();

  const fetchFriends = async (pageNumber = 1) => {
    try {
      const token = getToken();
      const res = await fetch(`http://localhost:8000/api/chats?page=${pageNumber}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });
      
      const data = await res.json();
      console.log(data.meta);

      setHasMore(data.meta.current_page < data.meta.total_pages);

      if (pageNumber === 1) {
        setFriendList(data.data);
      } else {
        setFriendList((prev) => [...(Array.isArray(prev) ? prev : []), ...data.data]);
      }
    } catch (error) {
      console.error("Failed to fetch friends:", error);
    } finally {
      setLoading(false);
    }

  };


  useEffect(() => {
    fetchFriends(page);
  }, [page]);

  useEffect(() => {
    if (inView && hasMore && !loading) {
      setLoading(true)  
      setPage(prev => prev + 1);
    }
  }, [inView, hasMore]);

  const fetchMessages = async (chatId) => {
    setLoading(true);
    if (!chatId) return;
    try {
      const token = getToken();
      const res = await fetch(`http://localhost:8000/api/messages?chat_id=${chatId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });
      const data = await res.json();
      setMessages(data);
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedFriend) return;
  
    try {
      const token = getToken();
  
     

      
      const messageBody = {
        chat_id: selectedFriend.id,
        content: newMessage,
      };
  
      if (selectedFriend.type === 'private') {
        messageBody.receiver_id = selectedFriend.user_id;
      }
  
      const res = await fetch('http://localhost:8000/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        body: JSON.stringify(messageBody),
      });
  
      const data = await res.json();
      setNewMessage('');
    } catch (error) {
      console.error("Failed to send message:", error);
    }
    setShowEmojiPicker(false)
  };
  
  useEffect(() => {
    if (createChat) {
      if (chatType === 'private') {
        fetchNoChatFriends();
      } else {
        getFriends(1); 
      }
    }
  }, [createChat, chatType]);

  const getFriends = async (pageNumber = 1) => {
    try {
      const token = getToken();
      const res = await fetch(`http://localhost:8000/api/friends/no-chat-friends?page=${pageNumber}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      });
      const data = await res.json();
      setNoChatFriendList(data.data);
      setTotalRecords(data.total);
      setFirst((data.current_page - 1) * rows);
    } catch (error) {
      console.error("Failed to fetch friends for group chat:", error);
    }
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);
  
  return (
    <div className="MessagePage">
      {createChat ? (
        noChatFriendList.length !== 0 ? (
          chatType === "private" ? (
            <PrivateChat
              setCreateChat={setCreateChat}
              chatType={chatType}
              setChatType={setChatType}
              totalRecords={totalRecords}
              onPageChange={onPageChange}
              rows={rows}
              first={first}
              noChatFriendList={noChatFriendList}
              setSelectedFriend={setSelectedFriend}
              fetchMessages={fetchMessages}
            />
          ) : (
            <GroupChat
              profileId = {profile.id}
              setCreateChat={setCreateChat}
              chatType={chatType}
              setChatType={setChatType}
              totalRecords={totalRecords}
              onPageChange={onPageChange}
              noChatFriendList={noChatFriendList}
            />
          )
        ) : (
          <header className="CreateChat">
            <div className="SelectedChatNoFriends">
              <div>
                <i onClick={() => setCreateChat(false)}>
                  <CrossLogo />
                </i>
              </div>
              <h1>No Friends Without Chat</h1>
            </div>
          </header>
        )
      ) : null}

      <aside className="AsideBarFriends">
        <div>
          <Button
            style={{ width: '150px', height: '40px', display: 'flex', justifyContent: 'center', gap: '5px', marginTop: '30px' }}
            label="Create Chat"
            icon="pi pi-user-plus"
            className="p-button-primary p-button-sm"
            onClick={() => setCreateChat(!createChat)}
          />
        </div>
        <div className="Myfriends">
          {friendList?.length !== 0 ? (
            friendList.map((el) => (
              el.type === "private" 
              ?
              <div
                className={`FriendListBar ${selectedFriend?.id === el.id ? 'active-friend' : ''}`}
                key={el.id}
                onClick={() => {
                  setSelectedFriend(el);
                  fetchMessages(el.id);
                }}
              >
                <div>
                  <img src={el.image} alt="friend" />
                </div>
                <div className="FriendName">
                  <div className='FriendNameFirstDiv'>
                    <p>{el.first_name}</p>
                    <p>{el.last_name}</p>
                  </div>
                  <p className="LastMessage">
                    {el.last_message ? el.last_message : <i>No Messages</i>}
                  </p>
                </div>
              </div>
              :
              <div
                className={`FriendListBar ${selectedFriend?.id === el.id ? 'active-friend' : ''}`}
                key={el.id}
                onClick={() => {
                  setSelectedFriend(el);
                  fetchMessages(el.id);
                }}
              >
                <div>
                  <img src={profile.image} alt="friend" />
                </div>
                <div className="FriendName">
                  <div className='FriendNameFirstDiv'>
                    <p>{el.name}</p>
                   
                  </div>
                  <p className="LastMessage">
                    {el.last_message ? el.last_message : <i>No Messages</i>}
                  </p>
                </div>
              </div> 
            ))
          ) : (
            <p>No Chats</p>
          )}
         {hasMore && <div ref={ref}></div>}
        </div>
      </aside>

      {selectedFriend ? 
      selectedFriend.type === "group" 
      ?
      <GroupChatSide 
        showEmojiPicker={showEmojiPicker}
        setShowEmojiPicker={setShowEmojiPicker}
        selectedFriend={selectedFriend}
        messages={messages}
        profile={profile}
        messagesEndRef={messagesEndRef}
        handleSendMessage={handleSendMessage}
        newMessage={newMessage}
        setNewMessage={setNewMessage}
        setMessages={setMessages}
        showChatDescription={showChatDescription}
        setShowChatDescription={setShowChatDescription}
        />
        :
        <ChatSide
        setMessages={setMessages}
        selectedFriend={selectedFriend}
        messages={messages}
        profile={profile}
        messagesEndRef={messagesEndRef}
        handleSendMessage={handleSendMessage}
        newMessage={newMessage}
        setNewMessage={setNewMessage}
        showEmojiPicker={showEmojiPicker}
        setShowEmojiPicker={setShowEmojiPicker}
        showChatDescription={showChatDescription}
        setShowChatDescription={setShowChatDescription}
        />
       : (
        <div className="selectFriend">
          <h1>Select a Friend</h1>
        </div>
      )}

      {
        selectedFriend?.type === "group"  
        ?
        showChatDescription 
        ? 
        <GroupChatDescriptionSide selectedFriend={selectedFriend} profile={profile} />
        :
        null
        :
        showChatDescription 
        ?
        <ChatDescriptionSide selectedFriend={selectedFriend} profile={profile}/>
        :
        null
      }
    </div>
  );
};

export default MessagesPage;
