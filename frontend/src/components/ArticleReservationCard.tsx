import { Button, Card, Divider } from "antd";
import { ReservationData } from "../interface/types";
import { DeleteOutlined } from "@ant-design/icons";
import ValidateReservationButton from "./ValidateReservationButton";
import CancelReservationButton from "./CancelReservationButton";

export const ArticleReservationCard = ({
  reservationData,
}: {
  reservationData: ReservationData;
}) => {
  const articles = reservationData.reservation.articles;

  console.log(reservationData.reservation.articles, "resa");
  return (
    <>
      <Card title={`Détails de votre réservation`} style={{ width: 500 }}>
        {articles.map((article) => (
          <Card style={{ margin: 20 }} key={article.product?.id}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <img
                  src={article.product?.imgUrl}
                  alt="product img"
                  style={{ height: 100, marginRight: 20 }}
                />
                <div>
                  <p style={{ margin: 0, fontWeight: "bold" }}>
                    {article.product?.name}
                  </p>
                  <p style={{ margin: 0 }}>{article.product?.price}€</p>
                </div>
              </div>
              <Button
                title="Supprimer l'article"
                danger
                icon={<DeleteOutlined />}
              />
            </div>
          </Card>
        ))}
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          {reservationData.reservation.status === "pending" && (
            <ValidateReservationButton
              reservation={reservationData.reservation}
            />
          )}
          {reservationData.reservation.status === "pending" && (
            <CancelReservationButton
              reservation={reservationData.reservation}
            />
          )}
        </div>
      </Card>
      <Divider dashed />
    </>
  );
};
