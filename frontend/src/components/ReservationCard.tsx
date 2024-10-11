import { Reservation } from "../interface/types";
import { Card, Divider } from "antd";
import ValidateReservationButton from "./ValidateReservationButton";

export const ReservationCard = ({ reservation }: Reservation) => {
  const formattedStartDate = new Date(reservation.startDate).toLocaleDateString(
    "fr-FR"
  );
  const formattedEndDate = new Date(reservation.endDate).toLocaleDateString(
    "fr-FR"
  );

  const reservationId = reservation.id;
  console.log(reservation, "rser");
  return (
    <>
      <Card title={`Réservation numéro ${reservationId}`}>
        <p>Date de début : {formattedStartDate} </p>
        <p>Date de fin : {formattedEndDate} </p>
        <p>Nombre d'articles : {reservation.articles.length}</p>
        <p>Prix : </p>
        <p>Status : {reservation.status}</p>
        {reservation.status === "pending" && (
          <ValidateReservationButton reservation={reservation} />
        )}
      </Card>
      <Divider dashed />
    </>
  );
};
