import "./SharedPost.css";
import { useDispatch } from "react-redux";
import { AddPost } from "../../../../store/slices/NewsSlices/NewsSlice";
import { useState } from "react";
import { getToken } from "../../../../utils/auth";

const SharedPost = () => {
  const dispatch = useDispatch();
  const profile = JSON.parse(localStorage.getItem("userProfile") || sessionStorage.getItem("userProfile"));
  const [content, setContent] = useState("");

  
  const token = getToken();
  const imageUrl = profile?.Photo?.find((el) => el.key)?.url || profile?.Image || "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;
  
    const postData = {
      content,
      image: imageUrl,
      user_id: profile?.id,
    };
  
    try {
      const res = await fetch("http://localhost:8000/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(postData),
      });
  
      if (!res.ok) throw new Error("Ошибка при создании поста");
  
      const result = await res.json();
      const newPost = result.post;

      dispatch(AddPost({ ...newPost, isEditing: false }));
      setContent(""); 
    } catch (error) {
      console.error("Ошибка при отправке поста:", error);
    }
  };

  return (
    <div className="SharedPost">
      <div><h1>What's new...</h1></div>
      <div className="SharePostBody">
        <form onSubmit={handleSubmit}>
          <textarea
            placeholder="Write something..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <button type="submit">Share Post</button>
        </form>
      </div>
    </div>
  );
};

export default SharedPost;
