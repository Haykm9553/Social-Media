import ChangeEmoji from '../../../../../SVG/ChangeEmoji';
import Circle from '../../../../../SVG/Circle';
import EditNickname from '../../../../../SVG/EditNickname';
import './CustomizeChat.css';

export default function CustomizeChat({customizeChat, setCustomizeChat}) {
  return (
    <main className='CustomizeChat'>
    <div className='SetChatInfo' onClick={() => {setCustomizeChat(!customizeChat)}}>
    <b>Customize Chat</b>
    <i className='pi pi-angle-up'></i>
    </div>
    <div className='OpenedChatInfo'>
      <i><Circle/></i>
      <p>Change theme</p>
    </div>
    <div className='OpenedChatInfo'>
      <i><ChangeEmoji/></i>
      <p>Change emoji</p>
    </div>
    <div className='OpenedChatInfo'>
      <i><EditNickname/></i>
      <p>Edit nicknames</p>
    </div>
  </main>
  )
}
