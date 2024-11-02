import React from "react";
import { DateTimeParser } from "../../helpers/Date.js";
import AdminManagementSectionColumn from "../table/AdminManagementSectionColumn.jsx";

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
    <li className="w-full   max-lg:h-auto lg:h-[75px] rounded-2xl max-lg:gap-6 p-2 border-2 border-black bg-white grid max-sm:grid-cols-1 sm:grid-cols-2 max-lg:grid-cols-3 lg:grid-cols-6 items-center justify-between">
      <AdminManagementSectionColumn
        name={"Status kodu:"}
        value={active ? "AKTYWNY" : "WYGASŁ"}
      />
      <AdminManagementSectionColumn name={"Kod:"} value={discountCode} />
      <AdminManagementSectionColumn
        name={"Wartość kodu:"}
        value={`${discountValue} ${discountType === "PERCENTAGE" ? "%" : "zł"}`}
      />
      <AdminManagementSectionColumn
        name={"Dostęp:"}
        value={global ? "KAŻDY" : "1 OSOBA"}
      />
      <AdminManagementSectionColumn name={"Limit użyć:"} value={usageLimit} />
      <AdminManagementSectionColumn
        name={"Data wygaśnięcia:"}
        value={DateTimeParser(expirationDate)}
      />
    </li>
  );
};

export default DiscountCodeCard;
