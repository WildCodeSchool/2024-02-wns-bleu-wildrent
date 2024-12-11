import { useQuery } from "@apollo/client";
import { GetReservationsByUserIdQuery } from "../generated/graphql-types";
import { GET_RESERVATIONS_BY_USER_ID } from "../graphql/queries";

const ReservationsDetails = () => {
  const { loading, error, data } = useQuery<GetReservationsByUserIdQuery>(
    GET_RESERVATIONS_BY_USER_ID
  );

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur: {error.message}</p>;

  if (
    !data ||
    !data.getReservationsByUserId ||
    data.getReservationsByUserId.length === 0
  ) {
    return <p>Aucune réservation trouvée.</p>;
  }

  return (
    <div className="reservations-container">
      <h1>Détails des Réservations</h1>
      <table className="reservations-table">
        <thead>
          <tr>
            <th>ID Réservation</th>
            <th>Status</th>
            <th>Date de début</th>
            <th>Date de fin</th>
            <th>Total Prix</th>
            <th>Articles associés</th>
          </tr>
        </thead>
        <tbody>
          {data.getReservationsByUserId.map((reservationWithTotal) => (
            <tr key={reservationWithTotal.reservation.id}>
              <td>{reservationWithTotal.reservation.id}</td>
              <td>{reservationWithTotal.reservation.status}</td>
              <td>
                {new Date(
                  reservationWithTotal.reservation.startDate
                ).toLocaleDateString()}
              </td>
              <td>
                {new Date(
                  reservationWithTotal.reservation.endDate
                ).toLocaleDateString()}
              </td>
              <td>{reservationWithTotal.totalPrice} €</td>
              <td>
                <ul>
                  {reservationWithTotal.reservation.articles.map((article) => (
                    <li key={article.id}>
                      <p>
                        <strong>Article ID:</strong> {article.id}
                      </p>
                      <p>
                        <strong>Produit:</strong> {article.product.name}
                      </p>
                      <p>
                        <strong>Prix du produit:</strong>{" "}
                        {article.product.price} €
                      </p>
                    </li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReservationsDetails;
