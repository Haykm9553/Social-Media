import './ChatInfo.css';


export default function ChatInfo({chatInfo, setChatInfo}) {
  return (
    <main className='ChatInfo'>
      <div className='SetChatInfo' onClick={() => {setChatInfo(!chatInfo)}}>
      <b>Chat Info</b>
      <i className='pi pi-angle-up'></i>
      </div>
      <div className='OpenedChatInfo'>
        <i className='pi pi-thumbtack'></i>
        <p>View pinned messages</p>
      </div>
      <div className='OpenedChatInfo'>
        <i className='pi pi-comment'></i>
        <p>View archived messages</p>
      </div>
    </main>
  )
}
