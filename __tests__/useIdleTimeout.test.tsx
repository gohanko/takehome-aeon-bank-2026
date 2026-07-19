import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { useIdleTimeout } from '../hooks/useIdleTimeout'

describe('useIdleTimeout Hook', () => {
    beforeEach(() => {
        vi.useFakeTimers()
    })

    afterEach(() => {
        vi.restoreAllMocks()
    })

    it('triggers onWarning after warningTime', () => {
        const onWarning = vi.fn()
        const onTimeout = vi.fn()
        
        renderHook(() => useIdleTimeout(onWarning, onTimeout, 10000, 30000))
        
        // Advance time by just under warning time
        act(() => {
            vi.advanceTimersByTime(9000)
        })
        expect(onWarning).not.toHaveBeenCalled()
        
        // Advance time to warning time
        act(() => {
            vi.advanceTimersByTime(1000)
        })
        expect(onWarning).toHaveBeenCalledTimes(1)
        expect(onTimeout).not.toHaveBeenCalled()
    })

    it('triggers onTimeout after timeoutTime', () => {
        const onWarning = vi.fn()
        const onTimeout = vi.fn()
        
        renderHook(() => useIdleTimeout(onWarning, onTimeout, 10000, 30000))
        
        // Advance time to full timeout
        act(() => {
            vi.advanceTimersByTime(30000)
        })
        
        expect(onWarning).toHaveBeenCalledTimes(1)
        expect(onTimeout).toHaveBeenCalledTimes(1)
    })

    it('resets timers on user activity', () => {
        const onWarning = vi.fn()
        const onTimeout = vi.fn()
        
        renderHook(() => useIdleTimeout(onWarning, onTimeout, 10000, 30000))
        
        // Advance time partially
        act(() => {
            vi.advanceTimersByTime(5000)
        })
        
        // Simulate user activity
        act(() => {
            window.dispatchEvent(new Event('mousemove'))
        })
        
        // Advance time another 9000ms (total 14000ms from start)
        // If not reset, it would have fired at 10000ms
        act(() => {
            vi.advanceTimersByTime(9000)
        })
        
        expect(onWarning).not.toHaveBeenCalled()
        
        // Advance time to hit the reset warning
        act(() => {
            vi.advanceTimersByTime(1000)
        })
        expect(onWarning).toHaveBeenCalledTimes(1)
    })
})
