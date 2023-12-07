import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MyContext } from '../../context/CreateContext';
import toast, { Toaster } from 'react-hot-toast';

export default function Profile() {
  const { user, setUser } = useContext(MyContext);
  const [deleteMode, setDeleteMode] = useState(false);
  const [updateMode, setUpdateMode] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
  });
  const navigate = useNavigate();

  const handleEdit = () => {
    setUpdateMode(true);
  };

  const handleSave = () => {
    const token = localStorage.getItem('token');

    fetch(`http://localhost:8000/api/users/update/${user._id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', token: `${token}` },
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
          navigate('/');
        } else {
          console.error('Error updating user:', data.message);
        }
        setUpdateMode(false);
      })
      .catch((error) => console.error('Error:', error));
  };

  const handleChange = (e) => {
    setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
  };

  if (!user) return <div>Loading...</div>;

  /* DELETE ACCOUNT handlers: */
  const handleDeleteMode = () => setDeleteMode(true);

  const doNotDelete = () => setDeleteMode(false);

  const deleteAccount = () => {
    const token = localStorage.getItem('token');
    fetch(`http://localhost:8000/api/users/delete/${user._id}`, {
      method: 'DELETE',
      headers: { token: `${token}` },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          toast.success('account deleted!');
          setDeleteMode(false);

          setTimeout(() => {
            setUser(null);
            localStorage.removeItem('token');
            navigate('/');
          }, 1500);
        } else {
          console.log(res.message);
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <h1>Profile Page</h1>
      <div className='profile-container'>
        <Toaster position='top-center' />
        <div className='edit-container'>
          <div>
            <p>First Name: {user.firstName}</p>
            <p>Last Name: {user.lastName}</p>
            <p>Email: {user.email}</p>
            <button onClick={handleEdit}>Edit Profile</button>
          </div>
          {updateMode && (
            <div>
              <input
                type='text'
                name='firstName'
                value={updatedUser.firstName}
                onChange={handleChange}
              />
              <input
                type='text'
                name='lastName'
                value={updatedUser.lastName}
                onChange={handleChange}
              />
              <input
                type='email'
                name='email'
                value={updatedUser.email}
                onChange={handleChange}
              />
              <button onClick={handleSave}>Save Changes</button>
            </div>
          )}
        </div>
        <div>
          <button onClick={handleDeleteMode}>Delete Account</button>
          {deleteMode && (
            <div>
              <p>Are you sure, you want to delete your account?</p>
              <p>All the data will be lost.</p>
              <button onClick={doNotDelete}>NO</button>
              <button onClick={deleteAccount}>YES</button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
