import { Link } from 'react-router-dom'
import type { AdWithMetadata } from '../../../shared/adSchema'
import AdCard from './AdCard'

interface AdsListProps {
  ads: AdWithMetadata[]
}

export default function AdsList({ ads }: AdsListProps) {
  if (!ads) {
    return (
      <div className="card bg-base-100 py-8 rounded-none sm:rounded-xl border border-base-300">
        <div className="card-body text-center">
          <h3 className="text-lg text-base-content/70 font-light mb-2">Δεν βρέθηκαν αγγελίες</h3>
          <Link to="/create-ad" className="btn btn-primary self-center w-fit">
            Δημιουργία Αγγελίας
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      <p className="font-light text-lg text-base-content/70">Βρέθηκαν {ads.length} ακίνητα</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {ads.map((ad) => (
          <AdCard key={ad.placeId} ad={ad} />
        ))}
      </div>
    </div>
  )
}
