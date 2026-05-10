import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CourseSidebar } from '@/app/all-courses/[id]/components/CourseSidebar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { http, HttpResponse, delay } from 'msw';
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import React from 'react';
import { server } from '../../vitest.setup';

// 1. Mock Next.js Navigation and Sonner
const mockPush = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
  usePathname: () => '/',
}));

vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

// 2. Mock state
let enrolledCourses: any[] = [];

afterEach(() => {
  enrolledCourses = []; // Reset state for this file
});

beforeEach(() => {
  server.use(
    http.get('*/api/enrollment/user-enrolled-courses', () => {
      return HttpResponse.json(enrolledCourses); 
    }),
    http.get('*/auth/profile/user', () => {
      return HttpResponse.json({ id: 1, name: 'Test User' });
    }),
    http.post('*/api/enrollment', async () => {
      await delay(50);
      // Simulate adding to enrollments
      enrolledCourses = [{ id: 123, classId: 1 }];
      return HttpResponse.json({ id: 123, status: 'active' }, { status: 201 });
    })
  );
});

const createTestQueryClient = () => new QueryClient({
  defaultOptions: {
    queries: { retry: false, gcTime: 0, staleTime: 0 },
    mutations: { retry: false },
  },
});

describe('CourseSidebar Integration', () => {
  const mockCourse: any = { id: 1, title: 'Test Course', price: 'Free' };

  it('should flow from "Enroll Now" to "Start Watching" on success', async () => {
    const user = userEvent.setup();
    const queryClient = createTestQueryClient();

    render(
      <QueryClientProvider client={queryClient}>
        <CourseSidebar course={mockCourse} />
      </QueryClientProvider>
    );

    // 1. Initial state
    const enrollButton = await screen.findByRole('button', { name: /Enroll Now/i });
    
    // 2. Click and see Processing
    await user.click(enrollButton);
    expect(screen.getByText(/Processing.../i)).toBeInTheDocument();
    
    // 3. Wait for success and verify "Start Watching" appears
    // The query invalidation will trigger a refetch of user-enrolled-courses
    await waitFor(() => {
      expect(screen.getByText(/Start Watching/i)).toBeInTheDocument();
    }, { timeout: 2000 });
  });

  it('should redirect to login if user is not authenticated', async () => {
    server.use(
      http.get('*/auth/profile/user', () => {
        return new HttpResponse(null, { status: 401 });
      })
    );

    const user = userEvent.setup();
    const queryClient = createTestQueryClient();

    render(
      <QueryClientProvider client={queryClient}>
        <CourseSidebar course={mockCourse} />
      </QueryClientProvider>
    );

    const enrollButton = await screen.findByRole('button', { name: /Enroll Now/i });
    await user.click(enrollButton);

    expect(mockPush).toHaveBeenCalledWith('/login');
  });

  it('should show "Start Watching" immediately if already enrolled', async () => {
    enrolledCourses = [{ id: 999, classId: 1 }];

    const queryClient = createTestQueryClient();

    render(
      <QueryClientProvider client={queryClient}>
        <CourseSidebar course={mockCourse} />
      </QueryClientProvider>
    );

    const startButton = await screen.findByRole('button', { name: /Start Watching/i });
    expect(startButton).toBeInTheDocument();
  });
});
