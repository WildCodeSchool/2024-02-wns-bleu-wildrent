import { Card, Divider } from "antd";
import { ReservationData } from "../interface/types";
import CancelReservationButton from "./CancelReservationButton";
import DeleteArticleReservationButton from "./DeleteArticleReservationButton";
import { CheckoutModal } from "../pages/CheckoutModal";
import { useState } from "react";
import { ValidateReservationButton } from "./ValidateReservationButton";

export const ArticleReservationCard = ({
  reservationData,
}: {
  reservationData: ReservationData;
}) => {
  const articles = reservationData.reservation.articles;
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false)


  return (
    <div>
      {reservationData.reservation.status === "pending" ? (
        <Card title={"Détails de votre réservation"} style={{ width: 500 }}>
          {articles.map((article) => (
            <Card id={article.id} style={{ margin: 20 }} key={article.product?.id}>
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
                <DeleteArticleReservationButton
                  articleId={article.id}
                  reservationData={reservationData}
                />
              </div>
            </Card>
          ))}
          <div className="ml-6 mb-4">
            <span className='font-bold'>Total :</span> {reservationData.totalPrice} €
          </div>
          {!isCheckoutModalOpen &&
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              {reservationData.reservation.status === "pending" && (
                <ValidateReservationButton
                  setIsCheckoutModalOpen={setIsCheckoutModalOpen}
                />
              )}
              {reservationData.reservation.status === "pending" && (
                <CancelReservationButton
                  reservation={reservationData.reservation}
                />
              )}
            </div>
          }
        </Card>
      ) : (
        <h1>Aucune réservation en cours.</h1>
      )}
      <Divider dashed />
      {isCheckoutModalOpen && reservationData.totalPrice &&
        <CheckoutModal reservationId={reservationData.reservation.id} totalPrice={reservationData.totalPrice} isCheckoutModalOpen={isCheckoutModalOpen} setIsCheckoutModalOpen={setIsCheckoutModalOpen}/>
      }
    </div>
  );
};
