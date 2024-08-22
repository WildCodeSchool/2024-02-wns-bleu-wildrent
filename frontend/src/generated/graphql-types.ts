import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Article = {
  __typename?: 'Article';
  availability: Scalars['Boolean']['output'];
  id: Scalars['Float']['output'];
  product: Product;
  reservation: Reservation;
};

export type EditArticleInput = {
  availability: Scalars['Boolean']['input'];
};

export type EditReservationInput = {
  status: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createNewArticle: Article;
  createNewProduct: Product;
  createNewReservation: Reservation;
  createUser: Scalars['String']['output'];
  deleteArticle: Scalars['String']['output'];
  deleteProduct: Scalars['String']['output'];
  deleteReservation: Scalars['String']['output'];
  editArticle: Article;
  editProduct: Product;
  editReservation: Reservation;
};


export type MutationCreateNewArticleArgs = {
  data: NewArticleInput;
};


export type MutationCreateNewProductArgs = {
  data: NewProductInput;
};


export type MutationCreateNewReservationArgs = {
  data: NewReservationInput;
};


export type MutationCreateUserArgs = {
  email: Scalars['String']['input'];
  firstname: Scalars['String']['input'];
  lastname: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationDeleteArticleArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteProductArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteReservationArgs = {
  id: Scalars['String']['input'];
};


export type MutationEditArticleArgs = {
  article: Scalars['String']['input'];
  data: EditArticleInput;
};


export type MutationEditProductArgs = {
  data: NewProductInput;
  productId: Scalars['String']['input'];
};


export type MutationEditReservationArgs = {
  data: EditReservationInput;
  reservation: Scalars['String']['input'];
};

export type NewArticleInput = {
  availability: Scalars['Boolean']['input'];
  productId?: InputMaybe<Scalars['String']['input']>;
};

export type NewProductInput = {
  description: Scalars['String']['input'];
  imgUrl?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  price: Scalars['Float']['input'];
};

export type NewReservationInput = {
  date: Scalars['String']['input'];
  status: Scalars['String']['input'];
  userId?: InputMaybe<Scalars['String']['input']>;
};

export type Product = {
  __typename?: 'Product';
  articles?: Maybe<Array<Article>>;
  description: Scalars['String']['output'];
  id: Scalars['Float']['output'];
  imgUrl: Scalars['String']['output'];
  name: Scalars['String']['output'];
  price: Scalars['Float']['output'];
};

export type Query = {
  __typename?: 'Query';
  getAllArticles: Array<Article>;
  getAllProducts: Array<Product>;
  getAllReservations: Array<Reservation>;
  getOneProductById: Product;
  login: Scalars['String']['output'];
  logout: Scalars['String']['output'];
  searchProducts: Array<Product>;
  whoAmI: UserInfo;
};


export type QueryGetOneProductByIdArgs = {
  productId: Scalars['String']['input'];
};


export type QueryLoginArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type QuerySearchProductsArgs = {
  keyword: Scalars['String']['input'];
};

export type Reservation = {
  __typename?: 'Reservation';
  date: Scalars['String']['output'];
  id: Scalars['Float']['output'];
  status: Scalars['String']['output'];
  user: User;
};

export type User = {
  __typename?: 'User';
  email: Scalars['String']['output'];
};

export type UserInfo = {
  __typename?: 'UserInfo';
  email?: Maybe<Scalars['String']['output']>;
  firstname?: Maybe<Scalars['String']['output']>;
  isLoggedIn: Scalars['Boolean']['output'];
  lastname?: Maybe<Scalars['String']['output']>;
  role?: Maybe<Scalars['String']['output']>;
};

export type CreateNewProductMutationVariables = Exact<{
  data: NewProductInput;
}>;


export type CreateNewProductMutation = { __typename?: 'Mutation', createNewProduct: { __typename?: 'Product', id: number, name: string, imgUrl: string, price: number, description: string } };

export type CreateNewArticleMutationVariables = Exact<{
  data: NewArticleInput;
}>;


export type CreateNewArticleMutation = { __typename?: 'Mutation', createNewArticle: { __typename?: 'Article', id: number, availability: boolean, product: { __typename?: 'Product', id: number, name: string } } };

export type CreateNewUserMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  firstname: Scalars['String']['input'];
  lastname: Scalars['String']['input'];
}>;


export type CreateNewUserMutation = { __typename?: 'Mutation', createUser: string };

export type DeleteProductMutationVariables = Exact<{
  deleteProductId: Scalars['String']['input'];
}>;


export type DeleteProductMutation = { __typename?: 'Mutation', deleteProduct: string };

export type EditProductMutationVariables = Exact<{
  data: NewProductInput;
  productId: Scalars['String']['input'];
}>;


export type EditProductMutation = { __typename?: 'Mutation', editProduct: { __typename?: 'Product', price: number, name: string, imgUrl: string, id: number, description: string } };

export type DeleteArticleMutationVariables = Exact<{
  deleteArticleId: Scalars['String']['input'];
}>;


export type DeleteArticleMutation = { __typename?: 'Mutation', deleteArticle: string };

export type EditArticleMutationVariables = Exact<{
  data: EditArticleInput;
  article: Scalars['String']['input'];
}>;


export type EditArticleMutation = { __typename?: 'Mutation', editArticle: { __typename?: 'Article', id: number, availability: boolean } };


export const CreateNewProductDocument = gql`
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
export type CreateNewProductMutationFn = Apollo.MutationFunction<CreateNewProductMutation, CreateNewProductMutationVariables>;

/**
 * __useCreateNewProductMutation__
 *
 * To run a mutation, you first call `useCreateNewProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateNewProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createNewProductMutation, { data, loading, error }] = useCreateNewProductMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateNewProductMutation(baseOptions?: Apollo.MutationHookOptions<CreateNewProductMutation, CreateNewProductMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateNewProductMutation, CreateNewProductMutationVariables>(CreateNewProductDocument, options);
      }
export type CreateNewProductMutationHookResult = ReturnType<typeof useCreateNewProductMutation>;
export type CreateNewProductMutationResult = Apollo.MutationResult<CreateNewProductMutation>;
export type CreateNewProductMutationOptions = Apollo.BaseMutationOptions<CreateNewProductMutation, CreateNewProductMutationVariables>;
export const CreateNewArticleDocument = gql`
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
export type CreateNewArticleMutationFn = Apollo.MutationFunction<CreateNewArticleMutation, CreateNewArticleMutationVariables>;

/**
 * __useCreateNewArticleMutation__
 *
 * To run a mutation, you first call `useCreateNewArticleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateNewArticleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createNewArticleMutation, { data, loading, error }] = useCreateNewArticleMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateNewArticleMutation(baseOptions?: Apollo.MutationHookOptions<CreateNewArticleMutation, CreateNewArticleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateNewArticleMutation, CreateNewArticleMutationVariables>(CreateNewArticleDocument, options);
      }
export type CreateNewArticleMutationHookResult = ReturnType<typeof useCreateNewArticleMutation>;
export type CreateNewArticleMutationResult = Apollo.MutationResult<CreateNewArticleMutation>;
export type CreateNewArticleMutationOptions = Apollo.BaseMutationOptions<CreateNewArticleMutation, CreateNewArticleMutationVariables>;
export const CreateNewUserDocument = gql`
    mutation CreateNewUser($email: String!, $password: String!, $firstname: String!, $lastname: String!) {
  createUser(
    email: $email
    password: $password
    firstname: $firstname
    lastname: $lastname
  )
}
    `;
export type CreateNewUserMutationFn = Apollo.MutationFunction<CreateNewUserMutation, CreateNewUserMutationVariables>;

/**
 * __useCreateNewUserMutation__
 *
 * To run a mutation, you first call `useCreateNewUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateNewUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createNewUserMutation, { data, loading, error }] = useCreateNewUserMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *      firstname: // value for 'firstname'
 *      lastname: // value for 'lastname'
 *   },
 * });
 */
export function useCreateNewUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateNewUserMutation, CreateNewUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateNewUserMutation, CreateNewUserMutationVariables>(CreateNewUserDocument, options);
      }
export type CreateNewUserMutationHookResult = ReturnType<typeof useCreateNewUserMutation>;
export type CreateNewUserMutationResult = Apollo.MutationResult<CreateNewUserMutation>;
export type CreateNewUserMutationOptions = Apollo.BaseMutationOptions<CreateNewUserMutation, CreateNewUserMutationVariables>;
export const DeleteProductDocument = gql`
    mutation DeleteProduct($deleteProductId: String!) {
  deleteProduct(id: $deleteProductId)
}
    `;
export type DeleteProductMutationFn = Apollo.MutationFunction<DeleteProductMutation, DeleteProductMutationVariables>;

/**
 * __useDeleteProductMutation__
 *
 * To run a mutation, you first call `useDeleteProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteProductMutation, { data, loading, error }] = useDeleteProductMutation({
 *   variables: {
 *      deleteProductId: // value for 'deleteProductId'
 *   },
 * });
 */
export function useDeleteProductMutation(baseOptions?: Apollo.MutationHookOptions<DeleteProductMutation, DeleteProductMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteProductMutation, DeleteProductMutationVariables>(DeleteProductDocument, options);
      }
export type DeleteProductMutationHookResult = ReturnType<typeof useDeleteProductMutation>;
export type DeleteProductMutationResult = Apollo.MutationResult<DeleteProductMutation>;
export type DeleteProductMutationOptions = Apollo.BaseMutationOptions<DeleteProductMutation, DeleteProductMutationVariables>;
export const EditProductDocument = gql`
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
export type EditProductMutationFn = Apollo.MutationFunction<EditProductMutation, EditProductMutationVariables>;

/**
 * __useEditProductMutation__
 *
 * To run a mutation, you first call `useEditProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editProductMutation, { data, loading, error }] = useEditProductMutation({
 *   variables: {
 *      data: // value for 'data'
 *      productId: // value for 'productId'
 *   },
 * });
 */
export function useEditProductMutation(baseOptions?: Apollo.MutationHookOptions<EditProductMutation, EditProductMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditProductMutation, EditProductMutationVariables>(EditProductDocument, options);
      }
export type EditProductMutationHookResult = ReturnType<typeof useEditProductMutation>;
export type EditProductMutationResult = Apollo.MutationResult<EditProductMutation>;
export type EditProductMutationOptions = Apollo.BaseMutationOptions<EditProductMutation, EditProductMutationVariables>;
export const DeleteArticleDocument = gql`
    mutation DeleteArticle($deleteArticleId: String!) {
  deleteArticle(id: $deleteArticleId)
}
    `;
export type DeleteArticleMutationFn = Apollo.MutationFunction<DeleteArticleMutation, DeleteArticleMutationVariables>;

/**
 * __useDeleteArticleMutation__
 *
 * To run a mutation, you first call `useDeleteArticleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteArticleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteArticleMutation, { data, loading, error }] = useDeleteArticleMutation({
 *   variables: {
 *      deleteArticleId: // value for 'deleteArticleId'
 *   },
 * });
 */
export function useDeleteArticleMutation(baseOptions?: Apollo.MutationHookOptions<DeleteArticleMutation, DeleteArticleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteArticleMutation, DeleteArticleMutationVariables>(DeleteArticleDocument, options);
      }
export type DeleteArticleMutationHookResult = ReturnType<typeof useDeleteArticleMutation>;
export type DeleteArticleMutationResult = Apollo.MutationResult<DeleteArticleMutation>;
export type DeleteArticleMutationOptions = Apollo.BaseMutationOptions<DeleteArticleMutation, DeleteArticleMutationVariables>;
export const EditArticleDocument = gql`
    mutation EditArticle($data: EditArticleInput!, $article: String!) {
  editArticle(data: $data, article: $article) {
    id
    availability
  }
}
    `;
export type EditArticleMutationFn = Apollo.MutationFunction<EditArticleMutation, EditArticleMutationVariables>;

/**
 * __useEditArticleMutation__
 *
 * To run a mutation, you first call `useEditArticleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditArticleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editArticleMutation, { data, loading, error }] = useEditArticleMutation({
 *   variables: {
 *      data: // value for 'data'
 *      article: // value for 'article'
 *   },
 * });
 */
export function useEditArticleMutation(baseOptions?: Apollo.MutationHookOptions<EditArticleMutation, EditArticleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditArticleMutation, EditArticleMutationVariables>(EditArticleDocument, options);
      }
export type EditArticleMutationHookResult = ReturnType<typeof useEditArticleMutation>;
export type EditArticleMutationResult = Apollo.MutationResult<EditArticleMutation>;
export type EditArticleMutationOptions = Apollo.BaseMutationOptions<EditArticleMutation, EditArticleMutationVariables>;