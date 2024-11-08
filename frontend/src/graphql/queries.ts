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
      }
    }
  }
`;

export const GET_ALL_ARTICLES = gql`
  query GetAllArticles {
    getAllArticles {
      id
      reservations {
        id
      }
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
      articles {
        id
      }
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
      firstname
      lastname
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

export const GET_RESERVATIONS_BY_USER_ID = gql`
  query GetReservationsByUserId {
    getReservationsByUserId {
      reservation
      {id
      startDate
      endDate
      status
      articles {
        id
      }}
      totalPrice
    }
  }
`;

export const SEARCH_AND_FILTER_PRODUCTS = gql`
query SearchAndFilterProducts($dateRangeInput: ProductDateRangeInput, $keyword: String) {
  searchAndFilterProducts(dateRangeInput: $dateRangeInput, keyword: $keyword) {
    id
    name
    description
    price
    imgUrl
  }
}
`;


export const GET_CURRENT_RESERVATION_BY_USER_ID = gql`
  query GetCurrentReservationByUserId {
    getCurrentReservationByUserId {
      reservation {
        status
        startDate
        endDate
        id
        createdAt
        articles {
          id
          product {
            name
            price
          }
        }
      }
      totalPrice
    }
  }
`;


export const GET_RESERVATIONS_BY_ARTICLE_ID = gql`
query GetReservationsByArticleId($articleId: String!) {
  getReservationsByArticleId(articleId: $articleId) {
    id
    articles {
      id
      product {
        name
      }
    }
    startDate
    endDate
    createdAt
    status
    user {
      email
    }
  }
}
`;