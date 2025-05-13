import React, { useEffect, useState } from "react";
import { getToken } from "../../../../utils/auth";
import { useDispatch } from "react-redux";
import CrossLogo from '../../../../SVG/CrossLogo';
import {SelectPhotoToMain } from "../../../../store/slices/UserSlice";
import "./UploadPhoto.css";
import { ProgressSpinner } from "primereact/progressspinner";
import { useParams } from "react-router-dom";
const UploadPhoto = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const profile = JSON.parse(localStorage.getItem("userProfile") || sessionStorage.getItem("userProfile"))
  const {id} = useParams()

  
  const fetchPhotos = async () => {
    const res = await fetch(`http://localhost:8000/api/photos/${id}`, {
      headers: {
        'Authorization': `Bearer ${getToken()}`,
        'Accept': 'application/json'
      }
    });

    const data = await res.json();
    
    
    
    const newData = data.data.map((el, index) => {
      return ({ ...el, 'active': false });
    })
    setPhotos(newData)
    

  };

  useEffect(() => {
    fetchPhotos();
  }, []);
  const handleSelectPhoto = (selectedPhoto) => {
    setPhotos((prev) =>
      prev.map((photo) => {
        if (photo.id === selectedPhoto.id) {
          return { ...photo, active: !photo.active }; 
        } else {
          return { ...photo, active: false }; 
        }
      })
    );
  };



  const handleFileUpload = async (e) => {
    e.preventDefault()
    const [photoInput] = e.target
    const file = photoInput.files[0]

    if (!file) {
      console.log("No file selected");
      return;
    }


    const formData = new FormData();
    formData.append("image", file);
    


    try {
      setLoading(true);
      const response = await fetch("http://localhost:8000/api/photos", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${getToken()}`,
          Accept: "application/json",
        },
        body: formData,
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Upload failed");
      }


      const newPhoto = {
        id: data.data.id,
        url: data.data.url,
        name: data.data.name,
        size: data.data.size,
        active: false
      };

      setPhotos((prev) => [...prev, newPhoto]);
    } catch (error) {
      console.error("Upload error:", error.message);
      alert("Ошибка загрузки: " + error.message);
    } finally {
      setLoading(false);
    }
    e.target.reset()
  };


  const handleDeletePhoto = async (id) => {
    try {
      const response = await fetch(`http://localhost:8000/api/photos/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${getToken()}`,
          Accept: "application/json",
        }
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Delete failed");
      }

      setPhotos((prev) => prev.filter((photo) => photo.id !== id));
    } catch (error) {
      console.error("Delete error:", error.message);
      alert("Ошибка удаления: " + error.message);
    }
    
    
    photos.map((el,index) => {
      if (profile.image === el.url) {
        const defaultImage = profile.gender === 'Man' 
          ? 'http://localhost:8000/storage/Image/Man-Photo.webp' 
          : 'http://localhost:8000/storage/Image/Woman-Photo.png';
  
        profile.image = defaultImage;
  
        if(JSON.parse(localStorage.getItem("userProfile"))){
  
          localStorage.setItem("userProfile", JSON.stringify(profile));
        } else {
          
          sessionStorage.setItem("userProfile", JSON.stringify(profile));
        }
  
      }
    })
  };
  const handleSetMainPhoto = async (photo) => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:8000/api/users/set-main-photo", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${getToken()}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          photo_id: photo.id, 
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to set as main photo");
      }
      setPhotos((prev) =>
        prev.map((el) => {
          if (el.id === photo.id) {
            return { ...el, active: true }; 
          }
          return { ...el, active: false }; 
        })
        
      );
    } catch (error) {
      console.error("Error setting main photo:", error.message);
      alert("Ошибка: " + error.message);
    } finally {
      dispatch(SelectPhotoToMain(photo.url))
      setPhotos((prev) =>
        prev.map((photo) => ({ ...photo, active: false }))
    );  
    setLoading(false);
    }
  };
  useEffect(() => {
    const isPhotoSelected = photos.some(photo => photo.active);
    if (isPhotoSelected) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [photos]);

  return (
    <div className="UploadPhoto">
      {
        id == profile.id 
        ?
        <form onSubmit={(e) => handleFileUpload(e)} className="upload-form">
        <label className="custom-file-upload">
          <input type="file" disabled={loading} />
          📁 Select File
        </label>
        <button disabled={loading}>Add</button>
      </form>
      :
      null
      }

      {loading && <div style={{width:'20px', aspectRatio:1}}><ProgressSpinner /></div>}

      <div className="MyPhotos" >
      {photos.length !== 0 ? (
    photos.map((photo, index) => {
      if (photo.active) {
        return (
          <header key={photo.id} className="Selected-Photo">
            <div className="Selected-Image">
              <div>
                <i onClick={() => handleSelectPhoto(photo)}>
                  <CrossLogo />
                </i>
              </div>
              <img src={photo.url} alt="myProfile" />
              <div className="Selected-Image-Buttons" key={index}>
                <button onClick={() => handleDeletePhoto(photo.id)}>Delete</button>
                <button onClick={() => handleSetMainPhoto(photo)}>Add As Main Photo</button>
              </div>
            </div>
          </header>
        );
      } else {
        return (
          <div key={photo.id} onClick={() => handleSelectPhoto(photo)}>
            <img src={photo.url} alt={photo.name} width="150" style={{ borderRadius: "10px" }} />
          </div>
        );
      }
    })
  ) : (
    <p>No Photos</p>
  )}
      </div>
    </div>
  );
};

export default UploadPhoto;
