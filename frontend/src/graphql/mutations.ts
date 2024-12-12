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
  mutation DeleteProduct($deleteProductId: String!) {
    deleteProduct(id: $deleteProductId)
  }
`;
export const EDIT_PRODUCT = gql`
  mutation EditProduct($data: NewProductInput!, $productId: String!) {
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
  mutation UpdateReservationStatus($reservationId: String!) {
    updateReservationStatus(reservationId: $reservationId) {
      id
      status
      startDate
      endDate
    }
  }
`;

export const CANCEL_RESERVATION = gql`
  mutation CancelReservation($reservationId: String!) {
    cancelReservation(reservationId: $reservationId) {
      id
      status
    }
  }
`;

export const DELETE_ARTICLE = gql`
  mutation DeleteArticle($deleteArticleId: String!) {
    deleteArticle(id: $deleteArticleId)
  }
`;

<<<<<<< HEAD
=======
export const DELETE_ARTICLE_FROM_RESERVATION = gql`
  mutation DeleteArticleFromReservation($id: String!) {
    deleteArticleFromReservation(articleId: $id) {
      id
    }
  }
`;

<<<<<<< HEAD
export const EDIT_ARTICLE = gql`
  mutation EditArticle($data: EditArticleInput!, $article: String!) {
    editArticle(data: $data, article: $article) {
      id
      availability
    }
  }
`;
>>>>>>> a8da192 (56/delete-article: delete article + reservation if no remaining article)
=======
>>>>>>> 2d5d748 (fix article entity and type bugs)
export const HANDLE_RESERVATION = gql`
  mutation HandleReservation($data: NewReservationInput!) {
    handleReservation(data: $data) {
      id
    }
  }
`;
