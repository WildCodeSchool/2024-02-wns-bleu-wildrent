import { Button, message } from 'antd';
import { ReservationButtonProps } from '../interface/types';
import { useAddArticleToReservationMutation, useCreateNewReservationMutation } from '../generated/graphql-types';

export default function ReservationButton( {articles} : ReservationButtonProps) {
   
    const useHandleReservation = () => {
        const [createNewReservation] = useCreateNewReservationMutation({
          onCompleted(data) {
            console.log("mutation completed data", data);
            message.success("Article ajouté à votre réservation")
            localStorage.setItem("reservationId", data.createNewReservation.id.toString())

          },
          onError(error) {
            console.log("Error after executing createNewReservation mutation", error);
            if (error.message.includes("You already have a pending reservation")) {
              handleAddArticleToReservation();
            }
          },
        });

        const [addArticleToReservation] = useAddArticleToReservationMutation({
            onCompleted(data) {
              console.log("Article added to reservation:", data);
              message.success("Article ajouté à votre réservation");
            },
            onError(error) {
              console.log("Error after executing addArticleToReservation mutation", error);
              message.error("Erreur lors de l'ajout de l'article à la réservation");
            },
          });

        const handleAddArticleToReservation = () => {
        const reservationId = localStorage.getItem("reservationId")
        if (reservationId === null) return
        const availableArticles = articles.filter(article => article.availability === true);
        
        if (availableArticles.length === 0) {
            message.error("Cet article n'est pas disponible");
            return;
        }
    
        const firstAvailableArticleId = availableArticles[0].id;
                    
        addArticleToReservation({
            variables: {
            reservation: reservationId,
            articleId: firstAvailableArticleId.toString(),
            },
        });
        };
        
      
        const handleReservation = () => {
         const startDate = localStorage.getItem("startDate")
         const endDate = localStorage.getItem("startDate")
         if (startDate === null || endDate === null ) { 
            message.error("Choisissez une période de location")
            return
         }

         // TO DO : change once the search logic in page displaying products is upudated
          const availableArticles = articles.filter(article => article.availability === true);
            
          if (availableArticles.length === 0) {
            message.error("Cet article n'est pas disponible");
            return
          }

          const firstAvailableArticleId = availableArticles[0].id;
      
          createNewReservation({
            variables: {
              data : {
                startDate: startDate,
                endDate: endDate,  
                articleId: firstAvailableArticleId.toString(),
              }
            },
          });
        };
    
        return handleReservation
      };
      
      return (
        <Button
          type="primary"
          size="large"
          onClick={useHandleReservation()}
        >
          Réserver
        </Button>
      );

}