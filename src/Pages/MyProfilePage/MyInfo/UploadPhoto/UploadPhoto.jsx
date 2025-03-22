import { useDispatch, useSelector } from "react-redux";
import "./UploadPhoto.css";
import {
  AddNewPhoto,
  deletePhoto,
  selectPhoto,
  SelectPhotoToMain,
  selectUser,
} from "../../../../store/slices/UserSlice";
import { useEffect, useState } from "react";
import CrossLogo from "../../../../SVG/CrossLogo";
const UploadPhoto = () => {
  const dispatch = useDispatch();
  const [uploadedPhoto, setUploadedPhoto] = useState(null);
  const [key, setKey] = useState(false);
  const { User_Data, Loged_User_Data } = useSelector(selectUser);
  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setUploadedPhoto(reader.result);
    };
  };


  useEffect(() => {
    fetch(`http://localhost:3005/Loged_User/${Loged_User_Data[0].id}`, {
      method: "PUT",
      body: JSON.stringify(Loged_User_Data[0]),
    });
  }, [key]);

  const HandlerAddNewPhoto = async () => {
    if (uploadedPhoto !== null) {
      dispatch(AddNewPhoto({ key: false, url: uploadedPhoto, active: false }));
      const newresult = {
        ...Loged_User_Data[0],
        Photo: [
          ...Loged_User_Data[0].Photo,
          { key: false, url: uploadedPhoto, active: false },
        ],
      };
      const endRes = await fetch(
        `http://localhost:3005/Loged_User/${Loged_User_Data[0].id}`,
        {
          method: "PUT",
          body: JSON.stringify(newresult),
        }
      );
      return endRes;
    } else {
      alert("Please Select Photo");
    }
  };
  const handlerDeletePhoto = async(index) => { 
    

    
    const newresult = {
      ...Loged_User_Data[0],
      Photo: Loged_User_Data[0].Photo.filter((el,indexEl) => index != indexEl)
      
    };
      const endRes = await fetch(
        `http://localhost:3005/Loged_User/${Loged_User_Data[0].id}`,
        {
          method: "PUT",
          body: JSON.stringify(newresult),
        }
      );
      return endRes;
  }


  return (
    <div className="UploadPhoto">
      {Loged_User_Data[0]?.Photo?.map((el, index) => {
        if (el.active) {
          return (
            <header className="Selected-Photo">
              <div className="Selected-Image">
                <div>
                  <i onClick={() => dispatch(selectPhoto(index))}>
                    <CrossLogo />
                  </i>
                </div>
                <img src={el.url} alt="photo" />
                <div className="Selected-Image-Buttons" key={index}>
                  <button
                    onClick={() => {
                      dispatch(deletePhoto(index)) 
                      handlerDeletePhoto(index)
                    }}
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => {
                      dispatch(SelectPhotoToMain(index));
                      setKey(true);
                    }}
                  >
                    Add As Main Photo
                  </button>
                </div>
              </div>
            </header>
          );
        }
      })}
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.target.reset();
          }}
        >
          <input
            type="file"
            name="myImage"
            onChange={(event) => handlePhotoUpload(event)}
          />
          <button onClick={HandlerAddNewPhoto}>Upload</button>
        </form>
      </div>
      <div className="MyPhotos">
        {Loged_User_Data[0].Photo.length === 0 ? (
          <p>No Photos</p>
        ) : (
          Loged_User_Data[0].Photo.map((photo, index) => {
            return (
              <img
                onClick={() => dispatch(selectPhoto(index))}
                src={photo.url}
                alt="photo"
                key={index}
              />
            );
          })
        )}
      </div>
    </div>
  );
};

export default UploadPhoto;
