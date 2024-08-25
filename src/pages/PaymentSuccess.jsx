import React from "react";
import AnimatedPage from "../animation/AnimatedPage";

const PaymentSuccess = () => {
  return (
    <AnimatedPage>
      <div className="w-full font-lato h-[500px] flex flex-col items-center justify-center my-8">
        <div
          className={
            "flex flex-col justify-center items-center w-[60%] rounded-2xl p-8 gap-8 border-4 border-black"
          }
        >
          <h1 className={"text-5xl font-bold italic"}>
            Dziękujemy za złożenie zamówienia!
          </h1>
          <div className={"text-3xl text-center"}>
            Będziemy informować na bieżąco o statusie zamówienia. Na e-mail
            prześlemy link do jego śledzenia. Jeśli masz konto możesz wejść w
            swój profil i wybrać zakładkę "Moje Zamówienia"!
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
};

export default PaymentSuccess;
