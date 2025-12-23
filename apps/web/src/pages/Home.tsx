import { useEffect, useMemo, useRef, useState } from 'react'
import type { Car } from '../types'
import { buildApiUrl } from '../config'

export default function Home() {
  const [cars, setCars] = useState<Car[]>([])
  const [error, setError] = useState<string | null>(null)
  const [makeFilter, setMakeFilter] = useState('')

  const query = useMemo(() => {
    const params = new URLSearchParams()
    if (makeFilter.trim()) params.append('make', makeFilter.trim())
    const str = params.toString()
    return str ? `?${str}` : ''
  }, [makeFilter])

  const lastFetchedQuery = useRef<string | null>(null)

  useEffect(() => {
    if (lastFetchedQuery.current === query) {
      return
    }
    lastFetchedQuery.current = query

    fetch(buildApiUrl(`/api/cars${query}`))
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch cars')
        return res.json()
      })
      .then((data: Car[]) => {
        setCars(data)
        setError(null)
      })
      .catch((err: Error) => {
        setError(err.message)
        lastFetchedQuery.current = null
      })
  }, [query])

  return (
    <section>
      <div className="mb-4 flex items-center justify-end text-sm">
        <label className="flex flex-col text-sm text-slate-600">
          Search by make
          <input
            value={makeFilter}
            onChange={(e) => setMakeFilter(e.target.value)}
            placeholder="Type a make, e.g. Toyota"
            className="w-64 rounded-md border border-slate-300 px-3 py-2 text-slate-900 focus:border-blue-500 focus:outline-none"
          />
        </label>
      </div>

      <div className="mt-6 overflow-x-auto rounded-xl border border-slate-200 bg-white shadow">
        <table className="w-full min-w-[640px] text-left text-sm text-slate-700">
          <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-4 py-3">Make</th>
              <th className="px-4 py-3">Model</th>
              <th className="px-4 py-3">Year</th>
              <th className="px-4 py-3">VIN</th>
              <th className="px-4 py-3">Registration expiry</th>
              <th className="px-4 py-3">Created</th>
            </tr>
          </thead>
          <tbody>
            {error && (
              <tr>
                <td colSpan={6} className="px-4 py-6 text-center text-red-500">
                  {error}
                </td>
              </tr>
            )}
            {!error && cars.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-6 text-center text-slate-500">
                  No cars found.
                </td>
              </tr>
            )}
            {!error &&
              cars.map((car, index) => (
                <tr
                  key={car.id}
                  className={
                    index % 2 === 0 ? 'border-t border-slate-100 bg-white' : 'border-t border-slate-100 bg-slate-50'
                  }
                >
                  <td className="px-4 py-3 font-medium text-slate-900">{car.make}</td>
                  <td className="px-4 py-3">{car.model}</td>
                  <td className="px-4 py-3">{car.year}</td>
                  <td className="px-4 py-3 font-mono text-xs text-slate-500">{car.vin}</td>
                  <td className="px-4 py-3">
                    {new Date(car.registrationExpiry).toLocaleDateString('en-AU', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </td>
                  <td className="px-4 py-3">
                    {new Date(car.createdAt).toLocaleDateString('en-AU', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
