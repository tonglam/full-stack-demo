const rawBase = (import.meta.env.VITE_API_URL ?? '').replace(/\/$/, '')

export const API_BASE_URL = rawBase

export const buildApiUrl = (path: string) => {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  return API_BASE_URL ? `${API_BASE_URL}${normalizedPath}` : normalizedPath
}
