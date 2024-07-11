import { gql } from "@apollo/client";

export const GET_ALL_PRODUCTS = gql`
  query GetAllProducts {
    getAllProducts {
      id
      name
      description
      imgUrl
      price
      articles {
        id
        availability }
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

export const GET_JWT = gql`
  query Login($password: String!, $email: String!) {
    login(password: $password, email: $email)
  }
`;

export const WHO_AM_I = gql`
  query WhoAmI {
    whoAmI {
      email
      isLoggedIn
      role
    }
  }
`;

export const LOGOUT = gql`
  query Logout {
    logout
  }
`;

export const SEARCH_PRODUCTS = gql`
  query SearchProducts($keyword: String!) {
    searchProducts(keyword: $keyword) {
      id
      name
      description
      imgUrl
      price
    }
  }
`;
