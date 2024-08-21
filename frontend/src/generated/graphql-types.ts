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
  availability: Scalars['Boolean']['output'];
  id: Scalars['Float']['output'];
  product: Product;
};

export type Mutation = {
  __typename?: 'Mutation';
  createNewArticle: Article;
  createNewProduct: Product;
  createUser: Scalars['String']['output'];
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

export type NewArticleInput = {
  availability: Scalars['Boolean']['input'];
  productId: Scalars['Float']['input'];
};

export type NewProductInput = {
  description: Scalars['String']['input'];
  imgUrl?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  price: Scalars['Float']['input'];
};

export type Product = {
  __typename?: 'Product';
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
  getOneProductById: Product;
  getOneReservationById: Reservation;
  login: Scalars['String']['output'];
  logout: Scalars['String']['output'];
  whoAmI: UserInfo;
};


export type QueryGetOneProductByIdArgs = {
  productId: Scalars['String']['input'];
};


export type QueryGetOneReservationByIdArgs = {
  reservationId: Scalars['String']['input'];
};


export type QueryLoginArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Reservation = {
  __typename?: 'Reservation';
  date: Scalars['DateTimeISO']['output'];
  id: Scalars['Float']['output'];
  status: Status;
  user: User;
};

/** The status of a reservation */
export enum Status {
  Pending = 'pending',
  Validated = 'validated'
}

export type User = {
  __typename?: 'User';
  email: Scalars['String']['output'];
};

export type UserInfo = {
  __typename?: 'UserInfo';
  email?: Maybe<Scalars['String']['output']>;
  isLoggedIn: Scalars['Boolean']['output'];
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