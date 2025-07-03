import TaskManager from '../components/TaskManager';

const TaskPage = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Task Management</h1>
      <TaskManager />
    </div>
  );
};

export default TaskPage;