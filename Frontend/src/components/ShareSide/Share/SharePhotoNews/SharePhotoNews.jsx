import React, { useState } from 'react'
import "./SharePhotoNews.css"
import { useDispatch } from 'react-redux'
import { AddPost } from '../../../../store/slices/NewsSlices/NewsSlice'
import { getToken } from '../../../../utils/auth'

const SharePhotoNews = () => {
    const dispatch = useDispatch()
    const [showImage, setShowImage] = useState(null)
    const profile = JSON.parse(localStorage.getItem("userProfile") || sessionStorage.getItem("userProfile"))
    const handlerChange = (e) => {
        const file = e.target.files[0]
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
            setShowImage(reader.result)
        }
    }
    const FindImage = profile?.Photo?.map((el) => {
        if (el.key) {
            return el.url
        } else {
            return ''
        }
    });
    const handlerSubmit = async (e) => {
        e.preventDefault();
        const [photo, description] = e.target;
        const file = photo.files[0];
      
        if (!file) {
          alert("Выберите файл");
          return;
        }
      
        const formData = new FormData();
        formData.append("image", file);
        formData.append("content", description.value); 
      
        try {
          const response = await fetch("http://localhost:8000/api/posts/photo", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${getToken()}`,
              Accept: "application/json",
              
            },
            body: formData,
          });
      
          const result = await response.json();
          console.log("Успешно загружено:", result);
      
          e.target.reset();
        } catch (error) {
          console.error("Ошибка загрузки:", error);
          alert("Ошибка при загрузке поста");
        }
      };
    return (
        <div className='SharePhotoNews'>
            <div><h1>Share your photo with your friends...</h1></div>
            <div className="SharePhotoNewsBody">
                <form className="upload-form" onSubmit={(e) => handlerSubmit(e)}>
                    <label className="custom-file-upload">
                        <input type="file" />
                        📁 Select File
                    </label>
                    <textarea type="text" />
                    <button>Add</button>
                </form>

            </div>
        </div>
    )
}

export default SharePhotoNews