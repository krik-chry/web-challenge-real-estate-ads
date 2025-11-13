import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'

export default function Layout() {
  return (
    <div className="min-h-screen bg-base-200 overscroll-contain">
      <Navbar />

      <main>
        <Outlet />
      </main>

      <div id="toast-container" className="toast toast-top toast-end z-50"></div>
    </div>
  )
}
