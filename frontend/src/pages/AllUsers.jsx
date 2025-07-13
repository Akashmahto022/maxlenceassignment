import React, { useEffect, useState } from "react";
import axios from "axios";

const AllUsers = () => {
  const url = "http://localhost:8000";
  const [users, setUsers] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const userRole = JSON.parse(localStorage.getItem("userRole"));
    console.log("userRole", userRole);
    if (userRole === "admin") {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${url}/api/v1/user/get-all`);
      if (response.data) {
        setUsers(response.data.users);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const deleteUser = async (userId) => {
    try {
      const response = await axios.delete(
        `${url}/api/v1/user/delete-user/${userId}`
      );
      if (response.status === 200) {
        await fetchUsers();
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">All Users</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.map((user) => (
          <div
            key={user.id}
            className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center justify-center"
          >
            <img
              src={user.userProfileImage || "https://via.placeholder.com/150"}
              alt={user.email}
              className="w-24 h-24 rounded-full mb-4"
            />
            <h2>User Id : {user.id}</h2>
            <h2>User eamil: {user.email}</h2>
            {isAdmin && (
              <button
                onClick={() => deleteUser(user.id)}
                className="p-2 text-white bg-red-600 cursor-pointer rounded-xl my-3"
              >
                Delete
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllUsers;
