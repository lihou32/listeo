import { Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import CreateListing from './pages/CreateListing'
import Results from './pages/Results'
import Auth from './pages/Auth'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/create" element={<CreateListing />} />
      <Route path="/results" element={<Results />} />
    </Routes>
  )
}
