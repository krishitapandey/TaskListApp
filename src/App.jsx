import  { useState } from 'react';
import { useTheme } from './context/useTheme';
import { useTasks } from './hooks/useTasks';
import TaskHeader from './components/TaskHeader';
import TaskFilter from './components/TaskFilter';
import TaskList from './components/TaskList';
import TaskModal from './components/TaskModal';

export default function App() {
  const { isDarkMode, toggleTheme } = useTheme();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
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
  } = useTasks();

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <div className="min-h-screen w-full bg-slate-200 dark:bg-[#070e17] text-[#070e17] dark:text-slate-100 flex flex-col items-center justify-start p-4 sm:p-8 md:p-12 transition-colors font-sans box-border">
        <div className="w-full max-w-4xl mx-auto flex flex-col items-center">
          
          <TaskHeader
            remainingCount={remainingCount}
            isDarkMode={isDarkMode}
            onToggleTheme={toggleTheme}
            onOpenModal={() => setIsModalOpen(true)}
          />

          <div className="w-full bg-slate-50 dark:bg-[#0b1523] rounded-2xl shadow-xl border border-slate-300 dark:border-[#17263b] p-6 sm:p-8 transition-colors text-left">
            <TaskFilter
              currentFilter={filter}
              onFilterChange={setFilter}
              onSearchChange={handleSearchChange}
            />

            <TaskList
              tasks={filteredTasks}
              onToggle={toggleTask}
              onDelete={deleteTask}
              onDragStart={handleDragStart}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            />
          </div>

        </div>

        <TaskModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onAddTask={addTask}
        />
      </div>
    </div>
  );
}