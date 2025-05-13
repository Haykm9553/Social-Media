
import './GroupChatMembers.css'
export default function GroupChatMembers({chatMembers, setChatMembers,selectedFriend}) {
  return (
    <main className='GroupChatMembers'>
       <div className='SetChatInfo' onClick={() => {setChatMembers(!chatMembers)}}>
       <b>Chat Members</b>
       <i className='pi pi-angle-up'></i>
       </div>
      {
        selectedFriend.participants.map((el,index) => {
          return (
            <div key={el.user_id} className="allGroupChatMembers">
              <img src={el.image} alt="iamge" />
             <div>
             <p>{el.first_name}</p>
             <p>{el.last_name}</p>
             </div>
            </div>
          )
        })
      }
     </main>
  )
}
