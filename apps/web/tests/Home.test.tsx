import { render, screen, waitFor } from '@testing-library/react'
import Home from '../src/pages/Home'
import { vi } from 'vitest'

describe('Home page', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
  })

  it('renders car rows from API', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => [
        {
          id: '1',
          make: 'Toyota',
          model: 'Corolla',
          year: 2020,
          vin: 'VIN-1',
          registrationExpiry: '2025-12-31',
          createdAt: '2025-12-01T00:00:00Z'
        }
      ]
    } as Response)

    render(<Home />)

    await waitFor(() => expect(screen.getByText('Toyota')).toBeVisible())
    expect(screen.getByText('Corolla')).toBeVisible()
    expect(global.fetch).toHaveBeenCalledTimes(1)
  })
})
