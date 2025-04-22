import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Toast } from 'primereact/toast';
import { ProgressSpinner } from 'primereact/progressspinner';

import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import UserCard from "./UserCard/UserCard";
import { getToken } from "../../../../utils/auth";

const MyFriends = () => {
  const [friendList, setFriendList] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const { ref, inView } = useInView();

  const fetchFriends = async (pageNumber) => {
    try {
      const token = getToken()
      const res = await fetch(`http://localhost:8000/api/friends/list?page=${pageNumber}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });
      const data = await res.json();

      
      setFriendList(prev => [...prev, ...data.data]);
      setHasMore(data.next_page_url !== null);
    } catch (error) {
      console.error("Failed to fetch friends:", error);
    } finally {
      setLoading(false);
    }
 
  };

  useEffect(() => {
    
    fetchFriends(page);
  }, [page]);

  useEffect(() => {
    if (inView && hasMore) {
    setPage(prev => prev + 1);

    }
  }, [inView,hasMore]);

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

      setFriendList(prev => prev.filter(u => u.id !== userId));
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
            <UserCard
              key={user.id}
              user={user}
              onDelete={() => handleDelete(user.id)}
            />
          ))}
          
        </div>
      )}
      {hasMore && (
            <div ref={ref} style={{ marginTop: "2rem" }}>
              <ProgressSpinner />
            </div>
          )}
    </div>
  );
};

export default MyFriends;
