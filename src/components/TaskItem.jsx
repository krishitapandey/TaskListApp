

export default function TaskItem({
  task,
  index,
  onToggle,
  onDelete,
  onDragStart,
  onDragOver,
  onDrop,
}) {
  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, index)}
      onDragOver={onDragOver}
      onDrop={(e) => onDrop(e, index)}
      className="group flex items-center justify-between p-4 rounded-xl transition-all hover:bg-slate-200/60 dark:hover:bg-[#132238] cursor-grab active:cursor-grabbing"
    >
      <div className="flex items-center gap-4">
        {/* Drag Handle Icon */}
        <span className="text-slate-400 dark:text-slate-600 opacity-60 group-hover:opacity-100 transition-opacity">
          ::
        </span>

        {/* Custom Checkbox */}
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          className="w-5 h-5 rounded border-slate-300 dark:border-slate-600 text-amber-500 focus:ring-amber-500/30 cursor-pointer accent-amber-500"
        />

        {/* Task Details */}
        <div className="flex flex-col">
          <span
            className={`text-base font-medium transition-all ${
              task.completed
                ? 'line-through text-slate-400 dark:text-slate-500'
                : 'text-slate-800 dark:text-slate-100'
            }`}
          >
            {task.text}
          </span>
          {task.dueDate && (
            <span className="text-xs font-semibold text-amber-700 dark:text-amber-400 mt-0.5">
              Due: {task.dueDate}
            </span>
          )}
        </div>
      </div>

      {/* Delete Button */}
      <button
        onClick={() => onDelete(task.id)}
        className="px-3.5 py-1.5 rounded-lg bg-rose-500 hover:bg-rose-600 dark:bg-rose-600/80 dark:hover:bg-rose-600 text-white text-xs font-bold transition-all shadow-sm cursor-pointer"
      >
        Delete
      </button>
    </div>
  );
}