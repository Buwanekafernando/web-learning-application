import React, { useState } from 'react';
import {
  LuCalendarDays,
  LuArrowLeft,
  LuArrowRight,
  LuStar,
  LuTrash,
  LuPencil,
  LuCheck
} from 'react-icons/lu';
import 'D:\\SLIIT\\Academics\\Y3S1\\PAF\\New folder\\web-learning-application\\frontend\\src\\styles\\CalendarView.css';

export default function CalendarView({ tasks, toggleStar, deleteTask, updateTask }) {
  const [viewDate, setViewDate] = useState(new Date());
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState('');

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  const firstDayIdx = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells = Array.from({ length: firstDayIdx }, () => null)
    .concat(Array.from({ length: daysInMonth }, (_, i) => i + 1));

  const prevMonth = () => setViewDate((d) => new Date(d.getFullYear(), d.getMonth() - 1, 1));
  const nextMonth = () => setViewDate((d) => new Date(d.getFullYear(), d.getMonth() + 1, 1));

  const startEdit = (task) => {
    setEditId(task.id);
    setEditText(task.title);
  };

  const saveEdit = (task) => {
    if (!editText.trim()) return;
    updateTask(task.id, { ...task, title: editText.trim() });
    setEditId(null);
    setEditText('');
  };

  return (
    <div className="calendar-page">
      <header className="calendar-header">
        <LuCalendarDays className="cal-icon" />
        <h1>{viewDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</h1>
        <div className="nav-buttons">
          <button onClick={prevMonth}><LuArrowLeft /></button>
          <button onClick={nextMonth}><LuArrowRight /></button>
        </div>
      </header>

      <div className="calendar-grid">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
          <div key={d} className="cal-cell header">{d}</div>
        ))}

        {cells.map((day, idx) => (
          <div key={idx} className="cal-cell">
            {day && (
              <>
                <div className="date-num">{day}</div>
                {tasks
                  .filter((t) => t && t.date) // ✅ Defensive check added
                  .filter((t) => {
                    const d = new Date(t.date);
                    return d.getFullYear() === year &&
                      d.getMonth() === month &&
                      d.getDate() === day;
                  })
                  .map((t) => (
                    <div key={t.id} className="event">
                      {editId === t.id ? (
                        <>
                          <input
                            value={editText}
                            onChange={(e) => setEditText(e.target.value)}
                            className="edit-input"
                            onKeyDown={(e) => e.key === 'Enter' && saveEdit(t)}
                          />
                          <LuCheck className="check-icon" onClick={() => saveEdit(t)} />
                        </>
                      ) : (
                        <>
                          <span>{t.title}</span>
                          <div className="event-actions">
                            <LuPencil className="edit-icon" onClick={() => startEdit(t)} />
                            <LuStar
                              className={t.starred ? 'starred-icon' : 'star-icon'}
                              onClick={() => toggleStar(t.id)}
                            />
                            <LuTrash
                              className="trash-icon"
                              onClick={() => deleteTask(t.id)}
                            />
                          </div>
                        </>
                      )}
                    </div>
                  ))}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
