import React, { useState } from "react";
import { getToken } from "../../../../utils/auth";

const UploadPhoto = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) {
      console.log("No file selected");
      return; 
    }
  
    console.log("Selected file:", file); 
  
    const formData = new FormData();
    formData.append("image", file);
  
    console.log("FormData:", formData);
  
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
  
      console.log("File uploaded:", data);
  
      const newPhoto = {
        id: data.data.id,
        url: data.data.url,
        name: data.data.name,
        size: data.data.size, 
      };
  
      setPhotos((prev) => [...prev, newPhoto]);
    } catch (error) {
      console.error("Upload error:", error.message);
      alert("Ошибка загрузки: " + error.message);
    } finally {
      setLoading(false);
    }
  };
  

  const handleDeletePhoto = async (id) => {
    try {
      const response = await fetch(`http://localhost:8000/api/photos/${id}`, {
        method: "DELETE",
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
  };

  return (
    <div className="upload-photo">
      <h2>Загрузка фотографии</h2>

      <input type="file" onChange={handleFileUpload} disabled={loading} />

      {loading && <p>Загрузка...</p>}

      <div className="photo-list" style={{ display: "flex", gap: "20px", marginTop: "20px", flexWrap: "wrap" }}>
        {photos.map((photo) => (
          <div key={photo.id} style={{ textAlign: "center" }}>
            <img src={photo.url} alt={photo.name} width="150" style={{ borderRadius: "10px" }} />
            <p>{photo.name}</p>
            <button onClick={() => handleDeletePhoto(photo.id)}>Удалить</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UploadPhoto;
