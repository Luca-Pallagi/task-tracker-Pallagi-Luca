import { useCallback, useEffect, useState } from 'react';
import * as api from './api';
import TaskForm from './components/TaskForm.jsx';
import TaskList from './components/TaskList.jsx';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const [sort, setSort] = useState("priority");
  const [order, setOrder] = useState("desc");

  const [status, setStatus] = useState("");
  const [minPriority, setMinPriority] = useState("");

  const loadTasks = useCallback(async () => {
    setLoading(true);
    try {
      const data = await api.listTasks(sort, order, status, minPriority);
      setTasks(Array.isArray(data) ? data : []);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [sort, order, status, minPriority]);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  async function handleCreate(task) {
    try {
      await api.createTask(task);
      await loadTasks();
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleToggle(task) {
    try {
      const updated = await api.updateTask(task.id, {
        status: task.status === 'done' ? 'open' : 'done',
      });
      setTasks((current) => current.map((t) => (t.id === updated.id ? updated : t)));
      loadTasks();
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleDelete(task) {
    try {
      await api.deleteTask(task.id);
      setTasks((current) => current.filter((t) => t.id !== task.id));
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <main className="container">
      <h1>Task Tracker</h1>
      <TaskForm onCreate={handleCreate} />

      <label>
        Status filtern:
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="">Alle Tasks</option>
          <option value="open">Offen</option>
          <option value="done">Erledigt</option>
        </select>
      </label>

      <label>
      Mindestpriorität:
      <select
        value={minPriority}
        onChange={(e) => setMinPriority(e.target.value)}
      >
        <option value="">Alle Prioritäten</option>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
        <option key={value} value={value}>
          Ab Priorität {value}
        </option>
    ))}
  </select>
</label>

      <select value={sort} onChange={(e) => setSort(e.target.value)}>
        <option value="priority">Priority</option>
        <option value="dueDate">Due date</option>
        <option value="createdAt">Created</option>
      </select>
      <select value={order} onChange={(e) => setOrder(e.target.value)}>
        <option value="desc">Desc</option>
        <option value="asc">Asc</option>
      </select>

      {error && <p className="error">⚠ {error}</p>}
      {loading ? <p>Loading…</p> : <TaskList tasks={tasks} onToggle={handleToggle} onDelete={handleDelete} />}
    </main>
  );
}
