import React, { useState } from 'react'
import "./SharePhotoNews.css"
import { useDispatch, useSelector } from 'react-redux'
import { AddPost } from '../../../../store/slices/NewsSlices/NewsSlice'
import { selectUser } from '../../../../store/slices/UserSlice'

const SharePhotoNews = () => {
    const dispatch = useDispatch()
    const [showImage, setShowImage]=useState(null)
    const {Loged_User_Data} = useSelector(selectUser)
    const handlerChange =  (e)=> {
        const file = e.target.files[0]
        const reader = new FileReader() 
        reader.readAsDataURL(file)
        reader.onload = ()=> {
            setShowImage(reader.result)
        }
    }
    const FindImage = Loged_User_Data[0]?.Photo?.map((el) => {
        if(el.key){
          return el.url
        } else {
          return ''
        }
      });
    const handlerSubmit = async (e)=> {
        e.preventDefault()
        const [photo,description] = e.target
        const newPost = ({
            id: new Date().getTime().toString(),
            post: description.value,
            isEditing: false,
            imgSRC: showImage,
            FirstName: Loged_User_Data[0].FirstName,
            LastName: Loged_User_Data[0].LastName,
            Image: FindImage.length !== 0 ? FindImage : Loged_User_Data[0].Image,
            userId: Loged_User_Data[0]?.id
        })
        await fetch("http://localhost:3005/News_Lent",{
            method: "POST",
            body: JSON.stringify(newPost)
        })
        dispatch(AddPost(newPost))
        setShowImage(null)
        e.target.reset()
    }
    return (
        <div className='SharePhotoNews'>
            <div><h1>Share your photo with your friends...</h1></div>
            <div className="SharePhotoNewsBody">
                <form onSubmit={(e)=>handlerSubmit(e)} >
                    <input onChange={(e)=>handlerChange(e)} type="file" />
                    <textarea type="text"/>
                    {showImage ? <img src={showImage} alt="Photo" />: "" }
                    <button> Add Photo to your lent </button>
                </form>
            </div>
        </div>
    )
}

export default SharePhotoNews