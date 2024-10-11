import { ReservationData } from "../interface/types";
import { Card } from "antd";

export const CurrentReservation = ({
  reservationData,
}: {
  reservationData: ReservationData;
}) => {
  const formattedStartDate = new Date(
    reservationData.reservation.startDate
  ).toLocaleDateString("fr-FR");
  const formattedEndDate = new Date(
    reservationData.reservation.endDate
  ).toLocaleDateString("fr-FR");

  return (
    <Card
      title={`Réservation numéro ${reservationData.reservation.id}`}
      style={{ width: 400 }}
    >
      <p>Date de début : {formattedStartDate} </p>
      <p>Date de fin : {formattedEndDate} </p>
      <p>
        Articles :
        <p>
          {reservationData.reservation.articles &&
          reservationData.reservation.articles.length > 0 ? (
            reservationData.reservation.articles.map((article, index) =>
              article.product ? (
                <p className="flex gap-2" key={index}>
                  <p>Nom: {article.product.name}</p>
                  <p>Prix: {article.product.price}€</p>
                </p>
              ) : (
                <p key={index}>Article has no product details.</p>
              )
            )
          ) : (
            <p>No articles found.</p>
          )}
        </p>
      </p>
      <p>Prix total : {reservationData.totalPrice}€</p>
    </Card>
  );
};

export default CurrentReservation;
