import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MyContext } from "../../../context/CreateContext";

export default function Profile() {
  const { user, setUser } = useContext(MyContext);
  const [updateMode, setUpdateMode] = useState(false);

  const [updatedUser, setUpdatedUser] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
  });
  const navigate = useNavigate();

  const handleEdit = () => {
    setUpdateMode(true);
  };

  const handleSave = () => {
    fetch(`http://localhost:8000/api/update`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        email: updatedUser.email,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setUser(updatedUser);
          navigate("/");
        } else {
          console.error("Error updating user:", data.message);
        }
        setUpdateMode(false);
      })
      .catch((error) => console.error("Error:", error));
  };

  const handleChange = (e) => {
    setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <h1>Profile Page</h1>
      {!updateMode ? (
        <div>
          <p>First Name: {user.firstName}</p>
          <p>Last Name: {user.lastName}</p>
          <p>Email: {user.email}</p>
          <button onClick={handleEdit}>Edit Profile</button>
        </div>
      ) : (
        <div>
          <input
            type="text"
            name="firstName"
            value={updatedUser.firstName}
            onChange={handleChange}
          />
          <input
            type="text"
            name="lastName"
            value={updatedUser.lastName}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            value={updatedUser.email}
            onChange={handleChange}
          />
          <button onClick={handleSave}>Save Changes</button>
        </div>
      )}
    </div>
  );
}
