
export default function TaskHeader({
  remainingCount,
  isDarkMode,
  onToggleTheme,
  onOpenModal,
}) {
  return (
    <div className="w-full flex items-center justify-between mb-8">
      <div className="flex items-baseline gap-3">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#070e17] dark:text-white tracking-tight">
          To-Do List
        </h1>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-400 border border-amber-500/30">
          {remainingCount} {remainingCount === 1 ? 'task' : 'tasks'} remaining
        </span>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={onOpenModal}
          className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold shadow-md tracking-wider uppercase transition-all cursor-pointer"
        >
          + Add New Task
        </button>
        <button
          onClick={onToggleTheme}
          className="px-4 py-2 rounded-lg bg-slate-100 dark:bg-[#0e1a2b] text-[#070e17] dark:text-slate-300 border border-slate-300 dark:border-[#1e2d42] text-xs font-semibold shadow-md hover:border-amber-500 transition-all cursor-pointer"
        >
          Switch to {isDarkMode ? 'Light' : 'Dark'} Theme
        </button>
      </div>
    </div>
  );
}