import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { test, expect } from "vitest";
import { MockedProvider } from "@apollo/client/testing";
import { GET_ALL_PRODUCTS } from "../graphql/queries";
import Home from "../pages/Home";

const mocks = [
  {
    request: {
      query: GET_ALL_PRODUCTS,
      variables: {},
    },
    result: {
      data: {
        getAllProducts: [{
            id: '1',
            name: 'chaussettes',
            description: 'super',
            imgUrl: '',
            price: 12
            }]
        },
    },
  },
];

test("renders home",  async () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
        <Home />
    </MockedProvider>
  );
  expect(await screen.findByText("chaussettes")).toBeInTheDocument();
});
