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
