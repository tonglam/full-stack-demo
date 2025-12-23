import { useEffect, useMemo, useState } from "react";
import type { Car } from "../types";

const API_BASE = import.meta.env.VITE_API_URL ?? "http://localhost:5000";

export default function Home() {
  const [cars, setCars] = useState<Car[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [makeFilter, setMakeFilter] = useState("");
  const [lastCompletedQuery, setLastCompletedQuery] = useState("");

  const query = useMemo(() => {
    const params = new URLSearchParams();
    if (makeFilter.trim()) params.append("make", makeFilter.trim());
    const str = params.toString();
    return str ? `?${str}` : "";
  }, [makeFilter]);

  const loading = query !== lastCompletedQuery;

  useEffect(() => {
    let isMounted = true;

    fetch(`${API_BASE}/api/cars${query}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch cars");
        return res.json();
      })
      .then((data: Car[]) => {
        if (!isMounted) return;
        setCars(data);
        setError(null);
        setLastCompletedQuery(query);
      })
      .catch((err: Error) => {
        if (!isMounted) return;
        setError(err.message);
        setLastCompletedQuery(query);
      });

    return () => {
      isMounted = false;
    };
  }, [query]);

  return (
    <section>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold">Cars</h2>
          <p className="text-sm text-slate-500">
            Data served from the .NET API.
          </p>
        </div>
        <label className="flex flex-col text-sm text-slate-600">
          Filter by make
          <input
            value={makeFilter}
            onChange={(e) => setMakeFilter(e.target.value)}
            placeholder="e.g. Toyota"
            className="rounded-md border border-slate-300 px-3 py-2 text-slate-900 focus:border-blue-500 focus:outline-none"
          />
        </label>
      </div>

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
            {loading && (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-6 text-center text-slate-500"
                >
                  Loading cars...
                </td>
              </tr>
            )}
            {error && !loading && (
              <tr>
                <td colSpan={6} className="px-4 py-6 text-center text-red-500">
                  {error}
                </td>
              </tr>
            )}
            {!loading && !error && cars.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-6 text-center text-slate-500"
                >
                  No cars found.
                </td>
              </tr>
            )}
            {!loading &&
              !error &&
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
                  <td className="px-4 py-3">{car.registrationExpiry}</td>
                  <td className="px-4 py-3">
                    {new Date(car.createdAt).toLocaleDateString("en-US", {
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
