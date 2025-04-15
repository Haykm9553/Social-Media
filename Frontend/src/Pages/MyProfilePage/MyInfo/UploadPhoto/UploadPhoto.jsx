import { useDispatch, useSelector } from "react-redux";
import "./UploadPhoto.css";
import { AddNewPhoto, selectPhoto, selectUser } from "../../../../store/slices/UserSlice";


const UploadPhoto = () => {
  const dispatch = useDispatch();
  const {profile} = useSelector(selectUser)
  const token = localStorage.getItem('token')
  

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("photo", file);

    try {
      const response = await fetch("http://localhost:8000/api/upload-photo", {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        const newPhoto = { url: `http://localhost:8000${data.url}`, key: false, active: true };
        dispatch(AddNewPhoto(newPhoto))
        const updatedProfile = {
          ...profile,
          photo: [...(profile.photo || []), newPhoto],
        };

        if (profile?.id) {
          await fetch(`http://localhost:8000/api/users/${profile.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json","Authorization": `Bearer ${token}`, },
            body: JSON.stringify(updatedProfile),
          });
        } else {
          console.warn("⚠️ Нет ID профиля. PATCH запрос не отправлен.");
        }

        dispatch(selectPhoto(updatedProfile.photo.length - 1));
      }
    } catch (error) {
      console.error("Ошибка при загрузке:", error);
    }
  };

  const handleDeletePhoto = async (index) => {
    const newPhotos = profile.photo.filter((_, i) => i !== index);

    const updatedProfile = {
      ...profile,
      photo: newPhotos,
    };

    await fetch(`http://localhost:8000/api/users/${profile.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json","Authorization": `Bearer ${token}`, },
      body: JSON.stringify(updatedProfile),
    });
  };
  console.log(profile);
  
  return (
    <div className="UploadPhoto">
      <h2>Your Photos</h2>

      <div className="photo-gallery">
        {profile?.photo?.length === 0 ? (
          <p>No Photos</p>
        ) : (
          profile?.photo?.map((photo, index) => (
            <div className="photo-item" key={index}>
              <img src={photo.url} alt="UserPhoto" />
              <div className="photo-actions">
                <button onClick={() => dispatch(selectPhoto(index))}>
                  Select
                </button>
                <button onClick={() => handleDeletePhoto(index)}>
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="upload-form">
        <input type="file" onChange={handleFileUpload} />
        <button>Upload</button>
      </div>
    </div>
  );
};

export default UploadPhoto;
