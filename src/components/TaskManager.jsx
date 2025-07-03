import { useState, useMemo } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import TaskForm from './TaskForm'
import TaskFilter from './TaskFilter'
import TaskItem from './TaskItem'
import Card from './ui/Card'

const TaskManager = () => {
  const [tasks, setTasks] = useLocalStorage('tasks', [])
  const [filter, setFilter] = useState('all')
  const [sortBy, setSortBy] = useState('created')

  const addTask = (taskData) => {
    const newTask = {
      id: Date.now().toString(),
      ...taskData,
      completed: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    setTasks(prev => [newTask, ...prev])
  }

  const updateTask = (id, updates) => {
    setTasks(prev => prev.map(task => 
      task.id === id 
        ? { ...task, ...updates, updatedAt: new Date().toISOString() }
        : task
    ))
  }

  const deleteTask = (id) => {
    setTasks(prev => prev.filter(task => task.id !== id))
  }

  const toggleTask = (id) => {
    updateTask(id, { completed: !tasks.find(t => t.id === id)?.completed })
  }

  const deleteCompleted = () => {
    setTasks(prev => prev.filter(task => !task.completed))
  }

  const filteredAndSortedTasks = useMemo(() => {
    let filtered = tasks

    switch (filter) {
      case 'active':
        filtered = tasks.filter(task => !task.completed)
        break
      case 'completed':
        filtered = tasks.filter(task => task.completed)
        break
      case 'high':
        filtered = tasks.filter(task => task.priority === 'high')
        break
      case 'medium':
        filtered = tasks.filter(task => task.priority === 'medium')
        break
      case 'low':
        filtered = tasks.filter(task => task.priority === 'low')
        break
      default:
        filtered = tasks
    }

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'priority':
          const priorityOrder = { high: 3, medium: 2, low: 1 }
          return priorityOrder[b.priority] - priorityOrder[a.priority]
        case 'dueDate':
          if (!a.dueDate) return 1
          if (!b.dueDate) return -1
          return new Date(a.dueDate) - new Date(b.dueDate)
        case 'title':
          return a.title.localeCompare(b.title)
        default:
          return new Date(b.createdAt) - new Date(a.createdAt)
      }
    })
  }, [tasks, filter, sortBy])

  const stats = useMemo(() => {
    const total = tasks.length
    const completed = tasks.filter(task => task.completed).length
    const active = total - completed
    const highPriority = tasks.filter(task => task.priority === 'high' && !task.completed).length
    
    return { total, completed, active, highPriority }
  }, [tasks])

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Task Manager Pro
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Organize your tasks efficiently and boost your productivity
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{stats.total}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Total Tasks</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">{stats.completed}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Completed</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">{stats.active}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Active</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-red-600 dark:text-red-400">{stats.highPriority}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">High Priority</div>
        </Card>
      </div>

      <Card className="p-6">
        <TaskForm onSubmit={addTask} />
      </Card>

      <Card className="p-6">
        <TaskFilter 
          filter={filter}
          setFilter={setFilter}
          sortBy={sortBy}
          setSortBy={setSortBy}
          onDeleteCompleted={deleteCompleted}
          completedCount={stats.completed}
        />
      </Card>

      <div className="space-y-3">
        {filteredAndSortedTasks.length === 0 ? (
          <Card className="p-8 text-center">
            <div className="text-gray-500 dark:text-gray-400">
              {filter === 'all' ? 'No tasks yet. Create your first task above!' : `No ${filter} tasks found.`}
            </div>
          </Card>
        ) : (
          filteredAndSortedTasks.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={toggleTask}
              onDelete={deleteTask}
              onUpdate={updateTask}
            />
          ))
        )}
      </div>
    </div>
  )
}

export default TaskManager