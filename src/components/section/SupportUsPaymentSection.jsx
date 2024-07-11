import React from "react";
import SupportUsPaymentForm from "../form/SupportUsPaymentForm";

const SupportUsPaymentSection = () => {
  const cyclicalSupportTableData = [
    "5 zł / miesiąc",
    "10 zł / miesiąc",
    "25 zł / miesiąc",
    "50 zł / miesiąc",
    "80 zł / miesiąc",
    "inna kwota",
  ];

  const oneTimeSupportTableData = [
    "10 zł",
    "25 zł",
    "75 zł",
    "100 zł",
    "150 zł",
    "inna kwota",
  ];

  return (
    <div className="justify-center gap-12 flex">
      <SupportUsPaymentForm
        formTitle="Wsparcie cykliczne"
        formDescription="Przyczyń się do zmian długoterminowo <3"
        formData={cyclicalSupportTableData}
      />
      <SupportUsPaymentForm
        formTitle="Jednorazowa wpłata"
        formDescription="Przyczyń się do zmian razem z nami jednorazowo <3"
        formData={oneTimeSupportTableData}
      />
    </div>
  );
};

export default SupportUsPaymentSection;
