import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginPage from '@/app/login/page';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { http, HttpResponse } from 'msw';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import React from 'react';
import { server } from '../../vitest.setup';

// Mock Next.js navigation
const mockPush = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush, replace: vi.fn() }),
  usePathname: () => '/login',
}));

vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

// Mock API handlers
beforeEach(() => {
  server.use(
    http.post('*/auth/login', async () => {
      const { delay } = await import('msw');
      await delay(50);
      return HttpResponse.json({ user: { id: 1, email: 'test@example.com', role: 'user' }, token: 'mock-token' });
    }),
    http.get('*/auth/profile/user', () => {
      return new HttpResponse(null, { status: 401 }); // Initially not logged in
    })
  );
});

const createTestQueryClient = () => new QueryClient({
  defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
});

describe('Authentication Flow Integration', () => {
  const setup = () => {
    const user = userEvent.setup();
    const queryClient = createTestQueryClient();
    return { user, queryClient };
  };

  it('should allow user to type and submit login form successfully', async () => {
    const { user, queryClient } = setup();

    render(
      <QueryClientProvider client={queryClient}>
        <LoginPage />
      </QueryClientProvider>
    );

    const emailInput = screen.getByPlaceholderText(/you@example.com/i);
    const passwordInput = screen.getByPlaceholderText(/••••••••/i);

    await user.type(emailInput, 'test@example.com');
    await user.type(passwordInput, 'password123');

    // Pick the first matching button
    const loginButtons = screen.getAllByRole('button', { name: /^Sign In$/i });
    await user.click(loginButtons[0]);

    // Verify loading state
    expect(screen.getByText(/Signing In.../i)).toBeInTheDocument();

    // Verify redirect on success
    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/profile/your-profile');
    }, { timeout: 2000 });
  });

  it('should show error message on failed login', async () => {
    server.use(
      http.post('*/auth/login', () => {
        return new HttpResponse(
          JSON.stringify({ message: 'Invalid credentials' }), 
          { status: 401, headers: { 'Content-Type': 'application/json' } }
        );
      })
    );

    const { user, queryClient } = setup();

    render(
      <QueryClientProvider client={queryClient}>
        <LoginPage />
      </QueryClientProvider>
    );

    await user.type(screen.getByPlaceholderText(/you@example.com/i), 'wrong@example.com');
    await user.type(screen.getByPlaceholderText(/••••••••/i), 'wrongpass');
    
    const loginButtons = screen.getAllByRole('button', { name: /^Sign In$/i });
    await user.click(loginButtons[0]);

    const { toast } = await import('sonner');
    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Sign in failed', expect.anything());
    });
  });
});
