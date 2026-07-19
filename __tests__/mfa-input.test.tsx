import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { MfaInput } from '../components/molecules/mfa-input'

describe('MfaInput Component', () => {
    it('renders correct number of input boxes', () => {
        render(<MfaInput length={6} onComplete={vi.fn()} />)
        const inputs = screen.getAllByRole('textbox')
        expect(inputs).toHaveLength(6)
    })

    it('calls onComplete when all boxes are filled', () => {
        const handleComplete = vi.fn()
        render(<MfaInput length={4} onComplete={handleComplete} />)
        const inputs = screen.getAllByRole('textbox')

        fireEvent.change(inputs[0], { target: { value: '1' } })
        fireEvent.change(inputs[1], { target: { value: '2' } })
        fireEvent.change(inputs[2], { target: { value: '3' } })
        fireEvent.change(inputs[3], { target: { value: '4' } })

        expect(handleComplete).toHaveBeenCalledWith('1234')
    })

    it('displays error message when provided', () => {
        render(<MfaInput onComplete={vi.fn()} error="Invalid code" />)
        expect(screen.getByText('Invalid code')).toBeInTheDocument()
    })
})
