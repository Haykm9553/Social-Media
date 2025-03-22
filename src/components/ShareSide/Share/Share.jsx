import './Share.css'
import { useDispatch, useSelector } from 'react-redux'
import { selectSideContent, setActiveSide } from '../../../store/slices/PostSlices/PostSlice'

const Share = () => {
    const dispatch = useDispatch()
    const activeSide = useSelector(selectSideContent)
    return (
        <div className='Share'>
            <nav className='NavForShare'>
            <button onClick={()=>dispatch(setActiveSide("SharePost"))} >Share an Update</button>
            <button onClick={()=>dispatch(setActiveSide("SharePhoto"))} >Share a photo</button>
            </nav>
            <div>
                {activeSide}
            </div>
        </div>
    )
}

export default Share