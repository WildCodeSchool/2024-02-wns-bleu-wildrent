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
      availability
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

export const DELETE_ARTICLE = gql`
  mutation DeleteArticle($deleteArticleId: String!) {
    deleteArticle(id: $deleteArticleId)
  }
`;
export const EDIT_ARTICLE = gql`
  mutation EditArticle($data: EditArticleInput!, $article: String!) {
    editArticle(data: $data, article: $article) {
      id
      availability
    }
  }
`
export const HANDLE_RESERVATION = gql`
mutation HandleReservation($data: NewReservationInput!) {
  handleReservation(data: $data) {
    id
  }
<<<<<<< HEAD
}
`;

export const ADD_ARTICLE_TO_RESERVATION = gql`
mutation AddArticleToReservation($articleId: String!, $reservation: String!) {
  addArticleToReservation(articleId: $articleId, reservation: $reservation) {
    id
  }
}
`;
=======
}`
>>>>>>> 8604264 (refactor createNewReservation and addArticleToReservation into one method handleReservation)
