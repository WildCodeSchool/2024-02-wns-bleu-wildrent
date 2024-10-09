import { Button, message } from 'antd';
import { ReservationButtonProps } from '../interface/types';
import { useCreateNewReservationMutation } from '../generated/graphql-types';

export default function ReservationButton( {articles} : ReservationButtonProps) {
   
    const useHandleReservation = () => {
        const [createNewReservation] = useCreateNewReservationMutation({
          onCompleted(data) {
            console.log("mutation completed data", data);
            message.success("Article ajouté à votre réservation")

          },
          onError(error) {
            console.log("error after executing mutation", error);
          },
        });
      
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