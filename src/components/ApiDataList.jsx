import { useApi } from '../hooks/useApi';
import Card from './ui/Card';
import Button from './ui/Button';

const ApiDataList = () => {
  const { data, loading, error, refetch } = useApi('https://jsonplaceholder.typicode.com/posts');

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-center py-8 text-red-500">Error: {error}</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">API Data</h2>
        <Button onClick={refetch} variant="secondary" size="sm">
          Refresh Data
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data?.slice(0, 9).map(item => (
          <Card key={item.id} className="hover:shadow-lg transition-shadow">
            <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">{item.title}</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">{item.body}</p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ApiDataList;