import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "../config/config";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const UpdateUser = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    account_type: "user",
    status: "active",
  });

  // Read: Fetch users
  useEffect(() => {
    axios
      .get(`${config.base_url}/api/v1/user`)
      .then((response) => setUsers(response.data.data))
      .catch((error) => {
        console.error("Error fetching users:", error);
        const message = error.response?.data?.message || "Error fetching user.";
        toast.error(message);
        toast.error("Error fetching users!");
      });
  }, []);

  // Create: Add a new user
  const handleCreate = (e) => {
    e.preventDefault();
    console.log(formData, "create time formdata");
    axios
      .post(`${config.base_url}/api/v1/user`, formData)
      .then((response) => {
        setUsers([...users, response.data]);
        setFormData({
          name: "",
          email: "",
          password: "",
          account_type: "",
          status: "active",
        });
        toast.success("User created successfully!");
      })
      .catch((error) => {
        console.error("Error creating user:", error);
        const message = error.response?.data?.message || "Error creating user.";
        toast.error(message);
      });
  };

  // Update: Update an existing user
  const handleUpdate = (id) => {
    navigate("/UpdateUser");
    axios
      .put(`${config.base_url}/api/v1/user/${id}`, formData)
      .then((response) => {
        setUsers(
          users.map((user) => (user._id === id ? response.data.data : user))
        );
        setFormData({
          name: "",
          email: "",
          password: "",
          account_type: "",
          status: "",
        });
        toast.success("User updated successfully!");
      })
      .catch((error) => {
        console.error("Error updating user:", error);
        const message = error.response?.data?.message || "Error updating user.";
        toast.error(message);
      });
  };

  // Delete: Delete a user
  const handleDelete = (id) => {
    axios
      .delete(`${config.base_url}/api/v1/user/${id}`)
      .then(() => {
        setUsers(users.filter((user) => user._id !== id));

        toast.success("User deleted successfully!");
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
        const message =
          error.response?.data?.message || "Error fetching users.";
        toast.error(message);
      });
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    // if (name === "status") {
    //   setFormData((prev) => {
    //     return {
    //       ...prev,
    //       [name]: !prev.status,
    //     };
    //   });
    // } else {
    //   setFormData({
    //     ...formData,
    //     [name]: value,
    //   });
    // }
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">CRUD Application</h1>

      <form onSubmit={handleCreate} className="mb-4">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="account_type">Account Type</label>
          <select
            className="form-control"
            id="account_type"
            name="account_type"
            value={formData.account_type}
            onChange={handleChange}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="account_type">Status</label>
          <select
            className="form-control"
            id="account_type"
            name="account_type"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary">
          Add User
        </button>
      </form>

      <h2 className="mb-4">User List</h2>
      <table className="table table-bordered">
        <thead className="thead-light">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Account Type</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user._id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.account_type}</td>
              <td>{user.status}</td>
              <td>
                <button
                  className="btn btn-warning btn-sm mr-2"
                  onClick={() => handleUpdate(user._id)}
                >
                  Update
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(user._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UpdateUser;
