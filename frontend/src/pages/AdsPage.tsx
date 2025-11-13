import { Suspense } from 'react'
import { Link } from 'react-router-dom'
import { useAdsSuspense } from '../hooks/useAds'
import AdsList from '../components/AdsList'

function AdsContent() {
  const { data } = useAdsSuspense()
  return <AdsList ads={data || []} />
}

function LoadingSpinner() {
  return (
    <div className="mx-auto text-center">
      <div className="loading loading-spinner text-primary self-center loading-xl"></div>
    </div>
  )
}

export default function AdsPage() {
  return (
    <div className="min-h-[calc(100vh-8rem)] py-8">
      <div className="max-w-7xl px-4 mx-auto">
        <div className="breadcrumbs text-sm">
          <ul>
            <li>
              <Link to="/">Αρχική</Link>
            </li>
            <li>
              <Link to="/ads">Αγγελίες</Link>
            </li>
          </ul>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold mt-2 mb-6 sm:mb-8 md:mb-12">
          Όλες οι αγγελίες
        </h1>
        <Suspense fallback={<LoadingSpinner />}>
          <AdsContent />
        </Suspense>
      </div>
    </div>
  )
}
