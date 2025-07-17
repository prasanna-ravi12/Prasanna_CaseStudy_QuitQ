import React, { useEffect, useState } from "react";
import AdminNavbar from "./AdminNavbar";
import axios from "axios";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const response = await axios.get("http://localhost:8080/api/users");
    setUsers(response.data);
  };

  const handleDelete = async (email) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      await axios.delete(`http://localhost:8080/api/users/${email}`);
      fetchUsers();
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <AdminNavbar />
      <div className="container mt-5">
        <h2 className="text-center mb-4 text-purple">All Registered Users</h2>

        {users.length === 0 && <div className="alert alert-info text-center">No users found.</div>}

        <div className="table-responsive">
          <table className="table table-bordered table-hover table-striped">
            <thead>
              <tr>
                <th>Email ID</th>
                <th>Name</th>
                <th>Gender</th>
                <th>Role</th>
                <th>Phone</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.email}>
                  <td>{user.email}</td>
                  <td>{user.name}</td>
                  <td>{user.gender}</td>
                  <td>{user.role}</td>
                  <td>{user.phone}</td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(user.email)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <style>{`
        body {
          background: linear-gradient(135deg, #fce4ec, #f3e5f5, #e1f5fe);
          background-size: 400% 400%;
          animation: gradient 15s ease infinite;
          font-family: 'Segoe UI', sans-serif;
        }

        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .container {
          background-color: rgba(255, 255, 255, 0.95);
          padding: 30px;
          border-radius: 12px;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
        }

        .table th {
          background-color: #6a1b9a;
          color: #fff;
          font-weight: 600;
        }

        .table tbody tr:hover {
          background-color: #f3e5f5;
        }

        .btn-danger {
          border-radius: 20px;
          padding: 5px 12px;
          font-size: 14px;
        }

        .btn-danger:hover {
          background-color: #c62828;
          transform: scale(1.05);
        }

        .text-purple {
          color: #6a1b9a;
          font-weight: bold;
        }
      `}</style>
    </>
  );
};

export default ManageUsers;
