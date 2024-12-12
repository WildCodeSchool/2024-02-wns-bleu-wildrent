import { Card, Divider } from "antd";
import ValidateReservationButton from "./ValidateReservationButton";
import { ReservationData } from "../interface/types";

export const ReservationCard = ({
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
  const reservationId = reservationData.reservation.id;
  return (
    <>
      <Card title={`Réservation numéro ${reservationId}`}>
        <p>Date de début : {formattedStartDate} </p>
        <p>Date de fin : {formattedEndDate} </p>
        <p>Nombre d'articles : {reservationData.reservation.articles.length}</p>
        <p>Prix : {reservationData.totalPrice} euros</p>
        <p>Status : {reservationData.reservation.status}</p>
        {reservationData.reservation.status === "pending" && (
          <ValidateReservationButton
            reservation={reservationData.reservation}
          />
        )}
      </Card>
      <Divider dashed />
    </>
  );
};
