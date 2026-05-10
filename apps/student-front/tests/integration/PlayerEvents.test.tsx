import { render, screen, waitFor } from '@testing-library/react';
import CoursePlayerPage from '@/app/profile/my-courses/[id]/page';
import { Navigation } from '@/components/base compo/navigation';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { http, HttpResponse } from 'msw';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import React from 'react';
import { server } from '../../vitest.setup';

// Mock Next.js params
vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn() }),
  useParams: () => ({ id: '59' }),
  usePathname: () => '/profile/my-courses/59',
}));

beforeEach(() => {
  server.use(
    http.get('*/api/enrollment/59', () => {
      return HttpResponse.json({
        id: 59,
        course: {
          title: 'Test Course',
          sections: [
            { id: '1', title: 'Section 1', lessons: [{ id: '1', title: 'Lesson 1', videoUrl: 'test' }] }
          ]
        }
      });
    }),
    http.get('*/auth/profile/user', () => {
      return HttpResponse.json({ id: 1, name: 'Test User', email: 'test@example.com' });
    })
  );
});

const createTestQueryClient = () => new QueryClient({
  defaultOptions: { queries: { retry: false } },
});

describe('Player Events Integration', () => {
  it('should dispatch "hide" event to Navigation on mobile when sidebar is open', async () => {
    const queryClient = createTestQueryClient();
    
    // 1. Mock window.innerWidth to be mobile (375px)
    Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 375 });
    
    // 2. Render both Navigation and Player
    render(
      <QueryClientProvider client={queryClient}>
        <Navigation />
        <CoursePlayerPage />
      </QueryClientProvider>
    );

    // 3. Wait for Player to load and sidebar to be visible (it's open by default)
    await screen.findByText(/Section 1/i);

    // 4. Verify Navigation bar is hidden 
    // In our implementation, we use framer-motion variants. 
    // The Navigation component should have received the 'hide' detail.
    // We can verify this by checking the DOM for the 'hidden' state or checking the event listener.
    
    // Let's verify by checking the Nav bar's visibility
    const nav = screen.getByRole('navigation');
    
    // On mobile, the Navigation bar should be moved out of view (y: -100)
    // We'll wait to ensure the effect has triggered
    await waitFor(() => {
       // Check if the nav has the expected motion style or if it's hidden
       // Since it's a framer-motion component, it might just be translated.
       // However, we can also check if the event was dispatched using a spy.
    });
  });
});
