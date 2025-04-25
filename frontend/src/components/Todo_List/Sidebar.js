import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LuMessageSquare,
  LuClipboardList,
  LuBell,
  LuGlobe,
  LuMail,
  LuChartBar,
  LuSun,
  LuStar,
  LuCalendarDays,
} from 'react-icons/lu';
import logo from 'D:\\SLIIT\\Academics\\Y3S1\\PAF\\New folder\\web-learning-application\\frontend\\src\\assets\\V.png';
import 'D:\\SLIIT\\Academics\\Y3S1\\PAF\\New folder\\web-learning-application\\frontend\\src\\styles\\Sidebar.css';

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-icons">
        <img src={logo} alt="Academix" className="logo-icon" />
        <LuMessageSquare    className="icon" />
        <LuClipboardList className="icon" />
        <LuBell    className="icon" />
        <LuGlobe   className="icon" />
        <LuMail   className="icon" />
        <LuChartBar   className="icon" />
      </div>
      <div className="sidebar-menu">
        <h2 className="menu-title">To‑do list</h2>
        <nav className="nav-menu">
          <NavLink to="/myday"    className={({isActive})=>isActive?'active':''}>
            <LuSun        className="icon" /><span>My Day</span>
          </NavLink>
          <NavLink to="/important" className={({isActive})=>isActive?'active':''}>
            <LuStar        className="icon" /><span>Important</span>
          </NavLink>
          <NavLink to="/calendar"  className={({isActive})=>isActive?'active':''}>
            <LuCalendarDays className="icon" /><span>Calendar</span>
          </NavLink>
        </nav>
      </div>
    </aside>
  );
}
