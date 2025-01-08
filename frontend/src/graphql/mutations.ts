import { gql } from "@apollo/client";

export const CREATE_NEW_PRODUCT = gql`
  mutation CreateNewProduct($data: NewProductInput!) {
    createNewProduct(data: $data) {
      id
      name
      imgUrl
      price
      description
    }
  }
`;

export const CREATE_NEW_ARTICLE = gql`
  mutation CreateNewArticle($data: NewArticleInput!) {
    createNewArticle(data: $data) {
      id
      product {
        id
        name
      }
    }
  }
`;

export const CREATE_NEW_USER = gql`
  mutation CreateNewUser(
    $email: String!
    $password: String!
    $firstname: String!
    $lastname: String!
  ) {
    createUser(
      email: $email
      password: $password
      firstname: $firstname
      lastname: $lastname
    )
  }
`;

export const DELETE_PRODUCT = gql`
  mutation DeleteProduct($deleteProductId: ID!) {
    deleteProduct(id: $deleteProductId)
  }
`;
export const EDIT_PRODUCT = gql`
  mutation EditProduct($data: NewProductInput!, $productId: ID!) {
    editProduct(data: $data, productId: $productId) {
      price
      name
      imgUrl
      id
      description
    }
  }
`;

export const UPDATE_RESERVATION_STATUS = gql`
  mutation UpdateReservationStatus($reservationId: ID!) {
    updateReservationStatus(reservationId: $reservationId) {
      id
      status
      startDate
      endDate
    }
  }
`;

export const CANCEL_RESERVATION = gql`
  mutation CancelReservation($reservationId: ID!) {
    cancelReservation(reservationId: $reservationId) {
      id
      status
    }
  }
`;

export const DELETE_ARTICLE = gql`
  mutation DeleteArticle($deleteArticleId: ID!) {
    deleteArticle(id: $deleteArticleId)
  }
`;

export const DELETE_ARTICLE_FROM_RESERVATION = gql`
  mutation DeleteArticleFromReservation($id: ID!) {
    deleteArticleFromReservation(articleId: $id) {
      id
    }
  }
`;

export const HANDLE_RESERVATION = gql`
  mutation HandleReservation($data: NewReservationInput!) {
    handleReservation(data: $data) {
      id
    }
  }
`;
