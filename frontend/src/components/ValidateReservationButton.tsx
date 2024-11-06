import { useMutation } from "@apollo/client";
import { Button, message, Popconfirm } from "antd";
import { UPDATE_RESERVATION_STATUS } from "../graphql/mutations";
import { Reservation } from "../interface/types";
import {
  GetCurrentReservationByUserIdDocument,
  GetReservationsByUserIdDocument,
} from "../generated/graphql-types";

function ValidateReservationButton({ reservation }: Reservation) {
  const [updateReservationStatus] = useMutation(UPDATE_RESERVATION_STATUS, {
    onCompleted: () => {
      message.success("La réservation a bien été validée.")
    },
    onError: () => {
      message.error("Une erreur est survenue lors de la validation.");
    },
    refetchQueries: [GetReservationsByUserIdDocument, GetCurrentReservationByUserIdDocument]
  })

  return (
    <>
      <Popconfirm
        title="Valider cette réservation ?"
        description="La réservation ne pourra plus être annulée."
        okText="Oui"
        cancelText="Non"
        onConfirm={() =>
          updateReservationStatus({
            variables: {
              reservationId: reservation.id.toString()            },
          })
        }
      >
        <Button type="primary" style={{ marginTop: "10px" }}>
          Valider
        </Button>
      </Popconfirm>
    </>
  );
}

export default ValidateReservationButton;
