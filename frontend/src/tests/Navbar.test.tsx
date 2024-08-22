import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { test, expect } from "vitest";
import Navbar from "../components/Navbar";
import { MemoryRouter } from "react-router-dom";
import { MockedProvider } from "@apollo/client/testing";


test("renders the navbar", () => {
  render(
    <MockedProvider >
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    </MockedProvider>
  );
  const titleElement = screen.getByText(/Wildrent/);  
  expect(titleElement).toBeInTheDocument();
});
