import { NavLink, Outlet } from "react-router-dom";

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `text-sm font-medium ${
    isActive ? "text-blue-600" : "text-slate-600"
  } hover:text-blue-600`;

export default function Layout() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-5xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">
              Car Registration Dashboard
            </h1>
          </div>
          <nav className="flex gap-4">
            <NavLink to="/" className={linkClass} end>
              Cars
            </NavLink>
            <NavLink to="/registration" className={linkClass}>
              Registration
            </NavLink>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
}
