import React from "react";
import SupportUsTable from "../table/SupportUsTable.jsx";
import CreditCardIcon from "./icons/CreditCardIcon.jsx";
import FormItem from "./FormItem.jsx";

const SupportUsPaymentForm = ({ formTitle, formDescription, formData }) => {
  return (
    <div className="flex h-[700px] w-[600px] flex-col items-center rounded-lg border-2 border-custom-orange-200 bg-custom-gray-100">
      <div className="flex h-[15%] w-full flex-col items-center justify-center rounded-lg bg-custom-gray-200">
        <h2 className="text-3xl font-bold italic">{formTitle}</h2>
        <p className="text-lg">{formDescription}</p>
      </div>
      <FormItem label={"Imię i nazwisko"} placeholder={"XXX"} />
      <FormItem label={"E-mail"} placeholder={"XXX"} type={"email"} />
      <SupportUsTable tableData={formData} />
      <div className="mt-3 flex w-[75%] flex-col gap-2">
        <p className="ml-3">Dane karty</p>
        <div className="flex h-[40px] w-full items-center rounded-xl border-2 border-black bg-white px-2">
          <CreditCardIcon />
          <input
            placeholder="Numer karty"
            className="ml-2 h-full w-[60%] rounded-l-xl bg-white placeholder:text-custom-gray-300 focus:outline-none"
          />
          <input
            placeholder="MM / RR"
            className="mr-2 h-full w-[15%] rounded-xl bg-white placeholder:text-custom-gray-300 focus:outline-none"
          />
          <input
            placeholder="kod CVC"
            className="h-full w-[15%] rounded-r-xl bg-white placeholder:text-custom-gray-300 focus:outline-none"
          />
        </div>
      </div>
      <div className="mt-3 w-[75%]">
        <button
          type={"submit"}
          className="h-[40px] w-full rounded-xl border-2 border-black bg-custom-orange-200 font-bold uppercase text-white"
        >
          {formTitle.includes("cykliczne")
            ? "wspieram cyklicznie"
            : "wpieram jednorazowo"}
        </button>
      </div>
    </div>
  );
};

export default SupportUsPaymentForm;
