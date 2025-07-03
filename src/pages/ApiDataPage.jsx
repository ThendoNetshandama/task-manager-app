import { useApi } from '../hooks/useApi'
import ApiDataList from '../components/ApiDataList'
import Card from '../components/ui/Card'

const ApiDataPage = () => {
  const { data, loading, error } = useApi('https://jsonplaceholder.typicode.com/users')

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            API Data Demo
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Fetching data from external API
          </p>
        </div>
        <Card className="p-8 text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <div className="mt-4 text-gray-600 dark:text-gray-400">Loading...</div>
        </Card>
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            API Data Demo
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Fetching data from external API
          </p>
        </div>
        <Card className="p-8 text-center">
          <div className="text-red-600 dark:text-red-400">
            Error: {error}
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          API Data Demo
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Data fetched from JSONPlaceholder API
        </p>
      </div>
      
      <div className="text-center">
        <div className="inline-flex items-center space-x-2 px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium dark:bg-green-900 dark:text-green-300">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span>API Connected - {data?.length || 0} records loaded</span>
        </div>
      </div>

      <ApiDataList data={data} />
    </div>
  )
}

export default ApiDataPage