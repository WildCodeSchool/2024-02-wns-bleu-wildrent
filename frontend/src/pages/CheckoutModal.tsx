import {useState, useEffect} from "react";
import {loadStripe} from "@stripe/stripe-js";
import {Elements, useStripe, useElements, PaymentElement} from "@stripe/react-stripe-js";
import { Button, Form, message, Modal, Spin } from "antd";
import { useCreatePaymentIntentMutation, useUpdateReservationStatusMutation } from "../generated/graphql-types";
import { useNavigate } from "react-router-dom";


const stripePromise = loadStripe("pk_test_51QeYDyKpnPM5du4gQK1IiZCCNC1l0HmMNRC1nK7ooW57jmX8UYMz8NrAdHjeqrxdONp5Ugz4cUUETxBaqhuLsed800yYqenZ9d");

const StripePaymentForm = ({clientSecret, totalPrice, reservationId} : {clientSecret: string, totalPrice: number, reservationId: string}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate()
  const [updateReservationStatus] = useUpdateReservationStatusMutation()

  const handleSubmit = async () => {
    if (!stripe || !elements || !clientSecret) return;

    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: "pm_card_visa",
    });

    if (error) {
      setError(error.message || "An error occurred");
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      setError(null);
      updateReservationStatus({
        variables : {
          reservationId: reservationId}
      })
      message.success("paiement effectué avec succès")
      navigate("/")

    }
  };

  return (
    <Form onFinish={handleSubmit}>
      <PaymentElement />
      <Button htmlType="submit" disabled={!stripe} className='mt-4 justify-start'>
            Payer {totalPrice} €
      </Button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </Form>
  );
};

export const CheckoutModal = ({isCheckoutModalOpen, totalPrice, setIsCheckoutModalOpen, reservationId}: {reservationId: string, isCheckoutModalOpen: boolean, totalPrice: number, setIsCheckoutModalOpen: (isOpen: boolean) => void}) => {
  const [createPaymentIntent] = useCreatePaymentIntentMutation();
  const [clientSecret, setClientSecret] = useState<string|null>(null);

  useEffect(() => {
    createPaymentIntent({ variables: { amount: totalPrice * 100 } })
      .then((response) => {
        if (response.data && response.data.createPaymentIntent) {
          setClientSecret(response.data.createPaymentIntent.clientSecret)
        } else {
          console.error("Payment intent creation failed: Invalid response structure");
        }
      })
      .catch((error) => {
        console.error("Failed to initialize payment:", error);
      })
  }, [createPaymentIntent, totalPrice])

  return(
    <Modal open={isCheckoutModalOpen} onCancel={() => setIsCheckoutModalOpen(false)} footer={null}>
      {clientSecret ?
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <StripePaymentForm clientSecret={clientSecret} totalPrice={totalPrice} reservationId={reservationId}/>
        </Elements>
        :
        <div>
          <Spin/>
        </div>
      }
    </Modal>
  )}
