import { useDispatch } from "react-redux";
import "./PeopleKnow.css";
import { useEffect, useState } from "react";
import 'primereact/resources/themes/lara-light-blue/theme.css'; 
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { Paginator } from 'primereact/paginator';
import { getToken } from "../../../utils/auth";

const getAuthHeaders = () => ({
  Authorization: `Bearer ${getToken()}`,
  Accept: "application/json",
  "Content-Type": "application/json",
});

const fetchWithAuth = async (url, options = {}) => {
  const res = await fetch(url, {
    ...options,
    headers: {
      ...getAuthHeaders(),
      ...(options.headers || {}),
    },
  });

  if (!res.ok) {
    throw new Error(`Request failed: ${res.status}`);
  }

  return res.json();
};

const PeopleKnow = () => {
  const [sentRequestsTo, setSentRequestsTo] = useState([]);
  const [usersData, setUsersData] = useState({ data: [], current_page: 1, last_page: 1, total: 0 });
  const dispatch = useDispatch();

  const fetchSentRequests = async () => {
    try {
      const data = await fetchWithAuth("http://localhost:8000/api/friends/request");
      setSentRequestsTo(data);
    } catch (error) {
      console.error("Ошибка при получении отправленных запросов:", error);
    }
  };

  const fetchUsers = async (page = 1) => {
    try {
      const data = await fetchWithAuth(`http://localhost:8000/api/people-you-might-know?page=${page}`);
      
      setUsersData(data);
    } catch (error) {
      console.error("Ошибка при получении пользователей:", error);
    }
  };

  useEffect(() => {
    fetchSentRequests();
    fetchUsers();
  }, []);

  

  const handleAddFriend = async (userId) => {
    try {
      await fetchWithAuth(`http://localhost:8000/api/users/${userId}/friend-request`, {
        method: "POST",
      });
      setUsersData((prev) => ({
        ...prev,
        data: prev.data.filter((user) => user.id !== userId),
      }));
      fetchSentRequests();
      fetchUsers()
    } catch (error) {
      console.error("Ошибка при отправке запроса в друзья:", error);
    }
  };
  

  return (
    <div className="PeopleKnow">
      <div className="PeopleYouMightKnow">
        <h3>People You Might Know</h3>
      </div>

      <div className="AllPeople">
        {usersData.data.map((user) => (
          <div key={user.id} className="person-card">
            <img src={user?.image} alt="Icon" />
            <p className="name">
              {user.first_name} {user.last_name}
            </p>
            <button
              className="add-button"
              onClick={() => handleAddFriend(user.id)}
            >
              Add
            </button>
          </div>
        ))}
      </div>

      <div className="paginatorDiv">
        {
          usersData?.meta?.total > 4 
          ?
          <Paginator
          first={(usersData.meta.current_page - 1) * 10}
          rows={10}
          totalRecords={usersData.meta.total}
          onPageChange={(e) => {
            const newPage = e.page + 1;
            fetchUsers(newPage);
          }}
          template="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
        />
        :
        '' 
        }
        
      </div>
    </div>
  );
};

export default PeopleKnow;
