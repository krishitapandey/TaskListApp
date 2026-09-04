
import TaskItem from './TaskItem';

export default function TaskList({
  tasks,
  onToggle,
  onDelete,
  onDragStart,
  onDragOver,
  onDrop,
}) {
  if (tasks.length === 0) {
    return (
      <p className="py-8 text-center text-slate-500 dark:text-slate-400 text-sm">
        No matching tasks found.
      </p>
    );
  }

  return (
    <div className="mt-2 divide-y divide-slate-200 dark:divide-[#1e2f47]">
      {tasks.map((task, index) => (
        <TaskItem
          key={task.id}
          task={task}
          index={index}
          onToggle={onToggle}
          onDelete={onDelete}
          onDragStart={onDragStart}
          onDragOver={onDragOver}
          onDrop={onDrop}
        />
      ))}
    </div>
  );
}