import { render, screen } from "@testing-library/react";
import { DefaultPage } from "./index";

test("should render the main page", () => {
  render(<DefaultPage />);
  const text = screen.getByText("Main page");
  expect(text).toBeInTheDocument();
});
