import React, { useState, useRef } from 'react';
import {
  LuSun,
  LuPlus,
  LuCalendarDays,
  LuStar,
  LuTrash,
  LuPencil,
  LuCheck
} from 'react-icons/lu';
import 'D:\\SLIIT\\Academics\\Y3S1\\PAF\\New folder\\web-learning-application\\frontend\\src\\styles\\MyDay.css';

export default function MyDay({ tasks, addTask, toggleStar, deleteTask, updateTask }) {
  const [input, setInput] = useState('');
  const [date, setDate] = useState('');
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState('');
  const dateRef = useRef(null);

  const handleAdd = () => {
    if (!input.trim()) return;
    const taskDate = date || new Date().toISOString().slice(0, 10);
    addTask(input.trim(), taskDate);
    setInput('');
    setDate('');
  };

  const openDatePicker = () => {
    dateRef.current?.showPicker?.() || dateRef.current?.click();
  };

  const today = new Date().toISOString().slice(0, 10);

  const todaysTasks = tasks.filter((t) => {
    const taskDate = new Date(t.date).toISOString().slice(0, 10);
    return taskDate === today;
  });

  const startEdit = (task) => {
    setEditId(task.id);
    setEditText(task.title);
  };

  const saveEdit = (task) => {
    if (!editText.trim()) return;
    updateTask(task.id, {
      ...task,
      title: editText.trim(),
    });
    setEditId(null);
    setEditText('');
  };

  return (
    <div className="myday-page">
      <header className="myday-header">
        <LuSun className="myday-icon" />
        <h1>My Day</h1>
      </header>

      <div className="myday-addbar">
        <LuPlus className="add-icon" onClick={handleAdd} />
        <input
          type="text"
          className="add-input"
          placeholder="Add a task"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
        />
        <LuCalendarDays className="date-icon" onClick={openDatePicker} />
        <input
          ref={dateRef}
          type="date"
          className="hidden-date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      <ul className="myday-list">
        {todaysTasks.map((t) => (
          <li key={t.id} className="myday-item">
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
                <span className="item-text">{t.title}</span>
                <div className="item-actions">
                  <LuPencil className="edit-icon" onClick={() => startEdit(t)} />
                  <LuStar
                    className={t.starred ? 'starred-icon' : 'star-icon'}
                    onClick={() => toggleStar(t.id)}
                  />
                  <LuTrash className="trash-icon" onClick={() => deleteTask(t.id)} />
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
