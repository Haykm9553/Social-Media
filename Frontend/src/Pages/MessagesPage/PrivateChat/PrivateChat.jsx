import React from 'react'
import CrossLogo from '../../../SVG/CrossLogo';
import { getToken } from '../../../utils/auth';
import { Paginator } from 'primereact/paginator';

export default function PrivateChat({ setCreateChat,
  chatType,
  setChatType,
  totalRecords,
  onPageChange,
  rows,
  first,
  noChatFriendList,
  setSelectedFriend,
  fetchMessages
}) {
  return (
    <header className="CreateChat">

      <div className="SelectedChat">
        <div>
          <div >
            <i onClick={() => setCreateChat(false)}>
              <CrossLogo />
            </i>
          </div>
        </div>
        <div className="chat-type-container">
          <label className="radio-label">
            <input
              type="radio"
              name="chatType"
              value="group"
              checked={chatType === "group"}
              onChange={(e) => setChatType(e.target.value)}
            />
            Group
          </label>

          <label className="radio-label">
            <input
              type="radio"
              name="chatType"
              value="private"
              checked={chatType === "private"}
              onChange={(e) => setChatType(e.target.value)}
            />
            Private
          </label>
        </div>

        <div className="selected-image-buttons">
          <div className="friend-grid">
            {noChatFriendList.map((el) => (
              <div
                className="friend-card"
                key={el.id}
                onClick={async () => {

                  try {
                    const profile = JSON.parse(localStorage.getItem("userProfile") || sessionStorage.getItem("userProfile"));
                    await fetch(`http://localhost:8000/api/chats/find-or-create`, {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${getToken()}`,
                        Accept: "application/json",
                      },
                      body: JSON.stringify({
                        user_id: profile.id,
                        friend_id: el.id,
                        friend_first_name: el.first_name,
                        chat_type: chatType
                      }),
                    });


                    setCreateChat(false);
                    setSelectedFriend(el);
                    fetchMessages(el.chat_id)
                  } catch (error) {
                    console.error("Error checking or creating chat:", error);
                  }
                }}
              >
                <img src={el.image} alt="friend" className="friend-avatar" />
                <div className="friend-name">
                  <p>{el.first_name}</p>
                  <p>{el.last_name}</p>
                </div>
              </div>
            ))}
          </div>

          {
            totalRecords > 4 ?
              <div className="paginator-wrapper">
                <Paginator
                  first={first}
                  rows={rows}
                  totalRecords={totalRecords}
                  onPageChange={onPageChange}
                  template="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                />
              </div>
              :
              ''
          }
        </div>

      </div>
    </header>
  )
}
