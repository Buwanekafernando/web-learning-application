import React, { useState, useEffect } from 'react';
import '../styles/UserProfile.css';
import {
  MessageSquare,
  Bell,
  Bot,
  Folder,
  ListTodo,
  PencilLine,
  UserCircle
} from 'lucide-react';
import logo from '../assets/logo.png';
import { useParams, useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [token, setToken] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    password: '',
    profileImageUrl: ''
  });
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  useEffect(() => {
    if (!username || !token) return;

    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/users/search?query=${encodeURIComponent(username)}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (response.ok) {
          const users = await response.json();
          const foundUser = users.find(u => u.username === username);
          if (foundUser) {
            setUser(foundUser);
            setFormData({
              name: foundUser.name || '',
              bio: foundUser.bio || '',
              password: '',
              profileImageUrl: foundUser.profileImageUrl || ''
            });
          } else {
            setUser(null);
          }
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Error fetching user:', error);
        setUser(null);
      }
    };

    fetchUser();
  }, [username, token]);

  const handleInputChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
    setErrorMsg('');
    setSuccessMsg('');
  };

  const handleUpdate = async () => {
    setErrorMsg('');
    setSuccessMsg('');
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:8080/api/users/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'userId': user.id.toString()
        },
        body: JSON.stringify(formData)
      });
      if (!response.ok) {
        const text = await response.text();
        throw new Error(text || 'Failed to update profile');
      }
      const updatedUser = await response.json();
      setUser(updatedUser);
      setSuccessMsg('Profile updated successfully');
    } catch (error) {
      setErrorMsg(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    const password = prompt('Please enter your password to confirm account deletion:');
    if (!password) return;
    setErrorMsg('');
    setSuccessMsg('');
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:8080/api/users/deleteWithPassword?password=${encodeURIComponent(password)}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'userId': user.id.toString()
        }
      });
      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Incorrect password. Account deletion cancelled.');
        } else {
          throw new Error('Failed to delete account.');
        }
      }
      alert('Account deleted successfully.');
      navigate('/login');
    } catch (error) {
      setErrorMsg(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return <div>User not found or loading...</div>;
  }

  return (
    <div className="user-profile-container">
      <div className="sidebar">
        <img src={logo} alt="Academix Logo" className="logo" />
        <div className="sidebar-icons">
          <MessageSquare />
          <ListTodo />
          <Bell />
          <Bot />
          <Folder />
          <PencilLine />
          <UserCircle />
        </div>
      </div>

      <div className="profile-left">
        <img src={user.profileImageUrl || 'https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/corporate-user-icon.png'} alt="User" className="profile-image" />
      </div>

      <div className="profile-right">
        <h2 className="profile-header">{user.username}</h2>

        <div className="bio-card">
          <h3>Bio</h3>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleInputChange}
            rows={4}
            placeholder="Write your bio here"
            disabled={isLoading}
          />
        </div>

        <div className="additional-info">
          <p><strong>Name:</strong></p>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            disabled={isLoading}
          />
          <p><strong>Password:</strong></p>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Enter new password"
            disabled={isLoading}
          />
          <p><strong>Profile Image URL:</strong></p>
          <input
            type="text"
            name="profileImageUrl"
            value={formData.profileImageUrl}
            onChange={handleInputChange}
            disabled={isLoading}
          />
        </div>

        {errorMsg && <p className="error-msg">{errorMsg}</p>}
        {successMsg && <p className="success-msg">{successMsg}</p>}

        <button onClick={handleUpdate} disabled={isLoading}>
          {isLoading ? 'Updating...' : 'Update Details'}
        </button>

        <button className="delete-button" onClick={handleDelete} disabled={isLoading}>
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
