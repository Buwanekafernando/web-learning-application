import React, { useEffect, useState } from 'react';
import { LuStar, LuTrash, LuPencil, LuCheck } from 'react-icons/lu';
import {
  getTasks,
  updateTask,
  deleteTask
} from '../../services/taskService';
import '../../styles/Important.css'; // if you’re using styles

export default function Important() {
  const [tasks, setTasks] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState('');

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    const all = await getTasks();
    const starred = all.filter((t) => t.starred);
    setTasks(starred);
  };

  const toggleStar = async (task) => {
    const updated = await updateTask(task.id, {
      ...task,
      starred: !task.starred,
    });
    // remove from view if unstarred
    setTasks((prev) => prev.filter((t) => t.id !== task.id));
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const startEdit = (task) => {
    setEditId(task.id);
    setEditText(task.title);
  };

  const saveEdit = async (task) => {
    if (!editText.trim()) return;
    const updated = await updateTask(task.id, { ...task, title: editText.trim() });
    setTasks((prev) =>
      prev.map((t) => (t.id === task.id ? updated : t))
    );
    setEditId(null);
    setEditText('');
  };

  return (
    <div className="important-page">
      <h2>⭐ Important Tasks</h2>
      <ul className="important-list">
        {tasks.map((t) => (
          <li key={t.id} className="important-item">
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
                <div className="actions">
                  <LuPencil className="edit-icon" onClick={() => startEdit(t)} />
                  <LuStar className="starred-icon" onClick={() => toggleStar(t)} />
                  <LuTrash className="trash-icon" onClick={() => handleDelete(t.id)} />
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
