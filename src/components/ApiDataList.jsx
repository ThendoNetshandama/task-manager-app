import PropTypes from 'prop-types'
import { FiUser, FiMail, FiPhone, FiGlobe } from 'react-icons/fi'
import Card from './ui/Card'

const ApiDataList = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <Card className="p-8 text-center">
        <div className="text-gray-500 dark:text-gray-400">
          No data available
        </div>
      </Card>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {data.map((item) => (
        <Card key={item.id} className="p-4 hover:shadow-lg transition-shadow">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <FiUser className="w-4 h-4 text-blue-600" />
              <h3 className="font-medium text-gray-900 dark:text-white">
                {item.name}
              </h3>
            </div>
            
            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center space-x-2">
                <FiMail className="w-3 h-3" />
                <span>{item.email}</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <FiPhone className="w-3 h-3" />
                <span>{item.phone}</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <FiGlobe className="w-3 h-3" />
                <span>{item.website}</span>
              </div>
            </div>
            
            <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
              <div className="text-xs text-gray-500 dark:text-gray-400">
                <div>Company: {item.company?.name}</div>
                <div>City: {item.address?.city}</div>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}

ApiDataList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object)
}

export default ApiDataList