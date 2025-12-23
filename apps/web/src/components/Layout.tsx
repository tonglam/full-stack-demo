import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { FaGithub, FaEnvelope } from 'react-icons/fa'

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `text-sm font-medium ${
    isActive ? 'text-blue-600' : 'text-slate-600'
  } hover:text-blue-600`

const titles: Record<string, string> = {
  '/': 'Cars',
  '/registration': 'Registration'
}

export default function Layout() {
  const location = useLocation()
  const title = titles[location.pathname] ?? 'Dashboard'

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 px-4 py-4 sm:flex-row sm:justify-between">
          <NavLink to="/" className="text-2xl font-semibold text-slate-900">
            Dashboard
          </NavLink>
          <nav className="flex gap-6">
            <NavLink to="/" className={linkClass} end>
              Cars
            </NavLink>
            <NavLink to="/registration" className={linkClass}>
              Registration
            </NavLink>
          </nav>
          <div className="flex gap-3 text-slate-400">
            <a
              href="https://github.com/tonglam/full-stack-demo"
              target="_blank"
              rel="noreferrer noopener"
              className="transition hover:text-slate-900"
              aria-label="GitHub repo"
            >
              <FaGithub className="h-5 w-5" />
            </a>
            <a
              href="mailto:qitonglan@gmail.com"
              className="transition hover:text-slate-900"
              aria-label="Email"
            >
              <FaEnvelope className="h-5 w-5" />
            </a>
          </div>
        </div>
      </header>
      <main className="mx-auto min-h-[calc(100vh-220px)] max-w-5xl px-4 py-6">
        <div className="mb-6 text-2xl font-semibold text-slate-900">{title}</div>
        <Outlet />
      </main>
      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-5xl px-4 py-4 text-center text-xs text-slate-500">
          Full Stack Demo · Built by{' '}
          <a
            href="https://www.linkedin.com/in/qitonglan/"
            target="_blank"
            rel="noreferrer noopener"
            className="text-blue-600 hover:underline"
          >
            Qitong (Tong) Lan
          </a>
        </div>
      </footer>
    </div>
  )
}
