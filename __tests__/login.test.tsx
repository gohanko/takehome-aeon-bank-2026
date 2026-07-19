import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { LoginForm } from '../components/organisms/login-form'
import { AuthContext } from '../components/providers/AuthProvider'

const mockPush = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush })
}));

describe('Login Flow', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    global.fetch = vi.fn();
  });

  const customRender = () => {
    return render(
      <AuthContext.Provider value={{
        role: null,
        isInitializing: false,
        isAuthenticated: false,
        token: null,
        login: vi.fn(),
        logout: vi.fn(),
      }}>
         <LoginForm />
      </AuthContext.Provider>
    )
  }

  it('progresses from email to password step', async () => {
    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ secureWord: 'AEON1234', expiresIn: 60 })
    });

    customRender();

    const emailInput = screen.getByLabelText('Email Address');
    fireEvent.change(emailInput, { target: { value: 'maker@dummybank.com' } });
    
    const submitButton = screen.getByText('Next');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('AEON1234')).toBeInTheDocument();
      expect(screen.getByLabelText('Password')).toBeInTheDocument();
    });
  });
})
