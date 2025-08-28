import { render, screen } from "@testing-library/react";
import App from './App'
import { expect } from "vitest";

test('renders hello message', () => {
    render(<App />)

    expect(screen.getByText(/vite \+ react/i)).toBeInTheDocument()
})