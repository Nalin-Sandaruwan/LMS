import { render, screen, waitFor, act } from '@testing-library/react';
import CoursePlayerPage from '@/app/profile/my-courses/[id]/page';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { http, HttpResponse } from 'msw';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import React from 'react';
import { server } from '../../vitest.setup';

// Mock Next.js 
vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn() }),
  useParams: () => ({ id: '59' }),
  usePathname: () => '/profile/my-courses/59',
}));

vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
    info: vi.fn(),
  },
}));

beforeEach(() => {
  server.use(
    http.get('*/api/enrollment/59', () => {
      return HttpResponse.json({
        id: 59,
        completedLessons: [],
        course: {
          title: 'Test Course',
          sections: [
            { id: 's1', title: 'Sec 1', lessons: [{ id: 'lesson-123', title: 'Auto Lesson', videoUrl: 'test' }] }
          ]
        }
      });
    }),
    http.get('*/auth/profile/user', () => {
      return HttpResponse.json({ id: 1, name: 'Test User', email: 'test@example.com' });
    }),
    http.patch('*/api/enrollment/59', async ({ request }) => {
      const body = await request.json() as any;
      if (body.completedLessons.includes('lesson-123')) {
         return HttpResponse.json({ success: true });
      }
      return new HttpResponse(null, { status: 400 });
    })
  );
});

const createTestQueryClient = () => new QueryClient({
  defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
});

describe('Video Auto-Progress Integration', () => {
  it('should automatically mark lesson as complete when Bunny.net sends "ended" event', async () => {
    const queryClient = createTestQueryClient();
    
    render(
      <QueryClientProvider client={queryClient}>
        <CoursePlayerPage />
      </QueryClientProvider>
    );

    // 1. Wait for lesson to load
    await screen.findByTestId('active-lesson', {}, { timeout: 5000 });

    // 2. Simulate Bunny.net postMessage event
    const messageEvent = new MessageEvent('message', {
      data: JSON.stringify({ event: 'ended' }),
      origin: 'https://iframe.mediadelivery.net'
    });

    await act(async () => {
      window.dispatchEvent(messageEvent);
    });

    // 3. Verify that the progress indicator updates
    await waitFor(() => {
        expect(screen.getByText(/1 of 1 completed/i)).toBeInTheDocument();
    });
  });
});
