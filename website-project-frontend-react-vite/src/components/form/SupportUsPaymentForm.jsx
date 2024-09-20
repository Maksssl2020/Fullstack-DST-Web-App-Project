import React from "react";
import SupportUsTable from "../table/SupportUsTable.jsx";
import CreditCardIcon from "./icons/CreditCardIcon.jsx";
import FormItem from "./FormItem.jsx";

const SupportUsPaymentForm = ({ formTitle, formDescription, formData }) => {
  return (
    <div className="rounded-lg w-[600px] items-center flex flex-col h-[700px] bg-custom-gray-100 border-2 border-custom-orange-200">
      <div className="bg-custom-gray-200 justify-center flex flex-col items-center w-full rounded-lg h-[15%]">
        <h2 className="font-bold italic text-3xl">{formTitle}</h2>
        <p className="text-lg">{formDescription}</p>
      </div>
      <FormItem labelData={"Imię i nazwisko"} placeholderData={"XXX"} />
      <FormItem labelData={"E-mail"} placeholderData={"XXX"} type={"email"} />
      <SupportUsTable tableData={formData} />
      <div className="mt-3 w-[75%] gap-2 flex flex-col">
        <p className="ml-3">Dane karty</p>
        <div className="w-full bg-white px-2 flex items-center h-[40px] rounded-xl border-2 border-black">
          <CreditCardIcon />
          <input
            placeholder="Numer karty"
            className="ml-2 w-[60%] bg-white h-full placeholder:text-custom-gray-300 rounded-l-xl focus:outline-none"
          />
          <input
            placeholder="MM / RR"
            className="w-[15%] mr-2 bg-white h-full placeholder:text-custom-gray-300 rounded-xl focus:outline-none"
          />
          <input
            placeholder="kod CVC"
            className="bg-white w-[15%] h-full placeholder:text-custom-gray-300 rounded-r-xl focus:outline-none"
          />
        </div>
      </div>
      <div className="mt-3 w-[75%]">
        <button
          type={"submit"}
          className="bg-custom-orange-200 uppercase font-bold text-white w-full h-[40px] rounded-xl border-2 border-black"
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
