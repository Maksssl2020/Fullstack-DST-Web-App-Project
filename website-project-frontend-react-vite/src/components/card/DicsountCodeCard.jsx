import React from "react";
import { DateTimeParser } from "../../helpers/Date.js";

const DiscountCodeCard = ({ discountCodeData }) => {
  const {
    active,
    discountCode,
    discountType,
    discountValue,
    global,
    usageLimit,
    expirationDate,
  } = discountCodeData;

  return (
    <li className="w-full h-[75px] rounded-2xl p-2 border-4 border-black bg-white flex items-center justify-between gap-4">
      <label className="flex flex-col items-center h-full w-[10%] justify-between">
        <p>Status kodu:</p>
        <p className={"font-bold"}>{active ? "AKTYWNY" : "WYGASŁ"}</p>
      </label>
      <label className="flex flex-col items-center h-full w-[15%] justify-between">
        <p>Kod:</p>
        <p className="font-bold">{discountCode}</p>
      </label>
      <label className="flex flex-col items-center h-full w-[15%] justify-between">
        <p>Wartość kodu:</p>
        <p className="font-bold">{`${discountValue} ${discountType === "PERCENTAGE" ? "%" : "zł"}`}</p>
      </label>
      <label className="flex flex-col items-center h-full w-[10%] justify-between">
        <p>Dostęp:</p>
        <p className="font-bold">{global ? "KAŻDY" : "1 OSOBA"}</p>
      </label>
      <label className="flex flex-col items-center h-full w-[15%]  justify-between">
        <p>Limit użyć:</p>
        <p className="font-bold">{usageLimit}</p>
      </label>
      <label className="flex flex-col items-center h-full w-[15%] justify-between">
        <p>Data wygaśnięcia:</p>
        <p className="font-bold">{DateTimeParser(expirationDate)}</p>
      </label>
    </li>
  );
};

export default DiscountCodeCard;
