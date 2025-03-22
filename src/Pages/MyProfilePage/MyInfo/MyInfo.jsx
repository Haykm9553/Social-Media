import './MyInfo.css'

const MyInfo = ({Profile}) => {
    return (
        <div className='MyInfo'>
            <div className='AllInfo'>
                <img src={Profile.Image} alt="" />
                <div>
                <p>{Profile.FirstName}</p>
                <p>{Profile.LastName}</p>
                <span>Friends:330</span>
                </div>

            </div>
            
        </div>
    )
}

export default MyInfo