import React from "react";
import "./NewsLent.css";
import { useDispatch, useSelector } from "react-redux";
import {
    DeletePost,
  EditableStatus,
  EditPost,
  selectNews,
} from "../../../store/slices/NewsSlices/NewsSlice";
import { selectUser } from "../../../store/slices/UserSlice";
import EditButton from "../../../SVG/EditButton";
import DeleteButton from "../../../SVG/DeleteButton";

const NewsLent = () => {
  const dispatch = useDispatch();
  const news = useSelector(selectNews);
  const { Loged_User_Data } = useSelector(selectUser);
  const FindImage = Loged_User_Data[0]?.Photo.map((el) => {
    if(el.key){
      return el.url
    } else {
      return ""
    }
  });
  
  return (
    <div className="newsLent">
      {news.toReversed().map((el) => {
        if (el.isEditing) {
            return (
                <div key={el.id} className="news">
                  <div className="UserName">
                    <img src={FindImage.length !== 0 ? FindImage : Loged_User_Data[0].Image} alt="Icon" />
                    <h2>{el.FirstName}</h2>
                    <h2>{el.LastName}</h2>
                  </div>
                  <div className="PostItem">
                   <form onSubmit={(e)=> {
                    e.preventDefault()
                     const [input]=e.target
                     dispatch(EditPost({value: input.value, item: el}))
                     e.target.reset()
                   }}>
                    <input className="EditPostInput" type="text" defaultValue={el.post}/>
                   </form>
                  </div>
                </div>
              );
        } else {
          return (
            <div key={el?.id} className="news">
              <div className="UserName">
                <img src={el.Image} alt="Icon" />
                <h2>{el?.FirstName}</h2>
                <h2>{el?.LastName}</h2>
                {el?.userId===Loged_User_Data[0]?.id ? <div className="UserNameButton">
                  <button
                    onClick={() => {
                      dispatch(EditableStatus({ id: el?.id }));
                    }}
                  >
                    Edit
                  </button>
                  <button onClick={async ()=>{
                    dispatch(DeletePost({id: el.id}))
                    await fetch(`http://localhost:3005/News_Lent/${el?.id}`,{
                      method: "DELETE",
                  })
                  }}>Del</button>
                </div> : ""}
              </div>
              <div className="PostItem">
                <p>{el.post}</p>
               <div style={{textAlign: "center", padding: "15px"}} >
               {el.imgSRC? <img style={{width: "200px", aspectRatio: 1, borderRadius:"12px"}} src={el.imgSRC} alt="Icon" />: ""}
               </div>
              </div>
            </div>
          );
        }
      })}
    </div>
  );
};

export default NewsLent;
