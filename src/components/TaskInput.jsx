import  { useState } from 'react';

export default function TaskInput({ onAddTask }) {
  const [taskText, setTaskText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!taskText.trim()) return;
    onAddTask(taskText.trim());
    setTaskText('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3 mb-6">
      <input
        type="text"
        placeholder="Please Enter a New task"
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
        className="flex-1 bg-[#0b1829] dark:bg-[#0b1829] bg-slate-100 border border-[#1e2d42] dark:border-[#1e2d42] border-slate-300 rounded-lg px-4 py-3 text-sm text-slate-200 dark:text-slate-200 text-slate-800 placeholder-slate-500 focus:outline-none focus:border-amber-500 transition-colors"
      />
      <button
        type="submit"
        className="bg-[#f0b429] hover:bg-[#d99e1e] text-slate-950 font-bold px-6 py-3 rounded-lg text-sm transition-colors tracking-wider uppercase shadow-md"
      >
        ADD
      </button>
    </form>
  );
}