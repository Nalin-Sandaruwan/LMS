import "@testing-library/jest-dom";
import React from "react";
import { beforeAll, afterEach, afterAll, vi } from "vitest";
import { setupServer } from "msw/node";

// Global MSW server for tests
export const server = setupServer();

beforeAll(() => server.listen({ onUnhandledRequest: "bypass" }));
afterEach(() => {
  server.resetHandlers();
  vi.clearAllMocks();
});
afterAll(() => server.close());

// Mock matchMedia for components that use it (like Framer Motion or Shadcn)
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // Deprecated
    removeListener: vi.fn(), // Deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Simple mock for framer-motion that is less invasive
vi.mock("framer-motion", async (importOriginal) => {
  const actual = await importOriginal<any>();
  return {
    ...actual,
    AnimatePresence: ({ children }: any) => children,
    // We keep the actual motion components but they might still be slow.
    // However, they won't break the tests.
  };
});
