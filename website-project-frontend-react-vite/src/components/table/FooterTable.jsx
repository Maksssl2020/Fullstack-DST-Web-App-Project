import React from "react";
import FooterTableColumn from "./FooterTableColumn.jsx";

const FooterTable = () => {
  const firstColumnData = [
    {
      items: ["Strona główna", "Forum", "O nas", "Sklep"],
    },
    {
      items: ["Ankiety", "Partnerzy", "Aktualności", "Wesprzyj nas"],
    },
  ];

  const secondColumnData = [
    {
      items: ["FAQ", "Kontakt", "Konto", "Metody płatności", "Regulamin"],
    },
  ];

  const thirdColumnData = [
    {
      items: [
        "Sprawdź",
        "",
        "tel: +48 123 456 789",
        "e-mail: dwiestronyteczy@gmail.com",
      ],
    },
  ];

  return (
    <div className="ml-auto grid w-[70%] grid-cols-3 self-center text-center font-lato">
      <FooterTableColumn tableTitle={"Znajdź"} tableData={firstColumnData} />
      <FooterTableColumn tableTitle={"Obsługa"} tableData={secondColumnData} />
      <FooterTableColumn tableTitle={"Kontakt"} tableData={thirdColumnData} />
    </div>
  );
};

export default FooterTable;
