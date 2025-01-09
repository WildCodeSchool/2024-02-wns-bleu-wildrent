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
  DateTimeISO: { input: any; output: any; }
};

export type Article = {
  __typename?: 'Article';
  id: Scalars['Float']['output'];
  product: Product;
  reservations?: Maybe<Array<Reservation>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  canDeleteArticle: Scalars['String']['output'];
  cancelReservation: Reservation;
  createNewArticle: Article;
  createNewProduct: Product;
  createUser: Scalars['String']['output'];
  deleteArticle: Scalars['String']['output'];
  deleteArticleFromReservation: Article;
  deleteProduct: Scalars['String']['output'];
  editProduct: Product;
  handleReservation: Reservation;
  updateReservationStatus: Reservation;
};


export type MutationCanDeleteArticleArgs = {
  articleId: Scalars['String']['input'];
};


export type MutationCancelReservationArgs = {
  reservationId: Scalars['String']['input'];
};


export type MutationCreateNewArticleArgs = {
  data: NewArticleInput;
};


export type MutationCreateNewProductArgs = {
  data: NewProductInput;
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


export type MutationDeleteArticleFromReservationArgs = {
  articleId: Scalars['String']['input'];
};


export type MutationDeleteProductArgs = {
  id: Scalars['String']['input'];
};


export type MutationEditProductArgs = {
  data: NewProductInput;
  productId: Scalars['String']['input'];
};


export type MutationHandleReservationArgs = {
  data: NewReservationInput;
};


export type MutationUpdateReservationStatusArgs = {
  reservationId: Scalars['String']['input'];
};

export type NewArticleInput = {
  availability: Scalars['Boolean']['input'];
  productId: Scalars['String']['input'];
};

export type NewProductInput = {
  description: Scalars['String']['input'];
  imgUrl?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  price: Scalars['Float']['input'];
};

export type NewReservationInput = {
  articleId: Scalars['String']['input'];
  endDate: Scalars['DateTimeISO']['input'];
  startDate: Scalars['DateTimeISO']['input'];
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

export type ProductDateRangeInput = {
  endDate?: InputMaybe<Scalars['DateTimeISO']['input']>;
  startDate?: InputMaybe<Scalars['DateTimeISO']['input']>;
};

export type Query = {
  __typename?: 'Query';
  getAllArticles: Array<Article>;
  getAllProducts: Array<Product>;
  getAllReservations: Array<Reservation>;
  getCurrentReservationByUserId: ReservationWithTotal;
  getOneProductById: Product;
  getOneReservationById: Reservation;
  getReservationsByArticleId: Array<Reservation>;
  getReservationsByUserId: Array<ReservationWithTotal>;
  login: Scalars['String']['output'];
  logout: Scalars['String']['output'];
  searchAndFilterProducts: Array<Product>;
  whoAmI: UserInfo;
};


export type QueryGetOneProductByIdArgs = {
  productId: Scalars['String']['input'];
};


export type QueryGetOneReservationByIdArgs = {
  reservationId: Scalars['String']['input'];
};


export type QueryGetReservationsByArticleIdArgs = {
  articleId: Scalars['String']['input'];
};


export type QueryLoginArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type QuerySearchAndFilterProductsArgs = {
  dateRangeInput?: InputMaybe<ProductDateRangeInput>;
  keyword?: InputMaybe<Scalars['String']['input']>;
};

export type Reservation = {
  __typename?: 'Reservation';
  articles: Array<Article>;
  createdAt: Scalars['DateTimeISO']['output'];
  endDate: Scalars['DateTimeISO']['output'];
  id: Scalars['Float']['output'];
  startDate: Scalars['DateTimeISO']['output'];
  status: Scalars['String']['output'];
  user: User;
};

export type ReservationWithTotal = {
  __typename?: 'ReservationWithTotal';
  reservation: Reservation;
  totalPrice: Scalars['Float']['output'];
};

/** user role */
export enum Role {
  Admin = 'Admin',
  User = 'User'
}

export type User = {
  __typename?: 'User';
  email: Scalars['String']['output'];
  firstname: Scalars['String']['output'];
  hashedPassword: Scalars['String']['output'];
  lastname: Scalars['String']['output'];
  reservations?: Maybe<Array<Reservation>>;
  role: Role;
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


export type CreateNewArticleMutation = { __typename?: 'Mutation', createNewArticle: { __typename?: 'Article', id: number, product: { __typename?: 'Product', id: number, name: string } } };

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

export type UpdateReservationStatusMutationVariables = Exact<{
  reservationId: Scalars['String']['input'];
}>;


export type UpdateReservationStatusMutation = { __typename?: 'Mutation', updateReservationStatus: { __typename?: 'Reservation', id: number, status: string, startDate: any, endDate: any } };

export type CancelReservationMutationVariables = Exact<{
  reservationId: Scalars['String']['input'];
}>;


export type CancelReservationMutation = { __typename?: 'Mutation', cancelReservation: { __typename?: 'Reservation', id: number, status: string } };

export type DeleteArticleMutationVariables = Exact<{
  deleteArticleId: Scalars['String']['input'];
}>;


export type DeleteArticleMutation = { __typename?: 'Mutation', deleteArticle: string };

export type DeleteArticleFromReservationMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type DeleteArticleFromReservationMutation = { __typename?: 'Mutation', deleteArticleFromReservation: { __typename?: 'Article', id: number } };

export type HandleReservationMutationVariables = Exact<{
  data: NewReservationInput;
}>;


export type HandleReservationMutation = { __typename?: 'Mutation', handleReservation: { __typename?: 'Reservation', id: number } };

export type CanDeleteArticleMutationVariables = Exact<{
  articleId: Scalars['String']['input'];
}>;


export type CanDeleteArticleMutation = { __typename?: 'Mutation', canDeleteArticle: string };

export type GetAllProductsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllProductsQuery = { __typename?: 'Query', getAllProducts: Array<{ __typename?: 'Product', id: number, name: string, description: string, imgUrl: string, price: number, articles?: Array<{ __typename?: 'Article', id: number }> | null }> };

export type GetAllArticlesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllArticlesQuery = { __typename?: 'Query', getAllArticles: Array<{ __typename?: 'Article', id: number, reservations?: Array<{ __typename?: 'Reservation', id: number }> | null, product: { __typename?: 'Product', id: number, name: string } }> };

export type GetOneProductByIdQueryVariables = Exact<{
  productId: Scalars['String']['input'];
}>;


export type GetOneProductByIdQuery = { __typename?: 'Query', getOneProductById: { __typename?: 'Product', id: number, name: string, description: string, imgUrl: string, price: number, articles?: Array<{ __typename?: 'Article', id: number }> | null } };

export type LoginQueryVariables = Exact<{
  password: Scalars['String']['input'];
  email: Scalars['String']['input'];
}>;


export type LoginQuery = { __typename?: 'Query', login: string };

export type WhoAmIQueryVariables = Exact<{ [key: string]: never; }>;


export type WhoAmIQuery = { __typename?: 'Query', whoAmI: { __typename?: 'UserInfo', email?: string | null, firstname?: string | null, lastname?: string | null, isLoggedIn: boolean, role?: string | null } };

export type LogoutQueryVariables = Exact<{ [key: string]: never; }>;


export type LogoutQuery = { __typename?: 'Query', logout: string };

export type GetReservationsByUserIdQueryVariables = Exact<{ [key: string]: never; }>;


export type GetReservationsByUserIdQuery = { __typename?: 'Query', getReservationsByUserId: Array<{ __typename?: 'ReservationWithTotal', totalPrice: number, reservation: { __typename?: 'Reservation', id: number, startDate: any, endDate: any, status: string, articles: Array<{ __typename?: 'Article', id: number }> } }> };

export type SearchAndFilterProductsQueryVariables = Exact<{
  dateRangeInput?: InputMaybe<ProductDateRangeInput>;
  keyword?: InputMaybe<Scalars['String']['input']>;
}>;


export type SearchAndFilterProductsQuery = { __typename?: 'Query', searchAndFilterProducts: Array<{ __typename?: 'Product', id: number, name: string, description: string, price: number, imgUrl: string }> };

export type GetCurrentReservationByUserIdQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCurrentReservationByUserIdQuery = { __typename?: 'Query', getCurrentReservationByUserId: { __typename?: 'ReservationWithTotal', totalPrice: number, reservation: { __typename?: 'Reservation', status: string, startDate: any, endDate: any, id: number, createdAt: any, articles: Array<{ __typename?: 'Article', id: number, product: { __typename?: 'Product', name: string, price: number, imgUrl: string } }> } } };

export type GetReservationsByArticleIdQueryVariables = Exact<{
  articleId: Scalars['String']['input'];
}>;


export type GetReservationsByArticleIdQuery = { __typename?: 'Query', getReservationsByArticleId: Array<{ __typename?: 'Reservation', id: number, startDate: any, endDate: any, createdAt: any, status: string, articles: Array<{ __typename?: 'Article', id: number, product: { __typename?: 'Product', name: string } }>, user: { __typename?: 'User', email: string } }> };

export type GetAllReservationsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllReservationsQuery = { __typename?: 'Query', getAllReservations: Array<{ __typename?: 'Reservation', startDate: any, endDate: any, user: { __typename?: 'User', firstname: string, lastname: string }, articles: Array<{ __typename?: 'Article', product: { __typename?: 'Product', name: string } }> }> };


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
export const UpdateReservationStatusDocument = gql`
    mutation UpdateReservationStatus($reservationId: String!) {
  updateReservationStatus(reservationId: $reservationId) {
    id
    status
    startDate
    endDate
  }
}
    `;
export type UpdateReservationStatusMutationFn = Apollo.MutationFunction<UpdateReservationStatusMutation, UpdateReservationStatusMutationVariables>;

/**
 * __useUpdateReservationStatusMutation__
 *
 * To run a mutation, you first call `useUpdateReservationStatusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateReservationStatusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateReservationStatusMutation, { data, loading, error }] = useUpdateReservationStatusMutation({
 *   variables: {
 *      reservationId: // value for 'reservationId'
 *   },
 * });
 */
export function useUpdateReservationStatusMutation(baseOptions?: Apollo.MutationHookOptions<UpdateReservationStatusMutation, UpdateReservationStatusMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateReservationStatusMutation, UpdateReservationStatusMutationVariables>(UpdateReservationStatusDocument, options);
      }
export type UpdateReservationStatusMutationHookResult = ReturnType<typeof useUpdateReservationStatusMutation>;
export type UpdateReservationStatusMutationResult = Apollo.MutationResult<UpdateReservationStatusMutation>;
export type UpdateReservationStatusMutationOptions = Apollo.BaseMutationOptions<UpdateReservationStatusMutation, UpdateReservationStatusMutationVariables>;
export const CancelReservationDocument = gql`
    mutation CancelReservation($reservationId: String!) {
  cancelReservation(reservationId: $reservationId) {
    id
    status
  }
}
    `;
export type CancelReservationMutationFn = Apollo.MutationFunction<CancelReservationMutation, CancelReservationMutationVariables>;

/**
 * __useCancelReservationMutation__
 *
 * To run a mutation, you first call `useCancelReservationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCancelReservationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [cancelReservationMutation, { data, loading, error }] = useCancelReservationMutation({
 *   variables: {
 *      reservationId: // value for 'reservationId'
 *   },
 * });
 */
export function useCancelReservationMutation(baseOptions?: Apollo.MutationHookOptions<CancelReservationMutation, CancelReservationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CancelReservationMutation, CancelReservationMutationVariables>(CancelReservationDocument, options);
      }
export type CancelReservationMutationHookResult = ReturnType<typeof useCancelReservationMutation>;
export type CancelReservationMutationResult = Apollo.MutationResult<CancelReservationMutation>;
export type CancelReservationMutationOptions = Apollo.BaseMutationOptions<CancelReservationMutation, CancelReservationMutationVariables>;
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
export const DeleteArticleFromReservationDocument = gql`
    mutation DeleteArticleFromReservation($id: String!) {
  deleteArticleFromReservation(articleId: $id) {
    id
  }
}
    `;
export type DeleteArticleFromReservationMutationFn = Apollo.MutationFunction<DeleteArticleFromReservationMutation, DeleteArticleFromReservationMutationVariables>;

/**
 * __useDeleteArticleFromReservationMutation__
 *
 * To run a mutation, you first call `useDeleteArticleFromReservationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteArticleFromReservationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteArticleFromReservationMutation, { data, loading, error }] = useDeleteArticleFromReservationMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteArticleFromReservationMutation(baseOptions?: Apollo.MutationHookOptions<DeleteArticleFromReservationMutation, DeleteArticleFromReservationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteArticleFromReservationMutation, DeleteArticleFromReservationMutationVariables>(DeleteArticleFromReservationDocument, options);
      }
export type DeleteArticleFromReservationMutationHookResult = ReturnType<typeof useDeleteArticleFromReservationMutation>;
export type DeleteArticleFromReservationMutationResult = Apollo.MutationResult<DeleteArticleFromReservationMutation>;
export type DeleteArticleFromReservationMutationOptions = Apollo.BaseMutationOptions<DeleteArticleFromReservationMutation, DeleteArticleFromReservationMutationVariables>;
export const HandleReservationDocument = gql`
    mutation HandleReservation($data: NewReservationInput!) {
  handleReservation(data: $data) {
    id
  }
}
    `;
export type HandleReservationMutationFn = Apollo.MutationFunction<HandleReservationMutation, HandleReservationMutationVariables>;

/**
 * __useHandleReservationMutation__
 *
 * To run a mutation, you first call `useHandleReservationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useHandleReservationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [handleReservationMutation, { data, loading, error }] = useHandleReservationMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useHandleReservationMutation(baseOptions?: Apollo.MutationHookOptions<HandleReservationMutation, HandleReservationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<HandleReservationMutation, HandleReservationMutationVariables>(HandleReservationDocument, options);
      }
export type HandleReservationMutationHookResult = ReturnType<typeof useHandleReservationMutation>;
export type HandleReservationMutationResult = Apollo.MutationResult<HandleReservationMutation>;
export type HandleReservationMutationOptions = Apollo.BaseMutationOptions<HandleReservationMutation, HandleReservationMutationVariables>;
export const CanDeleteArticleDocument = gql`
    mutation CanDeleteArticle($articleId: String!) {
  canDeleteArticle(articleId: $articleId)
}
    `;
export type CanDeleteArticleMutationFn = Apollo.MutationFunction<CanDeleteArticleMutation, CanDeleteArticleMutationVariables>;

/**
 * __useCanDeleteArticleMutation__
 *
 * To run a mutation, you first call `useCanDeleteArticleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCanDeleteArticleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [canDeleteArticleMutation, { data, loading, error }] = useCanDeleteArticleMutation({
 *   variables: {
 *      articleId: // value for 'articleId'
 *   },
 * });
 */
export function useCanDeleteArticleMutation(baseOptions?: Apollo.MutationHookOptions<CanDeleteArticleMutation, CanDeleteArticleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CanDeleteArticleMutation, CanDeleteArticleMutationVariables>(CanDeleteArticleDocument, options);
      }
export type CanDeleteArticleMutationHookResult = ReturnType<typeof useCanDeleteArticleMutation>;
export type CanDeleteArticleMutationResult = Apollo.MutationResult<CanDeleteArticleMutation>;
export type CanDeleteArticleMutationOptions = Apollo.BaseMutationOptions<CanDeleteArticleMutation, CanDeleteArticleMutationVariables>;
export const GetAllProductsDocument = gql`
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

/**
 * __useGetAllProductsQuery__
 *
 * To run a query within a React component, call `useGetAllProductsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllProductsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllProductsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllProductsQuery(baseOptions?: Apollo.QueryHookOptions<GetAllProductsQuery, GetAllProductsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllProductsQuery, GetAllProductsQueryVariables>(GetAllProductsDocument, options);
      }
export function useGetAllProductsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllProductsQuery, GetAllProductsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllProductsQuery, GetAllProductsQueryVariables>(GetAllProductsDocument, options);
        }
export function useGetAllProductsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAllProductsQuery, GetAllProductsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllProductsQuery, GetAllProductsQueryVariables>(GetAllProductsDocument, options);
        }
export type GetAllProductsQueryHookResult = ReturnType<typeof useGetAllProductsQuery>;
export type GetAllProductsLazyQueryHookResult = ReturnType<typeof useGetAllProductsLazyQuery>;
export type GetAllProductsSuspenseQueryHookResult = ReturnType<typeof useGetAllProductsSuspenseQuery>;
export type GetAllProductsQueryResult = Apollo.QueryResult<GetAllProductsQuery, GetAllProductsQueryVariables>;
export const GetAllArticlesDocument = gql`
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

/**
 * __useGetAllArticlesQuery__
 *
 * To run a query within a React component, call `useGetAllArticlesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllArticlesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllArticlesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllArticlesQuery(baseOptions?: Apollo.QueryHookOptions<GetAllArticlesQuery, GetAllArticlesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllArticlesQuery, GetAllArticlesQueryVariables>(GetAllArticlesDocument, options);
      }
export function useGetAllArticlesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllArticlesQuery, GetAllArticlesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllArticlesQuery, GetAllArticlesQueryVariables>(GetAllArticlesDocument, options);
        }
export function useGetAllArticlesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAllArticlesQuery, GetAllArticlesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllArticlesQuery, GetAllArticlesQueryVariables>(GetAllArticlesDocument, options);
        }
export type GetAllArticlesQueryHookResult = ReturnType<typeof useGetAllArticlesQuery>;
export type GetAllArticlesLazyQueryHookResult = ReturnType<typeof useGetAllArticlesLazyQuery>;
export type GetAllArticlesSuspenseQueryHookResult = ReturnType<typeof useGetAllArticlesSuspenseQuery>;
export type GetAllArticlesQueryResult = Apollo.QueryResult<GetAllArticlesQuery, GetAllArticlesQueryVariables>;
export const GetOneProductByIdDocument = gql`
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

/**
 * __useGetOneProductByIdQuery__
 *
 * To run a query within a React component, call `useGetOneProductByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOneProductByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOneProductByIdQuery({
 *   variables: {
 *      productId: // value for 'productId'
 *   },
 * });
 */
export function useGetOneProductByIdQuery(baseOptions: Apollo.QueryHookOptions<GetOneProductByIdQuery, GetOneProductByIdQueryVariables> & ({ variables: GetOneProductByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetOneProductByIdQuery, GetOneProductByIdQueryVariables>(GetOneProductByIdDocument, options);
      }
export function useGetOneProductByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetOneProductByIdQuery, GetOneProductByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetOneProductByIdQuery, GetOneProductByIdQueryVariables>(GetOneProductByIdDocument, options);
        }
export function useGetOneProductByIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetOneProductByIdQuery, GetOneProductByIdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetOneProductByIdQuery, GetOneProductByIdQueryVariables>(GetOneProductByIdDocument, options);
        }
export type GetOneProductByIdQueryHookResult = ReturnType<typeof useGetOneProductByIdQuery>;
export type GetOneProductByIdLazyQueryHookResult = ReturnType<typeof useGetOneProductByIdLazyQuery>;
export type GetOneProductByIdSuspenseQueryHookResult = ReturnType<typeof useGetOneProductByIdSuspenseQuery>;
export type GetOneProductByIdQueryResult = Apollo.QueryResult<GetOneProductByIdQuery, GetOneProductByIdQueryVariables>;
export const LoginDocument = gql`
    query Login($password: String!, $email: String!) {
  login(password: $password, email: $email)
}
    `;

/**
 * __useLoginQuery__
 *
 * To run a query within a React component, call `useLoginQuery` and pass it any options that fit your needs.
 * When your component renders, `useLoginQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLoginQuery({
 *   variables: {
 *      password: // value for 'password'
 *      email: // value for 'email'
 *   },
 * });
 */
export function useLoginQuery(baseOptions: Apollo.QueryHookOptions<LoginQuery, LoginQueryVariables> & ({ variables: LoginQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LoginQuery, LoginQueryVariables>(LoginDocument, options);
      }
export function useLoginLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LoginQuery, LoginQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LoginQuery, LoginQueryVariables>(LoginDocument, options);
        }
export function useLoginSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<LoginQuery, LoginQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<LoginQuery, LoginQueryVariables>(LoginDocument, options);
        }
export type LoginQueryHookResult = ReturnType<typeof useLoginQuery>;
export type LoginLazyQueryHookResult = ReturnType<typeof useLoginLazyQuery>;
export type LoginSuspenseQueryHookResult = ReturnType<typeof useLoginSuspenseQuery>;
export type LoginQueryResult = Apollo.QueryResult<LoginQuery, LoginQueryVariables>;
export const WhoAmIDocument = gql`
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

/**
 * __useWhoAmIQuery__
 *
 * To run a query within a React component, call `useWhoAmIQuery` and pass it any options that fit your needs.
 * When your component renders, `useWhoAmIQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWhoAmIQuery({
 *   variables: {
 *   },
 * });
 */
export function useWhoAmIQuery(baseOptions?: Apollo.QueryHookOptions<WhoAmIQuery, WhoAmIQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<WhoAmIQuery, WhoAmIQueryVariables>(WhoAmIDocument, options);
      }
export function useWhoAmILazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<WhoAmIQuery, WhoAmIQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<WhoAmIQuery, WhoAmIQueryVariables>(WhoAmIDocument, options);
        }
export function useWhoAmISuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<WhoAmIQuery, WhoAmIQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<WhoAmIQuery, WhoAmIQueryVariables>(WhoAmIDocument, options);
        }
export type WhoAmIQueryHookResult = ReturnType<typeof useWhoAmIQuery>;
export type WhoAmILazyQueryHookResult = ReturnType<typeof useWhoAmILazyQuery>;
export type WhoAmISuspenseQueryHookResult = ReturnType<typeof useWhoAmISuspenseQuery>;
export type WhoAmIQueryResult = Apollo.QueryResult<WhoAmIQuery, WhoAmIQueryVariables>;
export const LogoutDocument = gql`
    query Logout {
  logout
}
    `;

/**
 * __useLogoutQuery__
 *
 * To run a query within a React component, call `useLogoutQuery` and pass it any options that fit your needs.
 * When your component renders, `useLogoutQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLogoutQuery({
 *   variables: {
 *   },
 * });
 */
export function useLogoutQuery(baseOptions?: Apollo.QueryHookOptions<LogoutQuery, LogoutQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LogoutQuery, LogoutQueryVariables>(LogoutDocument, options);
      }
export function useLogoutLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LogoutQuery, LogoutQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LogoutQuery, LogoutQueryVariables>(LogoutDocument, options);
        }
export function useLogoutSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<LogoutQuery, LogoutQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<LogoutQuery, LogoutQueryVariables>(LogoutDocument, options);
        }
export type LogoutQueryHookResult = ReturnType<typeof useLogoutQuery>;
export type LogoutLazyQueryHookResult = ReturnType<typeof useLogoutLazyQuery>;
export type LogoutSuspenseQueryHookResult = ReturnType<typeof useLogoutSuspenseQuery>;
export type LogoutQueryResult = Apollo.QueryResult<LogoutQuery, LogoutQueryVariables>;
export const GetReservationsByUserIdDocument = gql`
    query GetReservationsByUserId {
  getReservationsByUserId {
    reservation {
      id
      startDate
      endDate
      status
      articles {
        id
      }
    }
    totalPrice
  }
}
    `;

/**
 * __useGetReservationsByUserIdQuery__
 *
 * To run a query within a React component, call `useGetReservationsByUserIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetReservationsByUserIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetReservationsByUserIdQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetReservationsByUserIdQuery(baseOptions?: Apollo.QueryHookOptions<GetReservationsByUserIdQuery, GetReservationsByUserIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetReservationsByUserIdQuery, GetReservationsByUserIdQueryVariables>(GetReservationsByUserIdDocument, options);
      }
export function useGetReservationsByUserIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetReservationsByUserIdQuery, GetReservationsByUserIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetReservationsByUserIdQuery, GetReservationsByUserIdQueryVariables>(GetReservationsByUserIdDocument, options);
        }
export function useGetReservationsByUserIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetReservationsByUserIdQuery, GetReservationsByUserIdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetReservationsByUserIdQuery, GetReservationsByUserIdQueryVariables>(GetReservationsByUserIdDocument, options);
        }
export type GetReservationsByUserIdQueryHookResult = ReturnType<typeof useGetReservationsByUserIdQuery>;
export type GetReservationsByUserIdLazyQueryHookResult = ReturnType<typeof useGetReservationsByUserIdLazyQuery>;
export type GetReservationsByUserIdSuspenseQueryHookResult = ReturnType<typeof useGetReservationsByUserIdSuspenseQuery>;
export type GetReservationsByUserIdQueryResult = Apollo.QueryResult<GetReservationsByUserIdQuery, GetReservationsByUserIdQueryVariables>;
export const SearchAndFilterProductsDocument = gql`
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

/**
 * __useSearchAndFilterProductsQuery__
 *
 * To run a query within a React component, call `useSearchAndFilterProductsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchAndFilterProductsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchAndFilterProductsQuery({
 *   variables: {
 *      dateRangeInput: // value for 'dateRangeInput'
 *      keyword: // value for 'keyword'
 *   },
 * });
 */
export function useSearchAndFilterProductsQuery(baseOptions?: Apollo.QueryHookOptions<SearchAndFilterProductsQuery, SearchAndFilterProductsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchAndFilterProductsQuery, SearchAndFilterProductsQueryVariables>(SearchAndFilterProductsDocument, options);
      }
export function useSearchAndFilterProductsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchAndFilterProductsQuery, SearchAndFilterProductsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchAndFilterProductsQuery, SearchAndFilterProductsQueryVariables>(SearchAndFilterProductsDocument, options);
        }
export function useSearchAndFilterProductsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<SearchAndFilterProductsQuery, SearchAndFilterProductsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<SearchAndFilterProductsQuery, SearchAndFilterProductsQueryVariables>(SearchAndFilterProductsDocument, options);
        }
export type SearchAndFilterProductsQueryHookResult = ReturnType<typeof useSearchAndFilterProductsQuery>;
export type SearchAndFilterProductsLazyQueryHookResult = ReturnType<typeof useSearchAndFilterProductsLazyQuery>;
export type SearchAndFilterProductsSuspenseQueryHookResult = ReturnType<typeof useSearchAndFilterProductsSuspenseQuery>;
export type SearchAndFilterProductsQueryResult = Apollo.QueryResult<SearchAndFilterProductsQuery, SearchAndFilterProductsQueryVariables>;
export const GetCurrentReservationByUserIdDocument = gql`
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
          imgUrl
        }
      }
    }
    totalPrice
  }
}
    `;

/**
 * __useGetCurrentReservationByUserIdQuery__
 *
 * To run a query within a React component, call `useGetCurrentReservationByUserIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCurrentReservationByUserIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCurrentReservationByUserIdQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCurrentReservationByUserIdQuery(baseOptions?: Apollo.QueryHookOptions<GetCurrentReservationByUserIdQuery, GetCurrentReservationByUserIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCurrentReservationByUserIdQuery, GetCurrentReservationByUserIdQueryVariables>(GetCurrentReservationByUserIdDocument, options);
      }
export function useGetCurrentReservationByUserIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCurrentReservationByUserIdQuery, GetCurrentReservationByUserIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCurrentReservationByUserIdQuery, GetCurrentReservationByUserIdQueryVariables>(GetCurrentReservationByUserIdDocument, options);
        }
export function useGetCurrentReservationByUserIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetCurrentReservationByUserIdQuery, GetCurrentReservationByUserIdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCurrentReservationByUserIdQuery, GetCurrentReservationByUserIdQueryVariables>(GetCurrentReservationByUserIdDocument, options);
        }
export type GetCurrentReservationByUserIdQueryHookResult = ReturnType<typeof useGetCurrentReservationByUserIdQuery>;
export type GetCurrentReservationByUserIdLazyQueryHookResult = ReturnType<typeof useGetCurrentReservationByUserIdLazyQuery>;
export type GetCurrentReservationByUserIdSuspenseQueryHookResult = ReturnType<typeof useGetCurrentReservationByUserIdSuspenseQuery>;
export type GetCurrentReservationByUserIdQueryResult = Apollo.QueryResult<GetCurrentReservationByUserIdQuery, GetCurrentReservationByUserIdQueryVariables>;
export const GetReservationsByArticleIdDocument = gql`
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

/**
 * __useGetReservationsByArticleIdQuery__
 *
 * To run a query within a React component, call `useGetReservationsByArticleIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetReservationsByArticleIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetReservationsByArticleIdQuery({
 *   variables: {
 *      articleId: // value for 'articleId'
 *   },
 * });
 */
export function useGetReservationsByArticleIdQuery(baseOptions: Apollo.QueryHookOptions<GetReservationsByArticleIdQuery, GetReservationsByArticleIdQueryVariables> & ({ variables: GetReservationsByArticleIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetReservationsByArticleIdQuery, GetReservationsByArticleIdQueryVariables>(GetReservationsByArticleIdDocument, options);
      }
export function useGetReservationsByArticleIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetReservationsByArticleIdQuery, GetReservationsByArticleIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetReservationsByArticleIdQuery, GetReservationsByArticleIdQueryVariables>(GetReservationsByArticleIdDocument, options);
        }
export function useGetReservationsByArticleIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetReservationsByArticleIdQuery, GetReservationsByArticleIdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetReservationsByArticleIdQuery, GetReservationsByArticleIdQueryVariables>(GetReservationsByArticleIdDocument, options);
        }
export type GetReservationsByArticleIdQueryHookResult = ReturnType<typeof useGetReservationsByArticleIdQuery>;
export type GetReservationsByArticleIdLazyQueryHookResult = ReturnType<typeof useGetReservationsByArticleIdLazyQuery>;
export type GetReservationsByArticleIdSuspenseQueryHookResult = ReturnType<typeof useGetReservationsByArticleIdSuspenseQuery>;
export type GetReservationsByArticleIdQueryResult = Apollo.QueryResult<GetReservationsByArticleIdQuery, GetReservationsByArticleIdQueryVariables>;
export const GetAllReservationsDocument = gql`
    query GetAllReservations {
  getAllReservations {
    startDate
    endDate
    user {
      firstname
      lastname
    }
    articles {
      product {
        name
      }
    }
  }
}
    `;

/**
 * __useGetAllReservationsQuery__
 *
 * To run a query within a React component, call `useGetAllReservationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllReservationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllReservationsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllReservationsQuery(baseOptions?: Apollo.QueryHookOptions<GetAllReservationsQuery, GetAllReservationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllReservationsQuery, GetAllReservationsQueryVariables>(GetAllReservationsDocument, options);
      }
export function useGetAllReservationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllReservationsQuery, GetAllReservationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllReservationsQuery, GetAllReservationsQueryVariables>(GetAllReservationsDocument, options);
        }
export function useGetAllReservationsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetAllReservationsQuery, GetAllReservationsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetAllReservationsQuery, GetAllReservationsQueryVariables>(GetAllReservationsDocument, options);
        }
export type GetAllReservationsQueryHookResult = ReturnType<typeof useGetAllReservationsQuery>;
export type GetAllReservationsLazyQueryHookResult = ReturnType<typeof useGetAllReservationsLazyQuery>;
export type GetAllReservationsSuspenseQueryHookResult = ReturnType<typeof useGetAllReservationsSuspenseQuery>;
export type GetAllReservationsQueryResult = Apollo.QueryResult<GetAllReservationsQuery, GetAllReservationsQueryVariables>;