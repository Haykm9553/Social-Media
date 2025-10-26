import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { ProgressSpinner } from "primereact/progressspinner";
import UserCard from "./UserCard/UserCard";
import { getToken } from "../../../../utils/auth";

import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { useParams } from "react-router-dom";

const MyFriends = () => {
  const [friendList, setFriendList] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const { ref, inView } = useInView();
  const {id} = useParams()
  
  const fetchFriends = async (pageNumber) => {
    setLoading(true); 
    try {
      const token = getToken();
      const res = await fetch(`http://localhost:8000/api/friends/${id}?page=${pageNumber}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      const data = await res.json();

      if (!Array.isArray(data.data)) {
        console.error("data.data is not an array:", data.data);
        return;
      }

      setFriendList((prev) => [...prev, ...data.data]);

      setHasMore(data.meta.current_page < data.meta.last_page);
    } catch (error) {
      console.error("Failed to fetch friends:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (hasMore && !loading) {
      fetchFriends(page);
    }
  }, [page]);

  useEffect(() => {
    if (inView && hasMore && !loading) {
      setPage((prev) => prev + 1);
    }
  }, [inView, hasMore, loading]);

  const handleDelete = async (userId) => {
    try {
      const token = getToken();
      await fetch(`http://localhost:8000/api/friends/delete/${userId}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      setFriendList((prev) => prev.filter((u) => u.id !== userId));
    } catch (err) {
      console.error("Error deleting friend", err);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>Friends List</h2>

      {friendList.length === 0 && !loading ? (
        <p style={{ textAlign: "center" }}>No Friends</p>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
          {friendList.map((user) => (
            <UserCard userId={id} key={user.id} user={user} onDelete={() => handleDelete(user.id)} />
          ))}
        </div>
      )}

      {hasMore && (
        <div ref={ref} style={{ marginTop: "2rem", display: "flex", justifyContent: "center" }}>
          {loading && <ProgressSpinner />}
        </div>
      )}
    </div>
  );
};

export default MyFriends;
