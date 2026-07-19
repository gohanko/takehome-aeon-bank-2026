import { render, screen, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { TransactionTable } from '../components/organisms/transaction-table'

// Mock the fetchWithAuth utility
vi.mock('../utilities/api', () => ({
    fetchWithAuth: vi.fn()
}))

import { fetchWithAuth } from '../utilities/api'

describe('TransactionTable Component', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('shows loading state initially', () => {
        (fetchWithAuth as any).mockReturnValue(new Promise(() => {}))
        render(<TransactionTable />)
        expect(screen.getByText('Loading transactions...')).toBeInTheDocument()
    })

    it('renders transactions successfully', async () => {
        const mockData = [
            { id: '1', date: '2026-07-20', description: 'Test TX', amount: 100, type: 'credit', status: 'completed' }
        ];
        
        (fetchWithAuth as any).mockResolvedValueOnce({
            ok: true,
            json: async () => mockData
        });

        render(<TransactionTable />)

        await waitFor(() => {
            expect(screen.queryByText('Loading transactions...')).not.toBeInTheDocument()
        });

        expect(screen.getByText('Test TX')).toBeInTheDocument()
        expect(screen.getByText('+$100.00')).toBeInTheDocument()
    })

    it('renders error state on API failure', async () => {
        (fetchWithAuth as any).mockResolvedValueOnce({
            ok: false
        });

        render(<TransactionTable />)

        await waitFor(() => {
            expect(screen.getByText('Failed to load transactions')).toBeInTheDocument()
        });
    })
})
