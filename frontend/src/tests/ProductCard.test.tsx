import { render, screen } from "@testing-library/react";
import { test, expect, vi } from "vitest";
import { MockedProvider } from "@apollo/client/testing";
import { GET_ALL_PRODUCTS } from "../graphql/queries";
import Home from "../pages/Home";
import { MemoryRouter } from "react-router-dom";

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // Méthode dépréciée
    removeListener: vi.fn(), // Méthode dépréciée
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mocks
const mocks = [
  {
    request: {
      query: GET_ALL_PRODUCTS,
      variables: {},
    },
    result: {
      data: {
        getAllProducts: [
          {
            id: "1",
            name: "chaussettes",
            description: "super",
            imgUrl: "",
            price: 12,
            articles: [{ id: 1, availability: true }],
          },
        ],
      },
    },
  },
];

test("renders Home 'chaussettes'", async () => {
  render(
    <MemoryRouter>
      <MockedProvider mocks={mocks} addTypename={false}>
        <Home />
      </MockedProvider>
    </MemoryRouter>
  );

  const elements = await screen.findAllByText("chaussettes");
  expect(elements.length).toBe(2);
});
