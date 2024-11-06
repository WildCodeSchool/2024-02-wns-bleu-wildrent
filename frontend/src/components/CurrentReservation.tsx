import { ReservationData } from "../interface/types";
import { ReservationCard } from "./ReservationCard";

export const CurrentReservation = ({ reservationData }: { reservationData: ReservationData }) => {
  return (
    <ReservationCard reservationData={reservationData} />
  );
};

export default CurrentReservation;
