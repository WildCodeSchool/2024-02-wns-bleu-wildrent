import { ReservationData } from "../interface/types";
import { ArticleReservationCard } from "./ArticleReservationCard";

export const CurrentReservation = ({
  reservationData,
}: {
  reservationData: ReservationData;
}) => {
  return <ArticleReservationCard reservationData={reservationData} />;
};

export default CurrentReservation;
