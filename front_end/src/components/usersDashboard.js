import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null); // Track user being edited
  const navigate = useNavigate();

  // Fetch users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.get("/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(data);
    } catch (error) {
      alert(error.response?.data?.message || "Failed to fetch users");
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("User deleted successfully");
      fetchUsers(); // Refresh the user list
    } catch (error) {
      alert(error.response?.data?.message || "Failed to delete user");
    }
  };

  const handleEdit = (user) => {
    setEditUser(user); // Set the user to be edited
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(`/users/${editUser._id}`, editUser, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("User updated successfully");
      setEditUser(null); // Clear edit mode
      fetchUsers(); // Refresh the user list
    } catch (error) {
      alert(error.response?.data?.message || "Failed to update user");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div>
      <h1>User Dashboard</h1>
      <button onClick={() => navigate("/import-users")}>Import Users</button>
      <button onClick={() => navigate("/export-users")}>Export Users</button>
      <button onClick={handleLogout}>Logout</button>

      {/* User Table */}
      <table border="1">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Role</th>
            <th>DOB</th>
            <th>Gender</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>City</th>
            <th>State</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.first_name}</td>
              <td>{user.last_name}</td>
              <td>{user.role}</td>
              <td>{user.dob}</td>
              <td>{user.gender}</td>
              <td>{user.email}</td>
              <td>{user.mobile}</td>
              <td>{user.city}</td>
              <td>{user.state}</td>
              <td>
                <button onClick={() => handleEdit(user)}>Edit</button>
                <button onClick={() => handleDelete(user._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit User Modal */}
      {editUser && (
        <div>
          <h2>Edit User</h2>
          <input
            type="text"
            placeholder="First Name"
            value={editUser.first_name}
            onChange={(e) =>
              setEditUser({ ...editUser, first_name: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Last Name"
            value={editUser.last_name}
            onChange={(e) =>
              setEditUser({ ...editUser, last_name: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Role"
            value={editUser.role}
            onChange={(e) => setEditUser({ ...editUser, role: e.target.value })}
          />
          <input
            type="date"
            placeholder="DOB"
            value={editUser.dob}
            onChange={(e) => setEditUser({ ...editUser, dob: e.target.value })}
          />
          <input
            type="text"
            placeholder="Gender"
            value={editUser.gender}
            onChange={(e) =>
              setEditUser({ ...editUser, gender: e.target.value })
            }
          />
          <input
            type="email"
            placeholder="Email"
            value={editUser.email}
            onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
          />
          <input
            type="text"
            placeholder="Mobile"
            value={editUser.mobile}
            onChange={(e) =>
              setEditUser({ ...editUser, mobile: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="City"
            value={editUser.city}
            onChange={(e) => setEditUser({ ...editUser, city: e.target.value })}
          />
          <input
            type="text"
            placeholder="State"
            value={editUser.state}
            onChange={(e) => setEditUser({ ...editUser, state: e.target.value })}
          />
          <button onClick={handleUpdate}>Update</button>
          <button onClick={() => setEditUser(null)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
