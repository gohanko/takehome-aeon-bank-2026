import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { LoginForm } from '../components/organisms/login-form'
import { AuthContext } from '../components/providers/AuthProvider'

const mockPush = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush })
}));

describe('Login Flow', () => {
  const mockLogin = vi.fn();

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
        login: mockLogin,
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

  it('displays error on failed getSecureWord', async () => {
    (global.fetch as any).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: 'Invalid email' })
    });

    customRender();

    const emailInput = screen.getByLabelText('Email Address');
    fireEvent.change(emailInput, { target: { value: 'invalid@dummybank.com' } });
    
    const submitButton = screen.getByText('Next');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Invalid email')).toBeInTheDocument();
    });
  });

  it('completes the full login flow successfully', async () => {
    // 1. Mock getSecureWord
    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ secureWord: 'AEON1234', expiresIn: 60 })
    });

    customRender();

    const emailInput = screen.getByLabelText('Email Address');
    fireEvent.change(emailInput, { target: { value: 'maker@dummybank.com' } });
    fireEvent.click(screen.getByText('Next'));

    // Wait for password step
    await waitFor(() => {
      expect(screen.getByLabelText('Password')).toBeInTheDocument();
    });

    // 2. Mock login
    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ token: 'mock-token', role: 'maker' })
    });

    const passwordInput = screen.getByLabelText('Password');
    fireEvent.change(passwordInput, { target: { value: 'securepassword123' } });
    fireEvent.click(screen.getByText('Login'));

    // Wait for MFA step
    await waitFor(() => {
      expect(screen.getByText('Two-Factor Authentication')).toBeInTheDocument();
    });
    
    expect(mockLogin).toHaveBeenCalledWith('mock-token', 'maker');

    // 3. Mock verifyMfa
    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true })
    });

    const mfaInputs = screen.getAllByRole('textbox');
    for (let i = 0; i < 6; i++) {
        fireEvent.change(mfaInputs[i], { target: { value: '1' } });
    }

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/dashboard/overview');
    });
  });
})
