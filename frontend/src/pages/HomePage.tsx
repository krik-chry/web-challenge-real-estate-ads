import { Link } from 'react-router-dom'
import { LuCirclePlus, LuSearch } from 'react-icons/lu'

export default function HomePage() {
  return (
    <div className="hero min-h-[calc(50vh)] py-20">
      <div className="hero-content px-2 sm:px-4 text-center">
        <div className="max-w-7xl sm:px-4">
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold mb-6 sm:mb-8 md:mb-12 leading-normal">
            Καλωσήρθατε στη
            <br />
            Χρυσή Ευκαιρία
          </h1>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/create-ad"
              className="btn btn-primary sm:btn-md md:btn-lg w-full max-w-60 sm:max-w-full sm:w-auto"
            >
              <LuCirclePlus className="w-4 h-4 sm:w-5 sm:h-5" />
              Καταχώρηση Ακινήτου
            </Link>
            <Link
              to="/ads"
              className="btn btn-outline hover:border-neutral-400 sm:btn-md md:btn-lg py-2 w-full max-w-60 sm:max-w-full sm:w-auto"
            >
              <LuSearch className="w-4 h-4 sm:w-5 sm:h-5" />
              Δείτε τις Αγγελίες
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
