import React, { useEffect, useState } from "react";
import "./NewsLent.css";
import { useDispatch } from "react-redux";
import { RemovePost } from "../../../store/slices/NewsSlices/NewsSlice";
import DeleteButton from "../../../SVG/DeleteButton";
import EditButton from "../../../SVG/EditButton";
import { ProgressSpinner } from "primereact/progressspinner";
import { useInView } from "react-intersection-observer";
import { getToken } from "../../../utils/auth";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

const NewsLent = () => {
  const dispatch = useDispatch();
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const { ref, inView } = useInView();
  const profile = JSON.parse(
    localStorage.getItem("userProfile") ||
      sessionStorage.getItem("userProfile")
  );

  const fetchPosts = async (pageNum = 1) => {
    try {
      setLoading(true);
      const res = await fetch(
        `http://localhost:8000/api/posts?page=${pageNum}`,
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
            Accept: "application/json",
          },
        }
      );

      const data = await res.json();
      console.log(data);
      
      if (!data.next_page_url || data.data.length === 0) {
        setHasMore(false);
      }

      setPosts((prev) => {
        const existingIds = new Set(prev.map((p) => p.id));
        const uniqueNewPosts = data.data.filter((p) => !existingIds.has(p.id));
        return [
          ...prev,
          ...uniqueNewPosts.map((post) => ({
            ...post,
            isEditing: false,
          })),
        ];
      });
    } catch (error) {
      console.error("Ошибка загрузки постов:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!loading) {
      fetchPosts(page);
    }
  }, [page]);

  useEffect(() => {
    if (inView && hasMore && !loading) {
      setPage((prev) => prev + 1);
    }
  }, [inView, hasMore]);

  const toggleEdit = (id) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === id ? { ...post, isEditing: !post.isEditing } : post
      )
    );
  };

  const handleSave = async (id, newContent) => {
    try {
      await fetch(`http://localhost:8000/api/posts/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${getToken()}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: newContent }),
      });

      setPosts((prev) =>
        prev.map((post) =>
          post.id === id
            ? { ...post, content: newContent, isEditing: false }
            : post
        )
      );
    } catch (error) {
      console.error("Ошибка при сохранении поста:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:8000/api/posts/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${getToken()}`,
          Accept: "application/json",
        },
      });

      setPosts((prev) => prev.filter((post) => post.id !== id));
      dispatch(RemovePost({ id }));
    } catch (error) {
      console.error("Ошибка при удалении поста:", error);
    }
  };

  return (
    <div className="newsLent">
      {posts.map((el) => (
        <div key={el.id} className="news">
          <div className="UserName">
            <div className="UserNameAvatar">
              <img src={el.user.image} alt="User" className="news-avatar" />
              <div>
                <h2>{el.user.first_name}</h2>
                <h2>{el.user.last_name}</h2>
              </div>
            </div>
            {el.user_id === profile?.id && (
              <div className="UserNameButton">
                <i onClick={() => toggleEdit(el.id)}>
                  <EditButton />
                </i>
                <i onClick={() => handleDelete(el.id)}>
                  <DeleteButton />
                </i>
              </div>
            )}
          </div>

          <div className="PostItem">
            {el.isEditing ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const [input] = e.target;
                  handleSave(el.id, input.value);
                  e.target.reset();
                }}
              >
                <input
                  className="EditPostInput"
                  type="text"
                  defaultValue={el.content}
                  autoFocus
                />
              </form>
            ) : (
              <>
                <p>{el.content}</p>
                {el.image && (
                  <div style={{ textAlign: "center", padding: "15px" }}>
                    <img
                      style={{
                        width: "200px",
                        aspectRatio: 1,
                        borderRadius: "12px",
                      }}
                      src={el.image}
                      alt="Post"
                    />
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      ))}

      {hasMore && (
        <div ref={ref} style={{ textAlign: "center", margin: "20px" }}>
          <ProgressSpinner />
        </div>
      )}
    </div>
  );
};

export default NewsLent;
