import  { useState } from 'react';

export default function TaskModal({ isOpen, onClose, onAddTask }) {
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) {
      setError('Please enter a task title.');
      return;
    }

    if (!dueDate) {
      setError('Please select a submission date.');
      return;
    }

    const selectedDate = new Date(`${dueDate}T00:00:00`);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      setError('The submission date is already crossed.');
      return;
    }

    onAddTask({
      id: Date.now(),
      text: title.trim(),
      dueDate: dueDate,
      completed: false,
    });

    setTitle('');
    setDueDate('');
    setError('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-md bg-[#0b1523] dark:bg-[#0b1523] bg-white rounded-2xl shadow-2xl border border-[#17263b] dark:border-[#17263b] border-slate-200 p-6 text-left">
        
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white dark:text-white text-slate-900">
            Add New Task
          </h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white text-lg font-bold cursor-pointer"
          >
            ✕
          </button>
        </div>

        {error && (
          <div className="mb-4 text-xs font-semibold text-red-400 bg-red-500/10 border border-red-500/30 rounded-lg p-2.5">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">
              Task Title <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g., Submit project report"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (error) setError('');
              }}
              className="w-full bg-[#0b1829] dark:bg-[#0b1829] bg-slate-100 border border-[#1e2d42] dark:border-[#1e2d42] border-slate-300 rounded-lg px-4 py-2.5 text-sm text-slate-200 dark:text-slate-200 text-slate-800 placeholder-slate-500 focus:outline-none focus:border-amber-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">
              Submission Due Date <span className="text-red-400">*</span>
            </label>
            <input
              type="date"
              value={dueDate}
              min={new Date().toISOString().split('T')[0]}
              onChange={(e) => {
                setDueDate(e.target.value);
                if (error) setError('');
              }}
              className="w-full bg-[#0b1829] dark:bg-[#0b1829] bg-slate-100 border border-[#1e2d42] dark:border-[#1e2d42] border-slate-300 rounded-lg px-4 py-2.5 text-sm text-slate-200 dark:text-slate-200 text-slate-800 focus:outline-none focus:border-amber-500 scheme-dark"
            />
          </div>

          <div className="flex gap-3 justify-end mt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-400 hover:text-white bg-[#0e1a2b] border border-[#1e2d42] cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg text-xs font-bold text-slate-950 bg-amber-500 hover:bg-amber-600 uppercase tracking-wider shadow-md cursor-pointer"
            >
              Submit Task
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}