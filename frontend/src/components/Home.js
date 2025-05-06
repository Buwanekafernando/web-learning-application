import React from 'react';
import '../styles/Home.css';
import { MessageSquare, MessageCircle, Bell, Bot, Folder, TimerReset, Upload, ListTodo, PencilLine, Plus, UserCircle,} from 'lucide-react';
import logo from '../assets/logo.png';
import { useNavigate } from 'react-router-dom';

function Home() {
   const navigate = useNavigate();

   const handleChatClick = () => {
    navigate('/chatbox');
  };

  const handleFileClick = () => {
    navigate('/filesharing');
  };

  const quotes = [
    "The only impossible journey is the one you never begin.",
    "Success is not final, failure is not fatal.",
    "Believe you can and you're halfway there."
  ];

  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  return (
    <div className="home-wrapper">
      
      <div className="sidebar">
        <img src={logo} alt="Logo" className="logo-image" />
        <button className="icon-btn" onClick={handleChatClick}><MessageCircle size={24} /></button>
        <button className="icon-btn"><ListTodo size={24} /></button>
        <button className="icon-btn"><Bell size={24} /></button>
        <button className="icon-btn"><Bot size={24} /></button>
        <button className="icon-btn"  onClick={handleFileClick}><Folder size={24} /></button>
      </div>

      
      <div className="main-content">
        <header className="header">
          <h1 className="quote">{randomQuote}</h1>
          <div className="profile-icon">
            <UserCircle size={32} />
          </div>
        </header>

        <div className="content-area">
          
          <div className="left-section">
            <div className="post-header">
              <button className="circle-btn"><Plus /></button>
              <PencilLine size={30} />
            </div>
            <div className="post-box">Post 1</div>
            <div className="post-box">Post 2</div>
            <div className="post-box">Post 3</div>
          </div>

          
          <div className="right-section">
            <div className="card">
              <h3>Welcome</h3>
            </div>
            <div className="card">
              <h3>TO DO LIST</h3>
              <button className="action-btn"><ListTodo size={18} /> Open</button>
            </div>
            <div className="card">
              <h3>Timer</h3>
              <button className="action-btn"><TimerReset size={18} /> Start</button>
            </div>
            <div className="card">
              <h3>Document Hub</h3>
              <button className="action-btn"><Upload size={18} /> Access</button>
            </div>
            <div className="card">
              <h3>Chatbox</h3>
              <button className="action-btn"><MessageSquare size={18} /> Open</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
