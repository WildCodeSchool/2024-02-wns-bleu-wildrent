import { useQuery } from "@apollo/client";
import { GET_RESERVATION_BY_ID } from "../graphql/queries";
import { useParams } from "react-router-dom";

const Reservation = () => {
  const reservationId  = useParams();

  if (!reservationId) {
    return <p>Erreur: l'ID de la reservation est manquant</p>;
  }

  const { data, loading, error } = useQuery(GET_RESERVATION_BY_ID, {
    variables: { reservationId: reservationId },
  });

  if (loading) {
    return <p>Loading</p>;
  }
  if (error) {
    console.log("error", error);
    return <p>Erreur</p>;
  }
  if (data) {
    return (
      <>
        <h2 className="product-details-name">{data.getOneProductById.user_id}</h2>
        <section className="product-details">
          <div className="product-details-image-container">
          </div>
          <div className="product-details-info">
            <div className="reservation-details-status">
              {data.getOneReservationById.status} €
            </div>
           
            <hr className="separator" />
          </div>
        </section>
      </>
    );
  }
  return null;
};

export default Reservation;
