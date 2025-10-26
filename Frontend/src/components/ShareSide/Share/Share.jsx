import './Share.css';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveSide, selectActiveSide } from '../../../store/slices/PostSlices/PostSlice';
import SharedPost from './SharedPost/SharedPost';
import SharePhotoNews from './SharePhotoNews/SharePhotoNews';



const Share = () => {
  const dispatch = useDispatch();
  const activeSide = useSelector(selectActiveSide);

  const renderContent = () => {
    switch (activeSide) {
      case "SharePost":
        return <SharedPost />;
      case "SharePhoto":
        return <SharePhotoNews />;
      default:
        return <p>Select Side</p>;
    }
  };

  return (
    <div className="Share">
      <nav className="NavForShare">
        <button onClick={() => dispatch(setActiveSide("SharePost"))}>Share an Update</button>
        <button onClick={() => dispatch(setActiveSide("SharePhoto"))}>Share a photo</button>
      </nav>
      <div>
        {renderContent()}
      </div>
    </div>
  );
};

export default Share;
