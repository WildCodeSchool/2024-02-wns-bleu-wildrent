import { Button } from "antd";

type ValidateReservationButtonProps = {
  setIsCheckoutModalOpen:(isOpen: boolean) => void
};

export const ValidateReservationButton = ({
  setIsCheckoutModalOpen
}: ValidateReservationButtonProps) => {

  return (
    <Button
      onClick={()=>setIsCheckoutModalOpen(true)}
      type="primary"
    >
      Valider et payer
    </Button>
  );

};
