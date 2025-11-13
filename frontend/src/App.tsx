import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import HomePage from './pages/HomePage'
import CreateAdPage from './pages/CreateAdPage'
import Layout from './components/Layout'
import AdsPage from './pages/AdsPage'

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="create-ad" element={<CreateAdPage />} />
          <Route path="ads" element={<AdsPage />} />
        </Route>
      </Routes>
    </Router>
  )
}
