import React from 'react';
import '../styles/ChatBox.css';

const chatData = [
  { name: "User1", lastMessage: "M1", time: "T1" },
  { name: "User2", lastMessage: "M2", time: "T2" },
  { name: "User3", lastMessage: "M3", time: "T3" },
  { name: "User4", lastMessage: "M4", time: "T4" },
];

function ChatBox() {
  return (
    <div className="chatbox-wrapper">
      <div className="chatbox-header">
        <h2>Messages</h2>
      </div>

      <div className="chat-list">
        {chatData.map((chat, index) => (
          <div key={index} className="chat-item">
            <div className="avatar">{chat.name[0]}</div>
            <div className="chat-details">
              <div className="chat-name">{chat.name}</div>
              <div className="chat-message">{chat.lastMessage}</div>
            </div>
            <div className="chat-time">{chat.time}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChatBox;
