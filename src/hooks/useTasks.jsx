import { useState, useEffect, useCallback } from 'react';

const DEFAULT_TASKS = [
  { id: 1, text: 'Exercise', dueDate: '2026-09-05', completed: false },
  { id: 2, text: 'Go to shopping', dueDate: '2026-09-04', completed: true },
  { id: 3, text: 'Meet my friends', dueDate: '2026-09-06', completed: false },
];

export function useTasks() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('todo_tasks');
    return savedTasks !== null ? JSON.parse(savedTasks) : DEFAULT_TASKS;
  });

  const [filter, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [draggedIndex, setDraggedIndex] = useState(null);

  useEffect(() => {
    localStorage.setItem('todo_tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (newTask) => setTasks((prev) => [...prev, newTask]);

  const toggleTask = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => setTasks((prev) => prev.filter((task) => task.id !== id));

  const handleSearchChange = useCallback((query) => {
    setSearchQuery(query);
  }, []);

  const handleDragStart = (e, index) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, targetIndex) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === targetIndex) return;

    const updatedTasks = [...tasks];
    const [draggedTask] = updatedTasks.splice(draggedIndex, 1);
    updatedTasks.splice(targetIndex, 0, draggedTask);

    setTasks(updatedTasks);
    setDraggedIndex(null);
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesFilter =
      filter === 'Active'
        ? !task.completed
        : filter === 'Completed'
        ? task.completed
        : true;

    const matchesSearch = task.text
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const remainingCount = tasks.filter((task) => !task.completed).length;

  return {
    filter,
    remainingCount,
    filteredTasks,
    setFilter,
    addTask,
    toggleTask,
    deleteTask,
    handleSearchChange,
    handleDragStart,
    handleDragOver,
    handleDrop,
  };
}