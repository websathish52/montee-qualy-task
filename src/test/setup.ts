import "@testing-library/jest-dom/vitest";

globalThis.ResizeObserver = class implements ResizeObserver {
  constructor(_callback: ResizeObserverCallback) {}

  observe() {}

  unobserve() {}

  disconnect() {}
};

Object.defineProperty(window, "scrollTo", {
  writable: true,
  value: () => {},
});

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => {},
  }),
});
