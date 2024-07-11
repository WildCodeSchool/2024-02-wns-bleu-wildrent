import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { test, expect } from "vitest";
import Navbar from "../components/Navbar";
import { BrowserRouter } from "react-router-dom";

test("renders the navbar", () => {
  render(
    <BrowserRouter>
      <Navbar />
    </BrowserRouter>
  );
  const titleElement = screen.getByText(/Wildrent/);  
  expect(titleElement).toBeInTheDocument();
});