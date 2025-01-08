import { expect, describe, it } from '@jest/globals'
import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  gql,
} from '@apollo/client/core'
import fetch from 'cross-fetch'
import { generateToken, mockAuthContext } from './utils/mockAuth'

const mockAuthToken = generateToken(mockAuthContext.user);

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'http://localhost:7000/api',  
    fetch,
    headers: {
      Cookie: `token=${mockAuthToken}`,  
    },
  }),
  cache: new InMemoryCache(),
});

const CREATE_RESERVATION = gql`
  mutation CreateReservation($data: NewReservationInput!) {
    handleReservation(data: $data) {
      id
      startDate
      endDate
      status
      articles {
        id
      }
    }
  }
`;

const GET_RESERVATION_BY_ID = gql`
  query GetReservationById($reservationId: ID!) {
    getOneReservationById(reservationId: $reservationId) {
      id
      startDate
      endDate
      status
    }
  }
`;

const CANCEL_RESERVATION = gql`
  mutation CancelReservation($reservationId: ID!) {
    cancelReservation(reservationId: $reservationId) {
      id
      status
    }
  }
`

const GET_ALL_RESERVATIONS = gql`
  query GetAllReservations {
  getAllReservations {
    id
  }
}
`
const GET_RESERVATIONS_BY_ARTICLE_ID = gql`
query GetReservationsByArticleId($articleId: ID!) {
  getReservationsByArticleId(articleId: $articleId) {
    id
  }
}
`

describe('Reservation Resolver', () => {
  let createdReservationId: string

  it('should create a reservation', async () => {
    const result = await client.mutate({
      mutation: CREATE_RESERVATION,
      variables: {
        data: {
          startDate: '2025-01-01T00:00:00.000Z',
          endDate: '2025-01-10T00:00:00.000Z',
          articleId: '1',
        },
      },
    })

    expect(result.data.handleReservation).toHaveProperty('id')
    createdReservationId = result.data.handleReservation.id
  })

  it('should get a reservation by ID', async () => {
    const result = await client.query({
      query: GET_RESERVATION_BY_ID,
      variables: {
        reservationId: createdReservationId,
      },
    })

    expect(result.data.getOneReservationById.id).toBe(createdReservationId)
  })

  it('should get all reservations', async () => {
    const result = await client.query({
      query: GET_ALL_RESERVATIONS,
    })
    expect(result.data.getAllReservations).toBeInstanceOf(Array)
    expect(result.data.getAllReservations).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ id: createdReservationId }),
      ])
    )
  })

  it('should get reservations linked to one article', async () => {
    const result = await client.query({
      query: GET_RESERVATIONS_BY_ARTICLE_ID,
      variables: {
        articleId: '1',
      },
    })
    expect(result.data.getReservationsByArticleId).toBeInstanceOf(Array)
    expect(result.data.getReservationsByArticleId).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ id: createdReservationId }),
      ])
    )
  })

  it('should cancel a reservation', async () => {
    const result = await client.mutate({
      mutation: CANCEL_RESERVATION,
      variables: {
        reservationId: createdReservationId,
      },
    });

    expect(result.data.cancelReservation.id).toBe(createdReservationId);
  })
})

