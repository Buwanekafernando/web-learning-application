import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LuUser } from 'react-icons/lu';

import Sidebar from './components/Todo_List/Sidebar';
import MyDayPage from './components/Todo_List/MyDayPage'; // ✅ backend-connected wrapper
import Important from './components/Todo_List/Important';
import CalendarPage from './components/Todo_List/CalendarPage';


function App() {
  return (
    <BrowserRouter>
      <div className="app-wrapper">
        <header className="app-header">
          <LuUser className="header-user-icon" />
        </header>

        <div className="app-container">
          <Sidebar />
          <main className="main-view">
            <Routes>
              <Route path="/myday" element={<MyDayPage />} /> {/* ✅ changed here only */}

              <Route path="/important" element={<Important />} />
              <Route path="/calendar" element={<CalendarPage />} />


              <Route path="*" element={<Navigate to="/myday" replace />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
