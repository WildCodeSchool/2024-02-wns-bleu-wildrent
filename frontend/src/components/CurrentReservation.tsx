import { ReservationData } from "../interface/types";

export const CurrentReservation = ({
  reservationData,
}: {
  reservationData: ReservationData;
}) => {
  return (
    <div>
      <div>id de la réservation : {reservationData.reservation.id} </div>
      <div>date de début : {reservationData.reservation.startDate} </div>
      <div>date de fin : {reservationData.reservation.endDate} </div>
      <div>
        articles :
        <div>
          {reservationData.reservation.articles &&
          reservationData.reservation.articles.length > 0 ? (
            reservationData.reservation.articles.map((article, index) =>
              article.product ? (
                <div className="flex gap-2" key={index}>
                  <div>nom: {article.product.name}</div>
                  <div>prix: {article.product.price}</div>
                </div>
              ) : (
                <div key={index}>Article has no product details.</div>
              )
            )
          ) : (
            <div>No articles found.</div>
          )}
        </div>
      </div>
      <div>total: {reservationData.totalPrice}</div>
    </div>
  );
};

export default CurrentReservation;
