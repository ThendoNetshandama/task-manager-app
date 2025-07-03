import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import TaskPage from './pages/TaskPage'
import ApiDataPage from './pages/ApiDataPage'
import './App.css'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<TaskPage />} />
        <Route path="/api-data" element={<ApiDataPage />} />
      </Routes>
    </Layout>
  )
}

export default App