import React from 'react';
import './Home.css';
import { FaComments, FaListAlt, FaBell, FaRobot, FaChartBar, FaThList } from 'react-icons/fa';

function Home() {
  const quotes = [
    "The only impossible journey is the one you never begin.",
    "Success is not final, failure is not fatal.",
    "Believe you can and you're halfway there."
  ];

  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  return (
    <div className="home-wrapper">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="logo">AD<br /><span>ACADEMIX</span></div>
        <button className="icon-btn"><FaComments /></button>
        <button className="icon-btn"><FaListAlt /></button>
        <button className="icon-btn"><FaBell /></button>
        <button className="icon-btn"><FaRobot /></button>
        <button className="icon-btn"><FaChartBar /></button>
        <button className="icon-btn"><FaThList /></button>
      </div>

      {/* Main content */}
      <div className="main-content">
        <header className="header">
          <h1>{randomQuote}</h1>
        </header>

        <div className="content-area">
          <div className="left-section">
            <div className="post-box">Post 1</div>
            <div className="post-box">Post 2</div>
            <div className="post-box">Post 3</div>
          </div>

          <div className="right-section">
            <div className="card">Welcome</div>
            <div className="card">TO DO LIST</div>
            <div className="card">TIMER</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
