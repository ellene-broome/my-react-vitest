import { render, screen, fireEvent } from "@testing-library/react";
import CounterButton from "./CounterButton";

test("increments count when clicked", () => {
  render(<CounterButton />);
  const button = screen.getByRole("button", { name: /increment/i });

  expect(button).toHaveTextContent(/count:\s*0/i);
  fireEvent.click(button);
  expect(button).toHaveTextContent(/count:\s*1/i);
  fireEvent.click(button);
  expect(button).toHaveTextContent(/count:\s*2/i);
});
