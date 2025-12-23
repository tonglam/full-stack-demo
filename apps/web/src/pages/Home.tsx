import { useEffect, useMemo, useState } from 'react'
import type { Car } from '../types'

const API_BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:5000'

export default function Home() {
  const [cars, setCars] = useState<Car[]>([])
  const [error, setError] = useState<string | null>(null)
  const [makeFilter, setMakeFilter] = useState('')
  const [activeFilter, setActiveFilter] = useState('')

  const query = useMemo(() => {
    const params = new URLSearchParams()
    if (activeFilter) params.append('make', activeFilter)
    const str = params.toString()
    return str ? `?${str}` : ''
  }, [activeFilter])

  useEffect(() => {
    fetch(`${API_BASE}/api/cars${query}`)
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
      })
  }, [query])

  return (
    <section>
      <form
        className="mb-4 flex items-center justify-end gap-2 text-sm"
        onSubmit={(e) => {
          e.preventDefault()
          setActiveFilter(makeFilter.trim())
        }}
      >
        <label className="flex flex-col text-sm text-slate-600">
          Search by make
          <input
            value={makeFilter}
            onChange={(e) => setMakeFilter(e.target.value)}
            placeholder="Type a make, e.g. Toyota"
            className="w-64 rounded-md border border-slate-300 px-3 py-2 text-slate-900 focus:border-blue-500 focus:outline-none"
          />
        </label>
        <button
          type="submit"
          className="mt-6 rounded-md bg-blue-600 px-3 py-2 font-medium text-white hover:bg-blue-700"
        >
          Apply
        </button>
        {activeFilter && (
          <button
            type="button"
            onClick={() => {
              setMakeFilter('')
              setActiveFilter('')
            }}
            className="mt-6 rounded-md border border-slate-300 px-3 py-2 font-medium text-slate-700"
          >
            Clear
          </button>
        )}
      </form>

      <div className="mt-6 overflow-x-auto rounded-lg border border-slate-200 bg-white shadow-sm">
        <table className="w-full min-w-[640px] text-left text-sm">
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
                <td
                  colSpan={6}
                  className="px-4 py-6 text-center text-slate-500"
                >
                  No cars found.
                </td>
              </tr>
            )}
            {!error &&
              cars.map((car) => (
                <tr key={car.id} className="border-t border-slate-100">
                  <td className="px-4 py-3 font-medium text-slate-900">
                    {car.make}
                  </td>
                  <td className="px-4 py-3">{car.model}</td>
                  <td className="px-4 py-3">{car.year}</td>
                  <td className="px-4 py-3 font-mono text-xs text-slate-500">
                    {car.vin}
                  </td>
                  <td className="px-4 py-3">
                    {new Date(car.registrationExpiry).toLocaleDateString('en-AU', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </td>
                  <td className="px-4 py-3">
                    {new Date(car.createdAt).toLocaleDateString("en-AU", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
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
