import { Reservation } from "../interface/types";

export const ReservationCard = ({ reservation }: Reservation) => {
  return (
    <div>
      <div>id de la réservation : {reservation.id} </div>
      <div>date de début : {reservation.startDate} </div>
      <div>date de fin : {reservation.endDate} </div>
      <div>nombre d'articles : {reservation.articles.length}</div>
      <div>prix : </div>
      <div>status: {reservation.status}</div>
      <div>détails</div>
      <div>-------</div>
    </div>
  );
};
