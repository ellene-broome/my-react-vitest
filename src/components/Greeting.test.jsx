// Greeting.test.jsx
import { render, screen } from "@testing-library/react";
import Greeting from "./Greeting";

test("renders the default greeting", () => {
  render(<Greeting />); // no prop passeds
  expect(screen.getByText(/Hello world!/i)).toBeInTheDocument();
});

test("renders a custom name when prop is provided", () => {
  render(<Greeting name="Professor Basham" />);
  expect(screen.getByText(/Hello Professor Basham!/i)).toBeInTheDocument();
});
