import PropTypes from 'prop-types';

const TaskFilter = ({ filter, setFilter }) => {
  return (
    <div className="flex space-x-4 mb-6">
      <Button
        variant={filter === 'all' ? 'primary' : 'outline'}
        size="sm"
        onClick={() => setFilter('all')}
      >
        All
      </Button>
      <Button
        variant={filter === 'active' ? 'primary' : 'outline'}
        size="sm"
        onClick={() => setFilter('active')}
      >
        Active
      </Button>
      <Button
        variant={filter === 'completed' ? 'primary' : 'outline'}
        size="sm"
        onClick={() => setFilter('completed')}
      >
        Completed
      </Button>
    </div>
  );
};

TaskFilter.propTypes = {
  filter: PropTypes.string.isRequired,
  setFilter: PropTypes.func.isRequired,
};

export default TaskFilter;