import PeopleKnow from './PeopleKnow/PeopleKnow'
import FriendRequest from './PeoplePhotos/FriendRequest'
import './PeopleYouKnowSide.css'

const PeopleYouKnowSide = () => {
    return (
        <aside className='PeopleYouKnowSide'>
            <PeopleKnow/>
            <FriendRequest/>
        </aside>
    )
}

export default PeopleYouKnowSide