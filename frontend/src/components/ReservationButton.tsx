import { Button, message } from "antd";
import { Article } from "../interface/types";
import { useHandleReservationMutation } from "../generated/graphql-types";
import { useContext, useEffect } from "react";
import { UserContext } from "./Layout";

export default function ReservationButton({
  articles,
}: {
  articles: Article[];
}) {
  const userInfo = useContext(UserContext);
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
  useEffect(() => {
    console.log(userInfo.isLoggedIn, "userInfo");
  });
  const onClick = () => {
    const startDateString = localStorage.getItem("startDate");
    const startDate = startDateString ? new Date(startDateString) : null;
    const endDateString = localStorage.getItem("endDate");
    const endDate = endDateString ? new Date(endDateString) : null;

    if (userInfo.isLoggedIn === false) {
      message.error("Veuillez vous connecter pour pouvoir réserver un article");
    }

    if (!startDate || !endDate) {
      message.error("Choisissez une période de location");
      return;
    }

    // TO DO : à changer quand la recherche en amont sera mise en place
    const availableArticles = articles.filter(
      (article) => article.availability === true
    );
    if (availableArticles.length === 0 && userInfo.isLoggedIn === true) {
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
      className="bg-blue-900 text-white transition-colors duration-300 hover:bg-orange-600 mt-4"
    >
      Réserver
    </Button>
  );
}
