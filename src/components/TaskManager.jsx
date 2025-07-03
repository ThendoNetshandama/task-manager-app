import { useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import TaskForm from './TaskForm';
import TaskItem from './TaskItem';
import TaskFilter from './TaskFilter';
import Card from './ui/Card';

const TaskManager = () => {
  const [tasks, setTasks] = useLocalStorage('tasks', []);
  const [filter, setFilter] = useState('all');
  const [editingTask, setEditingTask] = useState(null);

  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  const addTask = (task) => {
    const newTask = {
      ...task,
      id: Date.now(),
    };
    setTasks([...tasks, newTask]);
  };

  const updateTask = (updatedTask) => {
    setTasks(tasks.map(task => task.id === updatedTask.id ? updatedTask : task));
    setEditingTask(null);
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const toggleComplete = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  return (
    <div className="space-y-6">
      <Card>
        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
          {editingTask ? 'Edit Task' : 'Add New Task'}
        </h2>
        <TaskForm
          onAddTask={addTask}
          onUpdateTask={updateTask}
          initialTask={editingTask}
          onCancel={editingTask ? () => setEditingTask(null) : null}
        />
      </Card>

      <Card>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Tasks</h2>
          <span className="text-sm text-gray-600 dark:text-gray-300">
            {filteredTasks.length} {filteredTasks.length === 1 ? 'task' : 'tasks'}
          </span>
        </div>

        <TaskFilter filter={filter} setFilter={setFilter} />

        {filteredTasks.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400 py-4">
            No tasks found. Add a new task to get started!
          </p>
        ) : (
          <div className="space-y-3">
            {filteredTasks.map(task => (
              <TaskItem
                key={task.id}
                task={task}
                onEdit={setEditingTask}
                onDelete={deleteTask}
                onToggleComplete={toggleComplete}
              />
            ))}
          </div>
        )}
      </Card>
    </div>
  );
};

export default TaskManager;