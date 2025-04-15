import "./SharedPost.css";
import { useDispatch, useSelector } from "react-redux";
import { AddPost } from "../../../../store/slices/NewsSlices/NewsSlice";
import { selectUser } from "../../../../store/slices/UserSlice";

const SharedPost = () => {
  const dispatch = useDispatch()
  const {profile} = useSelector(selectUser)

  const FindImage = profile?.Photo?.map((el) => {
    if(el.key){
      return el.url
    } else {
      return ''
    }
  });
  const handlerSubmit = async (e)=> {
    e.preventDefault()
      const [input] = e.target
     const newPost=({
        id: new Date().getTime().toString(),
        post: input.value,
        isEditing: false,
        FirstName: profile.FirstName,
        LastName: profile.LastName,
        Image: FindImage.length !== 0 ? FindImage : profile.Image,
        userId: profile?.id
      })
      await fetch("http://localhost:3005/News_Lent",{
          method: "POST",
          body: JSON.stringify(newPost)
      })
      dispatch(AddPost(newPost))
      e.target.reset()
  }
return (
  <div className="SharedPost">
    <div><h1> What's new... </h1></div>
    <div className="SharePostBody">
      <form onSubmit={(e)=>handlerSubmit(e)}>
        <textarea type="text"/>
        <button> Share Post </button>
      </form>
    </div>
  </div>
);
};

export default SharedPost;
