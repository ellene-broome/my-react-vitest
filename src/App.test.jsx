// App.test.jsx

import { render, screen } from "@testing-library/react";
import App from './App'
import { expect } from "vitest";

test('renders hello message', () => {
    render(<App />)

    // Title that was rendered in App.jsx
  expect(
    screen.getByRole("heading", { level: 1, name: /my react \+ vite app/i })
  ).toBeInTheDocument();

  // Greeting 
  expect(
    screen.getByRole("heading", { level: 1, name: /hello\s*professor basham!?/i })
  ).toBeInTheDocument();
});