import { useState } from 'react'
import PropTypes from 'prop-types'
import { FiEdit2, FiTrash2, FiCheck, FiX, FiClock, FiCalendar } from 'react-icons/fi'
import { format, isToday, isPast, parseISO } from 'date-fns'
import Button from './ui/Button'
import Card from './ui/Card'

const TaskItem = ({ task, onToggle, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState({
    title: task.title,
    description: task.description,
    priority: task.priority,
    dueDate: task.dueDate
  })

  const handleSave = () => {
    if (!editData.title.trim()) return
    onUpdate(task.id, editData)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditData({
      title: task.title,
      description: task.description,
      priority: task.priority,
      dueDate: task.dueDate
    })
    setIsEditing(false)
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
    }
  }

  const getDueDateStatus = () => {
    if (!task.dueDate) return null
    
    const dueDate = parseISO(task.dueDate)
    if (isToday(dueDate)) {
      return { text: 'Due today', color: 'text-orange-600 dark:text-orange-400' }
    } else if (isPast(dueDate)) {
      return { text: 'Overdue', color: 'text-red-600 dark:text-red-400' }
    }
    return { text: format(dueDate, 'MMM d, yyyy'), color: 'text-gray-600 dark:text-gray-400' }
  }

  const dueDateStatus = getDueDateStatus()

  return (
    <Card className={`p-4 transition-all ${task.completed ? 'opacity-60' : ''}`}>
      <div className="flex items-start space-x-3">
        <button
          onClick={() => onToggle(task.id)}
          className={`flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
            task.completed 
              ? 'bg-green-500 border-green-500 text-white' 
              : 'border-gray-300 hover:border-green-500 dark:border-gray-600'
          }`}
        >
          {task.completed && <FiCheck className="w-3 h-3" />}
        </button>

        <div className="flex-1 min-w-0">
          {isEditing ? (
            <div className="space-y-3">
              <input
                type="text"
                value={editData.title}
                onChange={(e) => setEditData(prev => ({ ...prev, title: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
              <textarea
                value={editData.description}
                onChange={(e) => setEditData(prev => ({ ...prev, description: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                rows="2"
              />
              <div className="flex space-x-4">
                <select
                  value={editData.priority}
                  onChange={(e) => setEditData(prev => ({ ...prev, priority: e.target.value }))}
                  className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
                <input
                  type="date"
                  value={editData.dueDate}
                  onChange={(e) => setEditData(prev => ({ ...prev, dueDate: e.target.value }))}
                  className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="success" size="sm" onClick={handleSave}>
                  <FiCheck className="w-3 h-3" />
                </Button>
                <Button variant="secondary" size="sm" onClick={handleCancel}>
                  <FiX className="w-3 h-3" />
                </Button>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className={`font-medium ${task.completed ? 'line-through text-gray-500' : 'text-gray-900 dark:text-white'}`}>
                    {task.title}
                  </h3>
                  {task.description && (
                    <p className={`mt-1 text-sm ${task.completed ? 'line-through text-gray-400' : 'text-gray-600 dark:text-gray-400'}`}>
                      {task.description}
                    </p>
                  )}
                </div>
                <div className="flex items-center space-x-2 ml-4">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(task.priority)}`}>
                    {task.priority}
                  </span>
                  <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                    <FiEdit2 className="w-3 h-3" />
                  </Button>
                  <Button variant="danger" size="sm" onClick={() => onDelete(task.id)}>
                    <FiTrash2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center justify-between mt-3 text-xs text-gray-500 dark:text-gray-400">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <FiClock className="w-3 h-3" />
                    <span>Created {format(parseISO(task.createdAt), 'MMM d, yyyy')}</span>
                  </div>
                  {dueDateStatus && (
                    <div className={`flex items-center space-x-1 ${dueDateStatus.color}`}>
                      <FiCalendar className="w-3 h-3" />
                      <span>{dueDateStatus.text}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Card>
  )
}

TaskItem.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    priority: PropTypes.oneOf(['low', 'medium', 'high']).isRequired,
    completed: PropTypes.bool.isRequired,
    createdAt: PropTypes.string.isRequired,
    dueDate: PropTypes.string
  }).isRequired,
  onToggle: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired
}

export default TaskItem