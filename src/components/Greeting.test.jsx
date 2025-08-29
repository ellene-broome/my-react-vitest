import { render, screen } from "@testing-library/react";
import Greeting from "./Greeting";

test("renders the default greeting", () => {
  render(<Greeting />); // no prop passed
  expect(screen.getByText(/hello world!/i)).toBeInTheDocument();
});

test("renders a custom name when prop is provided", () => {
  render(<Greeting name="Ellene" />);
  expect(screen.getByText(/hello ellene!/i)).toBeInTheDocument();
});
