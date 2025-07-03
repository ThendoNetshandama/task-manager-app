import  react from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import TaskPage from './pages/TaskPage';
import ApiDataPage from './pages/ApiDataPage';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<TaskPage />} />
          <Route path="/tasks" element={<TaskPage />} />
          <Route path="/api-data" element={<ApiDataPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;