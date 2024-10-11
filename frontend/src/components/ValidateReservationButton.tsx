import { useMutation } from "@apollo/client";
import { Button, message, Popconfirm } from "antd";
import { UPDATE_RESERVATION_STATUS } from "../graphql/mutations";
import { Reservation } from "../interface/types";
import {
  GetAllArticlesDocument,
  GetAllProductsDocument,
} from "../generated/graphql-types";

function ValidateReservationButton({ reservation }: Reservation) {
  const [updateReservationStatus] = useMutation(UPDATE_RESERVATION_STATUS, {
    onCompleted: () => {
      message.success("La réservation a bien été validée.");
      setTimeout(function () {
        window.location.reload();
      }, 2000);
    },
    onError: () => {
      message.error("Une erreur est survenue lors de la validation.");
    },
  });

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
              reservationId: reservation.id.toString(),
              refetchQueries: [GetAllProductsDocument, GetAllArticlesDocument],
            },
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
