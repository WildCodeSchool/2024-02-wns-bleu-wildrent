import { useMutation } from "@apollo/client";
import {
  GetAllArticlesDocument,
  GetCurrentReservationByUserIdDocument,
  GetReservationsByUserIdDocument,
} from "../generated/graphql-types";
import { Button, message, Popconfirm } from "antd";
import { CANCEL_RESERVATION, DELETE_ARTICLE_FROM_RESERVATION } from "../graphql/mutations";
import { DeleteOutlined } from "@ant-design/icons";
import { ReservationData } from "../interface/types";
import { useEffect } from "react";

function DeleteArticleReservationButton({
  reservationData,
  articleId,
}: {
  reservationData: ReservationData;
  articleId: string;
}) {
  const articlesNumber = reservationData.reservation.articles.length;
  useEffect(()=> {
    console.log(articlesNumber)
    console.log(reservationData.reservation.articles)
  }, [reservationData])
  const [cancelReservation] = useMutation(CANCEL_RESERVATION);
  const [deleteArticleFromReservation] = useMutation(
    DELETE_ARTICLE_FROM_RESERVATION,
    {
      onCompleted: () => {
        const remainingArticles = reservationData.reservation.articles.filter(
          (article) => Number(article.id) !== Number(articleId)
        ).length;

        if (remainingArticles === 0) {
          cancelReservation({
            variables: {
              reservationId: reservationData.reservation.id,
            },
            refetchQueries: [
              GetReservationsByUserIdDocument,
              GetCurrentReservationByUserIdDocument,
            ],
          });
        }

        message.success("L'article a bien été supprimé de la réservation.");
      },
      onError: () => {
        message.error(
          "Une erreur est survenue lors de la suppression de l'article."
        );
      },
      refetchQueries: [
        GetReservationsByUserIdDocument,
        GetCurrentReservationByUserIdDocument,
        GetAllArticlesDocument,
      ],
    }
  );

  return (
    <Popconfirm
      title="Supprimer cet article ? "
      description="Cet article sera définitivement supprimé de la réservation."
      okText="Oui"
      cancelText="Non"
      onConfirm={() =>
        deleteArticleFromReservation({
          variables: { id: articleId.toString() },
        })
      }
    >
      <Button title="Supprimer l'article" danger icon={<DeleteOutlined />} />
    </Popconfirm>
  );
}

export default DeleteArticleReservationButton;
