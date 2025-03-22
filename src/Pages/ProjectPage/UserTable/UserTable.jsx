import './UserTable.css'
import FirstTable from './FirstUser/FirstUser'
import SecondTable from './SecondTable/SecondTable'
import ThirdTable from './ThirdTable/ThirdTable'

const UserTable = () => {
    return (
        <div className='UserTable'>
            <FirstTable/>
            <SecondTable/>
            <ThirdTable/>
        </div>
    )
}

export default UserTable