import { Button, message } from "antd";
import { Article } from "../interface/types";
import { useHandleReservationMutation } from "../generated/graphql-types";
import { useEffect } from "react";

export default function ReservationButton({
  articles,
}: {
  articles: Article[];
}) {
  const [handleReservation] = useHandleReservationMutation({
    onCompleted(data) {
      message.success("Réservation effectuée avec succès");
      if (data.handleReservation) {
        localStorage.setItem(
          "reservationId",
          data.handleReservation.id.toString()
        );
      }
    },
    onError(error) {
      console.error("Reservation mutation error:", error);
      message.error("Erreur lors de la réservation");
    },
  });

  const onClick = () => {
    const startDateString = localStorage.getItem("startDate");
    const startDate = startDateString ? new Date(startDateString) : null;
    const endDateString = localStorage.getItem("endDate");
    const endDate = endDateString ? new Date(endDateString) : null;

    if (!startDate || !endDate) {
      message.error("Choisissez une période de location");
      return;
    }

    // TO DO : à changer quand la recherche en amont sera mise en place
    const availableArticles = articles.filter(
      (article) => article.availability === true
    );
    if (availableArticles.length === 0) {
      message.error("Cet article n'est pas disponible");
      return;
    }



    // TO BE DISCUSSED : comment choisir l'article si plusieurs sont dispo ?
    const firstAvailableArticleId = availableArticles[0].id;

    handleReservation({
      variables: {
        data: {
          startDate,
          endDate,
          articleId: firstAvailableArticleId.toString(),
        },
      },
    });
  };

  return (
    <Button
      onClick={onClick}
      type="primary"
      size="large"
      block
      style={{
        backgroundColor: "#1A265B",
        transition: "background-color 0.3s ease, color 0.3s ease",
        margin: "1rem",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = "#F0610D";
        e.currentTarget.style.color = "#fff";
      }}
      onMouseLeave={function (e) {
        e.currentTarget.style.backgroundColor = "#1A265B";
        e.currentTarget.style.color = "#fff";
      }}
    >
      Réserver
    </Button>
  );
}
