import { gql } from "@apollo/client";

export const GET_ALL_PRODUCTS = gql`
  query GetAllProducts {
    getAllProducts {
      id
      name
      description
      imgUrl
      price
    }
  }
`;

export const GET_ALL_ARTICLES = gql`
  query GetAllArticles {
    getAllArticles {
      id
      availability
      product {
        id
        name
      }
    }
  }
`;

export const GET_PRODUCT_BY_ID = gql`
  query GetOneProductById($productId: String!) {
    getOneProductById(productId: $productId) {
      id
      name
      description
      imgUrl
      price
    }
  }
`;
