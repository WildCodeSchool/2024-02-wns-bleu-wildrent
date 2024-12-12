import { useMutation } from "@apollo/client";
import { Button, message, Popconfirm } from "antd";
import { CANCEL_RESERVATION } from "../graphql/mutations";
import { Reservation } from "../interface/types";
import {
  GetCurrentReservationByUserIdDocument,
  GetReservationsByUserIdDocument,
} from "../generated/graphql-types";

function CancelReservationButton({ reservation }: Reservation) {
  const [cancelReservation] = useMutation(CANCEL_RESERVATION, {
    onCompleted: () => {
      message.success("La réservation a bien été annulée.");
    },
    onError: () => {
      message.error("Une erreur est survenue lors de l'annulation.");
    },
    refetchQueries: [
      GetReservationsByUserIdDocument,
      GetCurrentReservationByUserIdDocument,
    ],
  });

  return (
    <>
      <Popconfirm
        title="Annuler cette réservation ?"
        description="La réservation sera définitivement annulée."
        okText="Oui"
        cancelText="Non"
        onConfirm={() =>
          cancelReservation({
            variables: {
              reservationId: reservation.id.toString(),
            },
          })
        }
      >
        <Button danger>Annuler la réservation</Button>
      </Popconfirm>
    </>
  );
}

export default CancelReservationButton;
