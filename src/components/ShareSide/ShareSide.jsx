import NewsLent from './NewsLent/NewsLent'
import Share from './Share/Share'
import './ShareSide.css'

const ShareSide = () => {
    return (
        <main className='ShareSide'>
            <Share/>
            <NewsLent/>
        </main>
    )
}

export default ShareSide