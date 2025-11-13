import { Link } from 'react-router-dom'
import ToggleTheme from './ToggleTheme'

export default function Navbar() {
  return (
    <header className="bg-white dark:bg-base-100 shadow-md sticky top-0 z-40">
      <div className="navbar justify-between max-w-7xl mx-auto">
        <div className="navbar-start">
          <div className="flex items-center gap-5">
            <Link to="/" className="flex items-center gap-3">
              <div className="avatar hover:none">
                <div className="absolute -top-2 -right-2.5 bg-primary rounded-full w-3" />
                <div className="relative flex bg-primary text-primary-content justify-center items-center rounded-full w-9">
                  <span className="text-xl font-semibold">xe</span>
                </div>
              </div>
              <h1 className="hidden sm:inline-block text-lg text-base-content">Web Challenge</h1>
            </Link>
          </div>
        </div>

        <div className="navbar-end">
          <ToggleTheme />
        </div>
      </div>
    </header>
  )
}
