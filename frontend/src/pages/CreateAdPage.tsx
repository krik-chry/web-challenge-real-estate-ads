import { Link } from 'react-router-dom'
import AdForm from '../components/AdForm'

export default function CreateAdPage() {
  return (
    <div className="min-h-[calc(100vh-8rem)] py-8">
      <div className="max-w-3xl mx-auto px-4 md:px-2">
        <div className="breadcrumbs text-sm">
          <ul>
            <li>
              <Link to="/">Αρχική</Link>
            </li>
            <li>
              <Link to="/create-ad">Καταχώρηση ακινήτου</Link>
            </li>
          </ul>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold mt-2 mb-6 sm:mb-8 md:mb-12">
          Δημιουργία νέας αγγελίας
        </h1>
      </div>
      <div className="max-w-3xl mx-auto">
        <AdForm />
      </div>
    </div>
  )
}
