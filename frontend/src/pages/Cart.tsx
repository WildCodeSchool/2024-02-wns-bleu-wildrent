import CurrentReservation from "../components/CurrentReservation";
import { useGetCurrentReservationByUserIdQuery } from "../generated/graphql-types"

export const Cart = () => {
  const {data, loading, error} = useGetCurrentReservationByUserIdQuery()

  if (loading) {
    return <p>Loading</p>;
  }
  if (error) {
    console.log("error", error);
    return <p>Erreur</p>;
  }

  if (!data || !data.getCurrentReservationByUserId) {
    return <p>Aucune réservation trouvée.</p>
  }

  return (
    <CurrentReservation reservationData={data.getCurrentReservationByUserId} />
  ) 
}
